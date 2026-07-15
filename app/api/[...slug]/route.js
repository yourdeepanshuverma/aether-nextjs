import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

// Simple environment-variable backed admin credentials
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'aether123';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'aether-admin-secure-token-2026';

// Helper to check if a string is a valid UUID
const isUuid = (str) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

// Helper to verify admin authentication
function isAuthenticated(req) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) return false;
  
  const token = authHeader.replace('Bearer ', '').trim();
  return token === ADMIN_TOKEN;
}

// CATCH-ALL GET HANDLER
export async function GET(req, { params }) {
  const { slug } = await params;
  const route = slug[0];
  const idOrKey = slug[1];

  try {
    // 1. Keep-Alive / Ping check
    if (route === 'keep-alive') {
      const { data, error } = await supabase.from('site_content').select('key').limit(1);
      if (error) throw error;
      return NextResponse.json({ status: 'active', message: 'Supabase is awake!', timestamp: new Date() });
    }

    // 2. Auth Profile Check
    if (route === 'auth' && idOrKey === 'me') {
      if (!isAuthenticated(req)) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.json({ username: ADMIN_USERNAME });
    }

    // 3. Site Content
    if (route === 'content') {
      const { data, error } = await supabase.from('site_content').select('*');
      if (error) throw error;

      // Convert flat array of {key, title, subtitle, content} to nested object: { [key]: { title, subtitle, content } }
      const contentMap = {};
      data.forEach(item => {
        contentMap[item.key] = {
          title: item.title,
          subtitle: item.subtitle,
          content: item.content
        };
      });
      return NextResponse.json(contentMap);
    }

    // 4. Blogs
    if (route === 'blogs') {
      if (idOrKey) {
        // Fetch single blog
        if (!isUuid(idOrKey)) {
          return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
        }
        const { data, error } = await supabase.from('blogs').select('*').eq('id', idOrKey).single();
        if (error) return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
        return NextResponse.json({ ...data, _id: data.id });
      } else {
        // Fetch all blogs
        const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        const formatted = data.map(b => ({ ...b, _id: b.id }));
        return NextResponse.json(formatted);
      }
    }

    // 5. Team
    if (route === 'team') {
      const { data, error } = await supabase.from('team').select('*').order('created_at', { ascending: true });
      if (error) throw error;
      const formatted = data.map(t => ({ ...t, _id: t.id }));
      return NextResponse.json(formatted);
    }

    // 6. Contacts (Protected)
    if (route === 'contacts') {
      if (!isAuthenticated(req)) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }
      const { data, error } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      const formatted = data.map(c => ({ ...c, _id: c.id }));
      return NextResponse.json(formatted);
    }

    return NextResponse.json({ message: 'Route not found' }, { status: 404 });
  } catch (error) {
    console.error(`API GET Error on /${slug.join('/')}:`, error);
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// CATCH-ALL POST HANDLER
export async function POST(req, { params }) {
  const { slug } = await params;
  const route = slug[0];
  const subRoute = slug[1];

  try {
    const body = await req.json();

    // 1. Auth Login
    if (route === 'auth' && subRoute === 'login') {
      const { username, password } = body;
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        return NextResponse.json({ token: ADMIN_TOKEN, username: ADMIN_USERNAME });
      }
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // 2. Submit Contact Form (Public)
    if (route === 'contacts') {
      const { name, email, phone, company, message } = body;
      const { data, error } = await supabase
        .from('contacts')
        .insert({ name, email, phone, company, message })
        .select()
        .single();
      if (error) throw error;
      return NextResponse.json({ ...data, _id: data.id });
    }

    // --- PROTECTED POST ROUTES (ADMIN ONLY) ---
    if (!isAuthenticated(req)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // 3. Create Blog
    if (route === 'blogs') {
      const { title, excerpt, content, image, date, author, category, tags } = body;
      const { data, error } = await supabase
        .from('blogs')
        .insert({ title, excerpt, content, image, date, author, category, tags })
        .select()
        .single();
      if (error) throw error;
      return NextResponse.json({ ...data, _id: data.id });
    }

    // 4. Create Team Member
    if (route === 'team') {
      const { name, role, bio, image } = body;
      const { data, error } = await supabase
        .from('team')
        .insert({ name, role, bio, image })
        .select()
        .single();
      if (error) throw error;
      return NextResponse.json({ ...data, _id: data.id });
    }

    return NextResponse.json({ message: 'Route not found' }, { status: 404 });
  } catch (error) {
    console.error(`API POST Error on /${slug.join('/')}:`, error);
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// CATCH-ALL PUT HANDLER
export async function PUT(req, { params }) {
  const { slug } = await params;
  const route = slug[0];
  const idOrKey = slug[1];

  // ALL PUT routes are protected (Admin only)
  if (!isAuthenticated(req)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();

    // 1. Update Site Content section
    if (route === 'content' && idOrKey) {
      const { title, subtitle, content } = body;
      const { data, error } = await supabase
        .from('site_content')
        .upsert({ key: idOrKey, title, subtitle, content, updated_at: new Date() })
        .select()
        .single();
      if (error) throw error;
      return NextResponse.json({ success: true, data });
    }

    // 2. Update Blog
    if (route === 'blogs' && idOrKey) {
      if (!isUuid(idOrKey)) {
        return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
      }
      const { title, excerpt, content, image, date, author, category, tags } = body;
      const { data, error } = await supabase
        .from('blogs')
        .update({ title, excerpt, content, image, date, author, category, tags })
        .eq('id', idOrKey)
        .select()
        .single();
      if (error) throw error;
      return NextResponse.json({ ...data, _id: data.id });
    }

    // 3. Update Team Member
    if (route === 'team' && idOrKey) {
      if (!isUuid(idOrKey)) {
        return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
      }
      const { name, role, bio, image } = body;
      const { data, error } = await supabase
        .from('team')
        .update({ name, role, bio, image })
        .eq('id', idOrKey)
        .select()
        .single();
      if (error) throw error;
      return NextResponse.json({ ...data, _id: data.id });
    }

    return NextResponse.json({ message: 'Route not found' }, { status: 404 });
  } catch (error) {
    console.error(`API PUT Error on /${slug.join('/')}:`, error);
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// CATCH-ALL DELETE HANDLER
export async function DELETE(req, { params }) {
  const { slug } = await params;
  const route = slug[0];
  const id = slug[1];

  // ALL DELETE routes are protected (Admin only)
  if (!isAuthenticated(req)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  if (!id || !isUuid(id)) {
    return NextResponse.json({ message: 'Invalid or missing ID format' }, { status: 400 });
  }

  try {
    // 1. Delete Blog
    if (route === 'blogs') {
      const { error } = await supabase.from('blogs').delete().eq('id', id);
      if (error) throw error;
      return NextResponse.json({ success: true, message: 'Blog deleted' });
    }

    // 2. Delete Team Member
    if (route === 'team') {
      const { error } = await supabase.from('team').delete().eq('id', id);
      if (error) throw error;
      return NextResponse.json({ success: true, message: 'Team member removed' });
    }

    // 3. Delete Contact Submission
    if (route === 'contacts') {
      const { error } = await supabase.from('contacts').delete().eq('id', id);
      if (error) throw error;
      return NextResponse.json({ success: true, message: 'Submission deleted' });
    }

    return NextResponse.json({ message: 'Route not found' }, { status: 404 });
  } catch (error) {
    console.error(`API DELETE Error on /${slug.join('/')}:`, error);
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
