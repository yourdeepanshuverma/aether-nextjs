import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { slug } = await params;
  const path = Array.isArray(slug) ? slug.join('/') : slug;
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://76.13.209.182:8000';
  const targetUrl = `${supabaseUrl}/storage/${path}`;

  try {
    const headers = {};
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      headers['apikey'] = process.env.SUPABASE_SERVICE_ROLE_KEY;
      headers['Authorization'] = `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`;
    }

    const res = await fetch(targetUrl, {
      headers,
      cache: 'force-cache'
    });

    if (!res.ok) {
      return new NextResponse('Asset not found', { status: res.status });
    }

    const contentType = res.headers.get('content-type') || 'application/octet-stream';
    const body = await res.arrayBuffer();

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err) {
    console.error(`Error proxying storage asset (${path}):`, err);
    return new NextResponse('Error loading asset', { status: 500 });
  }
}
