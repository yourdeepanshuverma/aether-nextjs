import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'aether-admin-secure-token-2026';

function isAuthenticated(req) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) return false;
  const token = authHeader.replace('Bearer ', '').trim();
  return token === ADMIN_TOKEN;
}

export async function POST(req) {
  try {
    const authHeader = req.headers.get('Authorization');
    // If auth header is provided, verify it (otherwise allow dashboard operations)
    if (authHeader && !isAuthenticated(req)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file');
    const folder = (formData.get('folder') || 'uploads').toString().trim();
    const bucketName = (formData.get('bucket') || 'images').toString().trim();

    if (!file || typeof file === 'string') {
      return NextResponse.json({ message: 'No file provided' }, { status: 400 });
    }

    // Ensure bucket exists in Supabase storage (auto-create if missing)
    try {
      const { data: buckets, error: listError } = await supabase.storage.listBuckets();
      if (!listError && buckets) {
        const bucketExists = buckets.some(b => b.name === bucketName || b.id === bucketName);
        if (!bucketExists) {
          await supabase.storage.createBucket(bucketName, {
            public: true,
            fileSizeLimit: 52428800 // 50MB
          });
        }
      }
    } catch (bucketErr) {
      console.warn('Bucket auto-check/creation notice:', bucketErr);
    }

    // Read file buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Build unique filename
    const originalName = file.name || 'file';
    const fileExt = originalName.includes('.') ? originalName.split('.').pop() : '';
    const cleanExt = fileExt ? `.${fileExt}` : '';
    const randomStr = Math.random().toString(36).substring(2, 10);
    const fileName = `${Date.now()}-${randomStr}${cleanExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    // Upload to Supabase Storage
    const contentType = file.type || 'application/octet-stream';
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, buffer, {
        contentType,
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error(`Supabase Storage upload error for bucket '${bucketName}':`, error);
      return NextResponse.json(
        { 
          message: error.message || 'Supabase storage upload failed',
          hint: 'Ensure your Supabase bucket exists and storage policies allow inserts, or configure SUPABASE_SERVICE_ROLE_KEY in .env.local.'
        }, 
        { status: 500 }
      );
    }

    // Retrieve public URL
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    // Provide relative storage URL to ensure compatibility with HTTPS and custom domains
    const safeUrl = `/storage/v1/object/public/${bucketName}/${filePath}`;

    return NextResponse.json({
      success: true,
      url: safeUrl,
      fullUrl: publicUrlData?.publicUrl || safeUrl,
      path: filePath,
      fileName: originalName,
      size: file.size,
      contentType
    });

  } catch (error) {
    console.error('API Upload error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error during upload' }, 
      { status: 500 }
    );
  }
}
