"use client";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useContent } from '@/context/ContentContext';
import { supabase } from '@/utils/supabase';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Mail, 
  LogOut, 
  Edit, 
  Trash2, 
  Plus, 
  Save, 
  X, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';

const Dashboard = () => {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

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
  const { 
    adminToken, 
    logoutAdmin, 
    getContent, 
    updateSectionContent,
    blogs, 
    addBlog, 
    editBlog, 
    removeBlog,
    team, 
    addTeamMember, 
    editTeamMember, 
    removeTeamMember,
    contacts, 
    removeContact,
    refreshData
  } = useContent();

  const [activeTab, setActiveTab] = useState('content'); // 'content' | 'blogs' | 'team' | 'contacts'
  const [statusMessage, setStatusMessage] = useState({ success: '', error: '' });

  // Redirection guard
  useEffect(() => {
    if (!adminToken) {
      router.push('/admin');
    }
  }, [adminToken, router]);

  const showStatus = (success = '', error = '') => {
    setStatusMessage({ success, error });
    setTimeout(() => setStatusMessage({ success: '', error: '' }), 4000);
  };

  // ==========================================
  // TAB 1: SITE CONTENT EDITOR STATE & HANDLERS
  // ==========================================
  const heroDefaults = getContent("home-hero", {
    title: "Aether-RFID Pioneering Innovation in RFID and IoT Solutions",
    subtitle: "At Aether-RFID, our mission is to deliver cost-effective, high-quality RFID and IoT solutions...",
    content: { buttonText: "Explore our products", videoUrl: "/assets/aether-rfid-one.mp4" }
  });

  const aboutDefaults = getContent("home-about", {
    title: "Driving Innovation Through Technology",
    subtitle: "About Aether",
    content: {
      description: "Aether is a global leader...",
      missionTitle: "Our Mission",
      missionDesc: "To empower enterprises...",
      visionTitle: "Our Vision",
      visionDesc: "To be the catalyst...",
      buttonText: "Learn More About Us",
      imageUrl: "/assets/about-2.webp"
    }
  });

  const [heroForm, setHeroForm] = useState({
    title: heroDefaults.title,
    subtitle: heroDefaults.subtitle,
    buttonText: heroDefaults.buttonText || heroDefaults.content?.buttonText || "Explore our products",
    videoUrl: heroDefaults.videoUrl || heroDefaults.content?.videoUrl || "/assets/aether-rfid-one.mp4"
  });

  const [aboutForm, setAboutForm] = useState({
    title: aboutDefaults.title,
    subtitle: aboutDefaults.subtitle,
    description: aboutDefaults.description || aboutDefaults.content?.description || "",
    missionTitle: aboutDefaults.missionTitle || aboutDefaults.content?.missionTitle || "Our Mission",
    missionDesc: aboutDefaults.missionDesc || aboutDefaults.content?.missionDesc || "",
    visionTitle: aboutDefaults.visionTitle || aboutDefaults.content?.visionTitle || "Our Vision",
    visionDesc: aboutDefaults.visionDesc || aboutDefaults.content?.visionDesc || "",
    buttonText: aboutDefaults.buttonText || aboutDefaults.content?.buttonText || "Learn More About Us",
    imageUrl: aboutDefaults.imageUrl || aboutDefaults.content?.imageUrl || "/assets/about-2.webp"
  });

  // Sync state if databases update
  useEffect(() => {
    setHeroForm({
      title: heroDefaults.title,
      subtitle: heroDefaults.subtitle,
      buttonText: heroDefaults.buttonText || "Explore our products",
      videoUrl: heroDefaults.videoUrl || "/assets/aether-rfid-one.mp4"
    });
    setAboutForm({
      title: aboutDefaults.title,
      subtitle: aboutDefaults.subtitle,
      description: aboutDefaults.description || "",
      missionTitle: aboutDefaults.missionTitle || "Our Mission",
      missionDesc: aboutDefaults.missionDesc || "",
      visionTitle: aboutDefaults.visionTitle || "Our Vision",
      visionDesc: aboutDefaults.visionDesc || "",
      buttonText: aboutDefaults.buttonText || "Learn More About Us",
      imageUrl: aboutDefaults.imageUrl || "/assets/about-2.webp"
    });
  }, [blogs]); // reload trigger

  const handleHeroSave = async (e) => {
    e.preventDefault();
    try {
      await updateSectionContent("home-hero", {
        title: heroForm.title,
        subtitle: heroForm.subtitle,
        content: {
          buttonText: heroForm.buttonText,
          videoUrl: heroForm.videoUrl
        }
      });
      showStatus("Hero Section updated successfully!");
    } catch (err) {
      showStatus("", "Failed to save Hero Section.");
    }
  };

  const handleAboutSave = async (e) => {
    e.preventDefault();
    try {
      await updateSectionContent("home-about", {
        title: aboutForm.title,
        subtitle: aboutForm.subtitle,
        content: {
          description: aboutForm.description,
          missionTitle: aboutForm.missionTitle,
          missionDesc: aboutForm.missionDesc,
          visionTitle: aboutForm.visionTitle,
          visionDesc: aboutForm.visionDesc,
          buttonText: aboutForm.buttonText,
          imageUrl: aboutForm.imageUrl
        }
      });
      showStatus("About Section updated successfully!");
    } catch (err) {
      showStatus("", "Failed to save About Section.");
    }
  };

  // ==========================================
  // TAB 2: BLOG POSTS CRUD STATE & HANDLERS
  // ==========================================
  const [blogModal, setBlogModal] = useState({ show: false, mode: 'create', id: null });
  const [blogForm, setBlogForm] = useState({
    title: '', excerpt: '', content: '', image: '', author: '', category: ''
  });

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

  // ==========================================
  // TAB 3: TEAM MEMBERS CRUD STATE & HANDLERS
  // ==========================================
  const [teamModal, setTeamModal] = useState({ show: false, mode: 'create', id: null });
  const [teamForm, setTeamForm] = useState({
    name: '', role: '', bio: '', image: ''
  });

  const openTeamCreate = () => {
    setTeamForm({ name: '', role: '', bio: '', image: '' });
    setTeamModal({ show: true, mode: 'create', id: null });
  };

  const openTeamEdit = (member) => {
    setTeamForm({
      name: member.name,
      role: member.role,
      bio: member.bio,
      image: member.image
    });
    setTeamModal({ show: true, mode: 'edit', id: member._id });
  };

  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    try {
      if (teamModal.mode === 'create') {
        await addTeamMember(teamForm);
        showStatus("Team member added successfully!");
      } else {
        await editTeamMember(teamModal.id, teamForm);
        showStatus("Team member updated successfully!");
      }
      setTeamModal({ show: false, mode: 'create', id: null });
    } catch (err) {
      showStatus("", "Failed to save team member.");
    }
  };

  const handleTeamDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this team member?")) {
      try {
        await removeTeamMember(id);
        showStatus("Team member removed successfully!");
      } catch (err) {
        showStatus("", "Failed to remove team member.");
      }
    }
  };

  // ==========================================
  // TAB 4: CONTACT SUBMISSIONS HANDLER
  // ==========================================
  const handleContactDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry submission?")) {
      try {
        await removeContact(id);
        showStatus("Submission deleted.");
      } catch (err) {
        showStatus("", "Failed to delete submission.");
      }
    }
  };

  // Guard loading UI
  if (!adminToken) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row md:h-screen md:overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-brand-blue text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/assets/Aether-rfid.png"
              alt="Logo"
              className="h-8 w-auto object-contain brightness-0 invert"
            />
            <span className="text-[10px] uppercase font-extrabold tracking-widest bg-white/15 px-2 py-0.5 rounded text-white/90">Admin</span>
          </div>
          <button onClick={() => { logoutAdmin(); router.push('/admin'); }} className="md:hidden text-white/70 hover:text-white">
            <LogOut size={20} />
          </button>
        </div>

        <nav className="p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible">
          <button
            onClick={() => setActiveTab('content')}
            className={`w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 transition-colors text-sm font-bold whitespace-nowrap ${
              activeTab === 'content' ? 'bg-brand-orange text-white' : 'hover:bg-white/5 text-white/80'
            }`}
          >
            <LayoutDashboard size={18} /> Page Content
          </button>
          
          <button
            onClick={() => setActiveTab('blogs')}
            className={`w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 transition-colors text-sm font-bold whitespace-nowrap ${
              activeTab === 'blogs' ? 'bg-brand-orange text-white' : 'hover:bg-white/5 text-white/80'
            }`}
          >
            <FileText size={18} /> Manage Blogs
          </button>
          
          <button
            onClick={() => setActiveTab('team')}
            className={`w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 transition-colors text-sm font-bold whitespace-nowrap ${
              activeTab === 'team' ? 'bg-brand-orange text-white' : 'hover:bg-white/5 text-white/80'
            }`}
          >
            <Users size={18} /> Manage Team
          </button>
          
          <button
            onClick={() => setActiveTab('contacts')}
            className={`w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 transition-colors text-sm font-bold whitespace-nowrap ${
              activeTab === 'contacts' ? 'bg-brand-orange text-white' : 'hover:bg-white/5 text-white/80'
            }`}
          >
            <Mail size={18} /> Inquiries ({contacts.length})
          </button>
        </nav>

        <div className="mt-auto p-4 border-t border-white/10 hidden md:block">
          <button 
            onClick={() => { logoutAdmin(); router.push('/admin'); }}
            className="w-full px-4 py-3 rounded-xl border border-white/20 text-white/80 hover:text-white hover:bg-white/5 flex items-center justify-center gap-2 transition-colors text-sm font-bold"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-10 max-w-[1200px] mx-auto w-full md:overflow-y-auto">
        {/* Header Title */}
        <div className="flex items-center justify-between mb-8 border-b border-gray-200/60 pb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight capitalize">
              {activeTab === 'content' && 'Page Content Editor'}
              {activeTab === 'blogs' && 'Blog Manager'}
              {activeTab === 'team' && 'Team Member Profiles'}
              {activeTab === 'contacts' && 'Contact Form Submissions'}
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

        {/* ==========================================
            TAB: CONTENT EDITOR
            ========================================== */}
        {activeTab === 'content' && (
          <div className="space-y-12">
            {/* 1. Hero Content */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 pb-3 border-b border-gray-100">
                <span className="w-3 h-3 rounded-full bg-brand-orange"></span> Homepage Hero Section
              </h3>
              <form onSubmit={handleHeroSave} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Hero Main Heading</label>
                  <input
                    type="text"
                    value={heroForm.title}
                    onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Hero Subtitle/Description</label>
                  <textarea
                    rows="3"
                    value={heroForm.subtitle}
                    onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue transition-all resize-none"
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Button Call-To-Action Text</label>
                    <input
                      type="text"
                      value={heroForm.buttonText}
                      onChange={(e) => setHeroForm({ ...heroForm, buttonText: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Background MP4 Video Path</label>
                    <input
                      type="text"
                      value={heroForm.videoUrl}
                      onChange={(e) => setHeroForm({ ...heroForm, videoUrl: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue transition-all"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="px-6 py-3.5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-brand-blue/10">
                    <Save size={16} /> Save Hero Section
                  </button>
                </div>
              </form>
            </div>

            {/* 2. About Us Content */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 pb-3 border-b border-gray-100">
                <span className="w-3 h-3 rounded-full bg-brand-green"></span> Homepage About Us Section
              </h3>
              <form onSubmit={handleAboutSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">About Section Badge</label>
                    <input
                      type="text"
                      value={aboutForm.subtitle}
                      onChange={(e) => setAboutForm({ ...aboutForm, subtitle: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Section Heading Title</label>
                    <input
                      type="text"
                      value={aboutForm.title}
                      onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Section Paragraph Description</label>
                  <textarea
                    rows="4"
                    value={aboutForm.description}
                    onChange={(e) => setAboutForm({ ...aboutForm, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue transition-all resize-none"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="space-y-4">
                    <h4 className="font-bold text-gray-700 text-sm">Mission Block</h4>
                    <input
                      type="text"
                      value={aboutForm.missionTitle}
                      onChange={(e) => setAboutForm({ ...aboutForm, missionTitle: e.target.value })}
                      placeholder="Mission Heading"
                      className="w-full px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm focus:outline-none"
                    />
                    <textarea
                      rows="2"
                      value={aboutForm.missionDesc}
                      onChange={(e) => setAboutForm({ ...aboutForm, missionDesc: e.target.value })}
                      placeholder="Mission Text"
                      className="w-full px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm focus:outline-none resize-none"
                    ></textarea>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-gray-700 text-sm">Vision Block</h4>
                    <input
                      type="text"
                      value={aboutForm.visionTitle}
                      onChange={(e) => setAboutForm({ ...aboutForm, visionTitle: e.target.value })}
                      placeholder="Vision Heading"
                      className="w-full px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm focus:outline-none"
                    />
                    <textarea
                      rows="2"
                      value={aboutForm.visionDesc}
                      onChange={(e) => setAboutForm({ ...aboutForm, visionDesc: e.target.value })}
                      placeholder="Vision Text"
                      className="w-full px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm focus:outline-none resize-none"
                    ></textarea>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Button Call-To-Action Text</label>
                    <input
                      type="text"
                      value={aboutForm.buttonText}
                      onChange={(e) => setAboutForm({ ...aboutForm, buttonText: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue transition-all"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Display Image URL Path</label>
                      {uploading && <span className="text-[10px] text-brand-orange animate-pulse font-bold">Uploading...</span>}
                    </div>
                    <input
                      type="text"
                      value={aboutForm.imageUrl}
                      onChange={(e) => setAboutForm({ ...aboutForm, imageUrl: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue transition-all"
                    />
                    <div className="mt-2">
                      <input 
                        type="file" 
                        accept="image/*"
                        disabled={uploading}
                        onChange={(e) => handleImageUpload(e, 'about', (url) => setAboutForm({ ...aboutForm, imageUrl: url }))}
                        className="text-xs text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-blue/10 file:text-brand-blue hover:file:bg-brand-blue/20 cursor-pointer disabled:opacity-50"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button type="submit" className="px-6 py-3.5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-brand-blue/10">
                    <Save size={16} /> Save About Section
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ==========================================
            TAB: BLOG POSTS LIST
            ========================================== */}
        {activeTab === 'blogs' && (
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
        )}

        {/* ==========================================
            TAB: TEAM LIST
            ========================================== */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <span className="text-gray-600 text-sm font-semibold">{team.length} specialists saved</span>
              <button 
                onClick={openTeamCreate}
                className="px-5 py-3 bg-brand-orange hover:bg-brand-orange/90 text-white text-sm font-bold rounded-xl flex items-center gap-2 transition-all shadow-md shadow-brand-orange/15"
              >
                <Plus size={16} /> Add Team Member
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {team.map(member => (
                <div key={member._id} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-gray-100 shadow-inner bg-gray-50">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 leading-tight">{member.name}</h3>
                  <span className="text-xs text-brand-blue font-bold tracking-wider uppercase mt-1 inline-block">{member.role}</span>
                  <p className="text-gray-500 text-[11px] mt-3 line-clamp-3 leading-relaxed px-2">{member.bio}</p>
                  
                  <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-50 w-full justify-center">
                    <button onClick={() => openTeamEdit(member)} className="w-8 h-8 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all text-xs font-bold gap-1 px-3 w-fit">
                      <Edit size={12} /> Edit
                    </button>
                    <button onClick={() => handleTeamDelete(member._id)} className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all text-xs font-bold gap-1 px-3 w-fit">
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================
            TAB: CONTACT SUBMISSIONS LIST
            ========================================== */}
        {activeTab === 'contacts' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mb-6 text-sm text-gray-600 font-semibold">
              {contacts.length} total messages received
            </div>

            <div className="space-y-6">
              {contacts.map(c => (
                <div key={c._id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4 pb-4 border-b border-gray-50">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{c.name}</h3>
                      <div className="text-xs text-gray-500 flex flex-wrap gap-x-4 gap-y-1 mt-1">
                        <span>Email: <a href={`mailto:${c.email}`} className="text-brand-blue font-semibold hover:underline">{c.email}</a></span>
                        {c.phone && <span>Phone: <span className="text-gray-700 font-medium">{c.phone}</span></span>}
                        {c.company && <span>Company: <span className="text-gray-700 font-semibold">{c.company}</span></span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-gray-400 font-bold">{new Date(c.createdAt).toLocaleString()}</span>
                      <button 
                        onClick={() => handleContactDelete(c._id)} 
                        className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="text-gray-700 text-sm leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100 whitespace-pre-line">
                    {c.message}
                  </div>
                </div>
              ))}
              
              {contacts.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 text-gray-400 font-medium">
                  No inquiries received yet.
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ==========================================
          MODAL: ADD/EDIT BLOG POST
          ========================================== */}
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

      {/* ==========================================
          MODAL: ADD/EDIT TEAM MEMBER
          ========================================== */}
      {teamModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-gray-100">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">{teamModal.mode === 'create' ? 'Add Team Member' : 'Edit Team Member'}</h3>
              <button onClick={() => setTeamModal({ show: false, mode: 'create', id: null })} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleTeamSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Member Name</label>
                <input
                  type="text"
                  value={teamForm.name}
                  onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                  placeholder="e.g. Jane Doe"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Corporate Role</label>
                <input
                  type="text"
                  value={teamForm.role}
                  onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                  placeholder="e.g. Lead Developer"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-gray-600 uppercase">Profile Image URL Path</label>
                  {uploading && <span className="text-[10px] text-brand-orange animate-pulse font-bold">Uploading...</span>}
                </div>
                <input
                  type="text"
                  value={teamForm.image}
                  onChange={(e) => setTeamForm({ ...teamForm, image: e.target.value })}
                  placeholder="e.g. https://images.unsplash.com/photo-..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none"
                />
                <div className="mt-2">
                  <input 
                    type="file" 
                    accept="image/*"
                    disabled={uploading}
                    onChange={(e) => handleImageUpload(e, 'team', (url) => setTeamForm({ ...teamForm, image: url }))}
                    className="text-xs text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-blue/10 file:text-brand-blue hover:file:bg-brand-blue/20 cursor-pointer disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Short Bio</label>
                <textarea
                  rows="3"
                  value={teamForm.bio}
                  onChange={(e) => setTeamForm({ ...teamForm, bio: e.target.value })}
                  placeholder="Tell us about this expert's profile..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none resize-none"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setTeamModal({ show: false, mode: 'create', id: null })}
                  className="px-5 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button type="submit" className="px-6 py-3 bg-brand-orange text-white rounded-xl text-sm font-bold hover:bg-brand-orange/90 shadow-md">
                  {teamModal.mode === 'create' ? 'Add Member' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
