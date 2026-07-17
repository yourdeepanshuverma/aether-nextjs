"use client";
import { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { Trash2, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactsManager() {
  const [statusMessage, setStatusMessage] = useState({ success: '', error: '' });
  const { 
    contacts, 
    removeContact,
    refreshData 
  } = useContent();

  const showStatus = (success = '', error = '') => {
    setStatusMessage({ success, error });
    setTimeout(() => setStatusMessage({ success: '', error: '' }), 4000);
  };

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

  return (
    <>
      {/* Header Title */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-200/60 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight capitalize">
            Contact Form Submissions
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
                  <span className="text-[10px] text-gray-400 font-bold">
                    {c.created_at || c.createdAt ? (() => {
                      const d = new Date(c.created_at || c.createdAt);
                      return isNaN(d.getTime()) ? 'N/A' : d.toLocaleString();
                    })() : 'N/A'}
                  </span>
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
    </>
  );
}
