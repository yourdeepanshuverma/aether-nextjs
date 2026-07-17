"use client";
import { useState, useEffect } from 'react';
import { useContent } from '@/context/ContentContext';
import { supabase } from '@/utils/supabase';
import { Plus, Edit, Trash2, X, CheckCircle, AlertCircle } from 'lucide-react';

export default function TeamManager() {
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ success: '', error: '' });
  const [teamModal, setTeamModal] = useState({ show: false, mode: 'create', id: null });
  const [teamForm, setTeamForm] = useState({
    name: '', role: '', bio: '', image: ''
  });

  const { 
    team, 
    addTeamMember, 
    editTeamMember, 
    removeTeamMember,
    loadTeam,
    refreshData 
  } = useContent();

  useEffect(() => {
    loadTeam();
  }, []);

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

  return (
    <>
      {/* Header Title */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-200/60 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight capitalize">
            Team Member Profiles
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

      {/* MODAL: ADD/EDIT TEAM MEMBER */}
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
    </>
  );
}
