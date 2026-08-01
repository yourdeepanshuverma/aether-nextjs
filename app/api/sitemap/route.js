import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { supabase } from '@/utils/supabase';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'sitemap.xml');
    if (fs.existsSync(filePath)) {
      const xml = fs.readFileSync(filePath, 'utf8');
      return NextResponse.json({ xml });
    }
  } catch (err) {
    console.error("Error reading sitemap file:", err);
  }
  return NextResponse.json({ xml: '' });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const xml = body.xml;
    if (!xml) {
      return NextResponse.json({ error: 'XML content is required' }, { status: 400 });
    }

    // 1. Write physical public/sitemap.xml
    const filePath = path.join(process.cwd(), 'public', 'sitemap.xml');
    fs.writeFileSync(filePath, xml, 'utf8');

    // 2. Also save to Supabase site_content for key 'sitemap-xml' if connected
    try {
      await supabase.from('site_content').upsert({
        key: 'sitemap-xml',
        title: 'Sitemap XML',
        subtitle: 'Website Sitemap configuration',
        content: { xml }
      });
    } catch (dbErr) {
      console.warn("Supabase upsert warning for sitemap:", dbErr);
    }

    return NextResponse.json({ success: true, message: 'Sitemap updated successfully' });
  } catch (err) {
    console.error("Error saving sitemap:", err);
    return NextResponse.json({ error: err.message || 'Failed to save sitemap' }, { status: 500 });
  }
}
