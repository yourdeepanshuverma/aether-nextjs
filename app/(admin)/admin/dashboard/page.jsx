"use client";
import { useState, useEffect } from 'react';
import { useContent } from '@/context/ContentContext';
import { supabase } from '@/utils/supabase';
import { Save, CheckCircle, AlertCircle } from 'lucide-react';

export default function PageContentEditor() {
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ success: '', error: '' });

  const { 
    getContent, 
    updateSectionContent,
    refreshData,
    siteContent
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
  }, [siteContent]); // reload trigger

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

  return (
    <>
      {/* Header Title */}
      <div className="flex items-center justify-between mb-8 border-b border-gray-200/60 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight capitalize">
            Page Content Editor
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
    </>
  );
}
