"use client";
import { useState, useEffect } from 'react';
import { useContent } from '@/context/ContentContext';
import { Save, CheckCircle, AlertCircle } from 'lucide-react';

export default function FooterConfigEditor() {
  const [statusMessage, setStatusMessage] = useState({ success: '', error: '' });
  const [saving, setSaving] = useState(false);

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

  const footerDefaults = getContent("footer", {
    title: "Footer Config",
    subtitle: "Aether Footer Configuration",
    content: {
      copyright: "Copyright © 2026 AETHER RFID. All rights reserved",
      linkedin: "#",
      twitter: "#",
      youtube: "#",
      corpAddress: "211, 3rd Floor, Okhla Industrial Estate, Phase 3, New Delhi-110020.",
      corpContact: "+91-7042436155",
      rdAddress: "B-185, 2nd Floor, Okhla Industrial Area, Phase 1, New Delhi-110020.",
      rdContact: "+91-7070543479",
      branchAddress: "164/10, 3rd Floor, Dutta Mart, Near Udayan Club, Kolkata, West Bengal, 700061.",
      branchContact: "+91-7488196939"
    }
  });

  const [footerForm, setFooterForm] = useState({
    copyright: footerDefaults.copyright || "Copyright © 2026 AETHER RFID. All rights reserved",
    linkedin: footerDefaults.linkedin || "#",
    twitter: footerDefaults.twitter || "#",
    youtube: footerDefaults.youtube || "#",
    corpAddress: footerDefaults.corpAddress || "211, 3rd Floor, Okhla Industrial Estate, Phase 3, New Delhi-110020.",
    corpContact: footerDefaults.corpContact || "+91-7042436155",
    rdAddress: footerDefaults.rdAddress || "B-185, 2nd Floor, Okhla Industrial Area, Phase 1, New Delhi-110020.",
    rdContact: footerDefaults.rdContact || "+91-7070543479",
    branchAddress: footerDefaults.branchAddress || "164/10, 3rd Floor, Dutta Mart, Near Udayan Club, Kolkata, West Bengal, 700061.",
    branchContact: footerDefaults.branchContact || "+91-7488196939"
  });

  // Sync state if database updates
  useEffect(() => {
    const currentFooter = getContent("footer", {
      content: {
        copyright: "Copyright © 2026 AETHER RFID. All rights reserved",
        linkedin: "#",
        twitter: "#",
        youtube: "#",
        corpAddress: "211, 3rd Floor, Okhla Industrial Estate, Phase 3, New Delhi-110020.",
        corpContact: "+91-7042436155",
        rdAddress: "B-185, 2nd Floor, Okhla Industrial Area, Phase 1, New Delhi-110020.",
        rdContact: "+91-7070543479",
        branchAddress: "164/10, 3rd Floor, Dutta Mart, Near Udayan Club, Kolkata, West Bengal, 700061.",
        branchContact: "+91-7488196939"
      }
    });

    setFooterForm({
      copyright: currentFooter.copyright,
      linkedin: currentFooter.linkedin,
      twitter: currentFooter.twitter,
      youtube: currentFooter.youtube,
      corpAddress: currentFooter.corpAddress,
      corpContact: currentFooter.corpContact,
      rdAddress: currentFooter.rdAddress,
      rdContact: currentFooter.rdContact,
      branchAddress: currentFooter.branchAddress,
      branchContact: currentFooter.branchContact
    });
  }, [siteContent]);

  const handleFooterSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateSectionContent("footer", {
        title: "Footer Config",
        subtitle: "Aether Footer Configuration",
        content: {
          copyright: footerForm.copyright,
          linkedin: footerForm.linkedin,
          twitter: footerForm.twitter,
          youtube: footerForm.youtube,
          corpAddress: footerForm.corpAddress,
          corpContact: footerForm.corpContact,
          rdAddress: footerForm.rdAddress,
          rdContact: footerForm.rdContact,
          branchAddress: footerForm.branchAddress,
          branchContact: footerForm.branchContact
        }
      });
      showStatus("Footer Configuration updated successfully!");
    } catch (err) {
      showStatus("", "Failed to save Footer Configuration.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-gray-200/60 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight capitalize">
            Footer Settings
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage global website footer layout and addresses</p>
        </div>
        <button 
          onClick={() => { refreshData(); showStatus("Data refreshed from database."); }} 
          className="px-4 py-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-xl transition-all shadow-sm"
        >
          Refresh Data
        </button>
      </div>

      {/* Feedback Banners */}
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

      {/* Editor Form */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
        <form onSubmit={handleFooterSave} className="space-y-8">
          
          {/* Social Links */}
          <div className="bg-gray-50/70 p-6 rounded-2xl border border-gray-100/80 space-y-4">
            <h3 className="font-bold text-gray-800 text-sm tracking-wide uppercase">Social Media Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">LinkedIn URL</label>
                <input
                  type="text"
                  value={footerForm.linkedin}
                  onChange={(e) => setFooterForm({ ...footerForm, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/..."
                  className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Twitter/X URL</label>
                <input
                  type="text"
                  value={footerForm.twitter}
                  onChange={(e) => setFooterForm({ ...footerForm, twitter: e.target.value })}
                  placeholder="https://x.com/..."
                  className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">YouTube URL</label>
                <input
                  type="text"
                  value={footerForm.youtube}
                  onChange={(e) => setFooterForm({ ...footerForm, youtube: e.target.value })}
                  placeholder="https://youtube.com/..."
                  className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue transition-all"
                />
              </div>
            </div>
          </div>

          {/* Office Address Config */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Corporate */}
            <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 space-y-4">
              <h3 className="font-extrabold text-slate-800 text-sm tracking-wide uppercase">Corporate Office</h3>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-2 uppercase">Address Details</label>
                <textarea
                  rows="4"
                  value={footerForm.corpAddress}
                  onChange={(e) => setFooterForm({ ...footerForm, corpAddress: e.target.value })}
                  className="w-full px-4 py-2 bg-white rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue transition-all resize-none"
                ></textarea>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-2 uppercase">Contact Phone</label>
                <input
                  type="text"
                  value={footerForm.corpContact}
                  onChange={(e) => setFooterForm({ ...footerForm, corpContact: e.target.value })}
                  className="w-full px-4 py-2 bg-white rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue transition-all"
                />
              </div>
            </div>

            {/* R&D */}
            <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 space-y-4">
              <h3 className="font-extrabold text-slate-800 text-sm tracking-wide uppercase">R&D Center</h3>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-2 uppercase">Address Details</label>
                <textarea
                  rows="4"
                  value={footerForm.rdAddress}
                  onChange={(e) => setFooterForm({ ...footerForm, rdAddress: e.target.value })}
                  className="w-full px-4 py-2 bg-white rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue transition-all resize-none"
                ></textarea>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-2 uppercase">Contact Phone</label>
                <input
                  type="text"
                  value={footerForm.rdContact}
                  onChange={(e) => setFooterForm({ ...footerForm, rdContact: e.target.value })}
                  className="w-full px-4 py-2 bg-white rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue transition-all"
                />
              </div>
            </div>

            {/* Branch */}
            <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 space-y-4">
              <h3 className="font-extrabold text-slate-800 text-sm tracking-wide uppercase">Branch Office</h3>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-2 uppercase">Address Details</label>
                <textarea
                  rows="4"
                  value={footerForm.branchAddress}
                  onChange={(e) => setFooterForm({ ...footerForm, branchAddress: e.target.value })}
                  className="w-full px-4 py-2 bg-white rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue transition-all resize-none"
                ></textarea>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-2 uppercase">Contact Phone</label>
                <input
                  type="text"
                  value={footerForm.branchContact}
                  onChange={(e) => setFooterForm({ ...footerForm, branchContact: e.target.value })}
                  className="w-full px-4 py-2 bg-white rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue transition-all"
                />
              </div>
            </div>

          </div>

          {/* Copyright Tagline */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Copyright Tagline</label>
            <input
              type="text"
              value={footerForm.copyright}
              onChange={(e) => setFooterForm({ ...footerForm, copyright: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue transition-all"
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button 
              type="submit" 
              disabled={saving}
              className="px-6 py-3.5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-brand-blue/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={16} /> 
              {saving ? "Saving..." : "Save Footer Configuration"}
            </button>
          </div>

        </form>
      </div>
    </>
  );
}
