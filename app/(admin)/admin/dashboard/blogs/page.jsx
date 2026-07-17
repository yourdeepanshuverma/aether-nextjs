"use client";
import { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { supabase } from '@/utils/supabase';
import { Plus, Edit, Trash2, X, CheckCircle, AlertCircle } from 'lucide-react';

export default function BlogsManager() {
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ success: '', error: '' });
  const [blogModal, setBlogModal] = useState({ show: false, mode: 'create', id: null });
  const [blogForm, setBlogForm] = useState({
    title: '', excerpt: '', content: '', image: '', author: '', category: ''
  });

  const { 
    blogs, 
    addBlog, 
    editBlog, 
    removeBlog,
    refreshData 
  } = useContent();

  const showStatus = (success = '', error = '') => {
    setStatusMessage({ success, error });
    setTimeout(() => setStatusMessage({ success: '', error: '' }), 4000);
  };

  const handleImageUpload = async (e, folder, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      // Upload the file to Supabase storage bucket 'images'
      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) throw error;

      // Retrieve the public URL
      const { data: publicUrlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      callback(publicUrlData.publicUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const openBlogCreate = () => {
    setBlogForm({ title: '', excerpt: '', content: '', image: '', author: 'Admin', category: 'Technology' });
    setBlogModal({ show: true, mode: 'create', id: null });
  };

  const openBlogEdit = (post) => {
    setBlogForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      author: post.author,
      category: post.category
    });
    setBlogModal({ show: true, mode: 'edit', id: post._id });
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    try {
      if (blogModal.mode === 'create') {
        await addBlog(blogForm);
        showStatus("Blog post created successfully!");
      } else {
        await editBlog(blogModal.id, blogForm);
        showStatus("Blog post updated successfully!");
      }
      setBlogModal({ show: false, mode: 'create', id: null });
    } catch (err) {
      showStatus("", "Failed to save blog post.");
    }
  };

  const handleBlogDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await removeBlog(id);
        showStatus("Blog post deleted successfully!");
      } catch (err) {
        showStatus("", "Failed to delete blog post.");
      }
    }
  };

  return (
    <>
      {/* Header Title */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-200/60 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight capitalize">
            Blog Manager
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage database records in real-time</p>
        </div>
        <button 
          onClick={() => { refreshData(); showStatus("Data refreshed from database."); }} 
          className="px-4 py-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-xl transition-all shadow-sm"
        >
          Refresh Data
        </button>
      </div>

      {/* Global Feedback Banner */}
      {statusMessage.success && (
        <div className="mb-8 flex items-center gap-3 p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl text-sm font-medium animate-pulse">
          <CheckCircle size={18} /> {statusMessage.success}
        </div>
      )}
      {statusMessage.error && (
        <div className="mb-8 flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm font-medium">
          <AlertCircle size={18} /> {statusMessage.error}
        </div>
      )}

      <div className="space-y-6">
        <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-gray-600 text-sm font-semibold">{blogs.length} articles saved</span>
          <button 
            onClick={openBlogCreate}
            className="px-5 py-3 bg-brand-orange hover:bg-brand-orange/90 text-white text-sm font-bold rounded-xl flex items-center gap-2 transition-all shadow-md shadow-brand-orange/15"
          >
            <Plus size={16} /> Add Blog Post
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map(post => (
            <div key={post._id} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="h-44 w-full rounded-2xl overflow-hidden mb-4 bg-gray-100">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-extrabold text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-3">{post.category}</span>
                <h3 className="text-lg font-bold text-gray-900 leading-snug line-clamp-2">{post.title}</h3>
                <p className="text-gray-500 text-xs mt-2 line-clamp-3 leading-relaxed">{post.excerpt}</p>
              </div>
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-50">
                <span className="text-[10px] text-gray-400 font-medium">By {post.author} • {post.date}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => openBlogEdit(post)} className="w-8 h-8 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all">
                    <Edit size={14} />
                  </button>
                  <button onClick={() => handleBlogDelete(post._id)} className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL: ADD/EDIT BLOG POST */}
      {blogModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">{blogModal.mode === 'create' ? 'Add New Blog Post' : 'Edit Blog Post'}</h3>
              <button onClick={() => setBlogModal({ show: false, mode: 'create', id: null })} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleBlogSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Blog Title</label>
                <input
                  type="text"
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  placeholder="e.g. Revolutionizing Inventory Controls"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Category</label>
                  <input
                    type="text"
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    placeholder="e.g. Supply Chain"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Author Name</label>
                  <input
                    type="text"
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Excerpt (Short Summary)</label>
                <input
                  type="text"
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  placeholder="A short sentence summarizing this article..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-gray-600 uppercase">Banner Image URL Path</label>
                  {uploading && <span className="text-[10px] text-brand-orange animate-pulse font-bold">Uploading...</span>}
                </div>
                <input
                  type="text"
                  value={blogForm.image}
                  onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                  placeholder="e.g. /assets/blogs/banner.jpg"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none"
                />
                <div className="mt-2">
                  <input 
                    type="file" 
                    accept="image/*"
                    disabled={uploading}
                    onChange={(e) => handleImageUpload(e, 'blogs', (url) => setBlogForm({ ...blogForm, image: url }))}
                    className="text-xs text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-blue/10 file:text-brand-blue hover:file:bg-brand-blue/20 cursor-pointer disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Blog Content (HTML Supported)</label>
                <textarea
                  rows="8"
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  placeholder="Write the full blog post body here..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setBlogModal({ show: false, mode: 'create', id: null })}
                  className="px-5 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button type="submit" className="px-6 py-3 bg-brand-orange text-white rounded-xl text-sm font-bold hover:bg-brand-orange/90 shadow-md">
                  {blogModal.mode === 'create' ? 'Publish Post' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
