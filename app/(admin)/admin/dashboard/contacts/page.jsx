"use client";
import { useState, useMemo } from 'react';
import { useContent } from '@/context/ContentContext';
import { 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  Search, 
  LayoutGrid, 
  List, 
  Building, 
  Mail, 
  Phone, 
  Calendar, 
  Eye, 
  Download, 
  X,
  MessageSquare,
  User
} from 'lucide-react';

export default function ContactsManager() {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'today', 'company'
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'table'
  const [selectedInquiry, setSelectedInquiry] = useState(null); // Modal view
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
        if (selectedInquiry?._id === id) setSelectedInquiry(null);
        showStatus("Submission deleted.");
      } catch (err) {
        showStatus("", "Failed to delete submission.");
      }
    }
  };

  // Filtered & Searched Inquiries list
  const filteredContacts = useMemo(() => {
    return (contacts || []).filter(c => {
      const query = search.toLowerCase();
      const matchesSearch = 
        (c.name || '').toLowerCase().includes(query) ||
        (c.email || '').toLowerCase().includes(query) ||
        (c.company || '').toLowerCase().includes(query) ||
        (c.phone || '').toLowerCase().includes(query) ||
        (c.message || '').toLowerCase().includes(query);

      let matchesFilter = true;
      if (filterType === 'company') {
        matchesFilter = !!(c.company && c.company.trim() !== '');
      } else if (filterType === 'today') {
        const dateStr = c.created_at || c.createdAt;
        if (dateStr) {
          const d = new Date(dateStr);
          const today = new Date();
          matchesFilter = d.toDateString() === today.toDateString();
        } else {
          matchesFilter = false;
        }
      }

      return matchesSearch && matchesFilter;
    });
  }, [contacts, search, filterType]);

  // Statistics
  const corporateCount = useMemo(() => {
    return (contacts || []).filter(c => c.company && c.company.trim() !== '').length;
  }, [contacts]);

  const todayCount = useMemo(() => {
    const today = new Date().toDateString();
    return (contacts || []).filter(c => {
      const dateStr = c.created_at || c.createdAt;
      return dateStr && new Date(dateStr).toDateString() === today;
    }).length;
  }, [contacts]);

  // Export to CSV helper
  const exportToCSV = () => {
    if (!filteredContacts || filteredContacts.length === 0) {
      showStatus('', 'No inquiries available to export.');
      return;
    }
    const headers = ["Name", "Email", "Phone", "Company", "Message", "Date"];
    const rows = filteredContacts.map(c => [
      `"${(c.name || '').replace(/"/g, '""')}"`,
      `"${(c.email || '').replace(/"/g, '""')}"`,
      `"${(c.phone || '').replace(/"/g, '""')}"`,
      `"${(c.company || '').replace(/"/g, '""')}"`,
      `"${(c.message || '').replace(/\n/g, ' ').replace(/"/g, '""')}"`,
      `"${c.created_at || c.createdAt || ''}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showStatus("CSV Export downloaded successfully!");
  };

  return (
    <>
      {/* Header Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-gray-200/60 pb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight capitalize flex items-center gap-3">
            <MessageSquare className="text-brand-orange" size={28} /> Contact Form Inquiries
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage, filter, and inspect customer leads and messages</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-sm"
          >
            <Download size={14} className="text-brand-blue" />
            <span>Export CSV</span>
          </button>
          <button 
            onClick={() => { refreshData(); showStatus("Data refreshed from database."); }} 
            className="px-4 py-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-xl transition-all shadow-sm"
          >
            Refresh Data
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold">
            <MessageSquare size={22} />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-gray-900">{(contacts || []).length}</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Inquiries</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center font-bold">
            <Building size={22} />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-gray-900">{corporateCount}</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Corporate Leads</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Calendar size={22} />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-gray-900">{todayCount}</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Received Today</div>
          </div>
        </div>
      </div>

      {/* Global Feedback Banner */}
      {statusMessage.success && (
        <div className="mb-6 flex items-center gap-3 p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl text-sm font-medium animate-pulse">
          <CheckCircle size={18} /> {statusMessage.success}
        </div>
      )}
      {statusMessage.error && (
        <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm font-medium">
          <AlertCircle size={18} /> {statusMessage.error}
        </div>
      )}

      {/* Search, Filter & View Controls Bar */}
      <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, company, phone or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue transition-all"
            />
            {search && (
              <button 
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Pills */}
            <div className="flex gap-1.5 bg-gray-100 p-1 rounded-xl border border-gray-200/60">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  filterType === 'all' 
                    ? 'bg-brand-blue text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All ({contacts.length})
              </button>
              <button
                onClick={() => setFilterType('company')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  filterType === 'company' 
                    ? 'bg-brand-blue text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Corporate ({corporateCount})
              </button>
              <button
                onClick={() => setFilterType('today')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  filterType === 'today' 
                    ? 'bg-brand-blue text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Today ({todayCount})
              </button>
            </div>

            {/* View Mode Toggle Buttons */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200/60">
              <button
                onClick={() => setViewMode('card')}
                className={`p-2 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'card'
                    ? 'bg-white text-brand-blue shadow-sm'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
                title="Grid Card View"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'table'
                    ? 'bg-white text-brand-blue shadow-sm'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
                title="Table Compact View"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CARD VIEW MODE */}
      {viewMode === 'card' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredContacts.map(c => (
            <div 
              key={c._id} 
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group relative"
            >
              <div>
                <div className="flex justify-between items-start gap-4 mb-4 pb-3 border-b border-gray-100">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-blue transition-colors flex items-center gap-2">
                      <User size={16} className="text-brand-orange shrink-0" />
                      <span>{c.name}</span>
                    </h3>
                    {c.company && (
                      <span className="text-[11px] font-extrabold text-brand-blue bg-brand-blue/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block mt-1">
                        {c.company}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 font-bold bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                      {c.created_at || c.createdAt ? (() => {
                        const d = new Date(c.created_at || c.createdAt);
                        return isNaN(d.getTime()) ? 'N/A' : d.toLocaleDateString();
                      })() : 'N/A'}
                    </span>
                  </div>
                </div>

                {/* Sender Contact Info */}
                <div className="text-xs text-gray-600 space-y-1.5 mb-4 bg-gray-50/70 p-3 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2 truncate">
                    <Mail size={13} className="text-brand-blue shrink-0" />
                    <a href={`mailto:${c.email}`} className="hover:underline font-medium text-gray-800 truncate">{c.email}</a>
                  </div>
                  {c.phone && (
                    <div className="flex items-center gap-2">
                      <Phone size={13} className="text-brand-green shrink-0" />
                      <a href={`tel:${c.phone}`} className="hover:underline font-medium text-gray-800">{c.phone}</a>
                    </div>
                  )}
                </div>

                {/* Message Body Snippet */}
                <div className="text-gray-700 text-xs leading-relaxed line-clamp-3 bg-white p-3 rounded-xl border border-gray-100 italic">
                  "{c.message}"
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setSelectedInquiry(c)}
                  className="px-3.5 py-1.5 bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all"
                >
                  <Eye size={14} /> View Details
                </button>

                <button 
                  onClick={() => handleContactDelete(c._id)} 
                  className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shrink-0"
                  title="Delete Inquiry"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TABLE VIEW MODE */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-gray-50 border-b border-gray-200 text-[10px] uppercase tracking-wider text-gray-500 font-extrabold select-none">
                <tr>
                  <th className="p-4">Sender Name</th>
                  <th className="p-4">Email / Phone</th>
                  <th className="p-4">Company</th>
                  <th className="p-4">Message Preview</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredContacts.map((c) => (
                  <tr key={c._id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="p-4 font-bold text-gray-900 whitespace-nowrap">
                      {c.name}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="font-semibold text-brand-blue">
                        <a href={`mailto:${c.email}`} className="hover:underline">{c.email}</a>
                      </div>
                      {c.phone && <div className="text-[11px] text-gray-500">{c.phone}</div>}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      {c.company ? (
                        <span className="text-[10px] font-bold text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded-full uppercase">
                          {c.company}
                        </span>
                      ) : (
                        <span className="text-gray-400 italic">-</span>
                      )}
                    </td>
                    <td className="p-4 max-w-xs truncate text-gray-600">
                      {c.message}
                    </td>
                    <td className="p-4 whitespace-nowrap text-gray-400 font-medium">
                      {c.created_at || c.createdAt ? (() => {
                        const d = new Date(c.created_at || c.createdAt);
                        return isNaN(d.getTime()) ? 'N/A' : d.toLocaleDateString();
                      })() : 'N/A'}
                    </td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedInquiry(c)}
                          className="w-7 h-7 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all"
                          title="View Full Details"
                        >
                          <Eye size={13} />
                        </button>
                        <button
                          onClick={() => handleContactDelete(c._id)}
                          className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
                          title="Delete Submission"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredContacts.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 text-gray-400 font-medium">
          No inquiries found matching your filters.
        </div>
      )}

      {/* DETAIL MODAL FOR SELECTED INQUIRY */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-gray-100 relative space-y-6">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start pb-4 border-b border-gray-100 pr-8">
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-brand-orange bg-brand-orange/10 px-3 py-1 rounded-full inline-block mb-2">
                  Inquiry Detail
                </span>
                <h3 className="text-2xl font-bold text-gray-900">{selectedInquiry.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedInquiry(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Sender Meta Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs">
              <div>
                <span className="block text-[10px] font-extrabold uppercase text-gray-400 mb-1">Email Address</span>
                <a href={`mailto:${selectedInquiry.email}`} className="text-brand-blue font-bold hover:underline flex items-center gap-1.5">
                  <Mail size={12} /> {selectedInquiry.email}
                </a>
              </div>

              {selectedInquiry.phone && (
                <div>
                  <span className="block text-[10px] font-extrabold uppercase text-gray-400 mb-1">Phone Number</span>
                  <a href={`tel:${selectedInquiry.phone}`} className="text-brand-green font-bold hover:underline flex items-center gap-1.5">
                    <Phone size={12} /> {selectedInquiry.phone}
                  </a>
                </div>
              )}

              {selectedInquiry.company && (
                <div>
                  <span className="block text-[10px] font-extrabold uppercase text-gray-400 mb-1">Company / Enterprise</span>
                  <span className="text-gray-800 font-extrabold flex items-center gap-1.5">
                    <Building size={12} className="text-brand-orange" /> {selectedInquiry.company}
                  </span>
                </div>
              )}

              <div>
                <span className="block text-[10px] font-extrabold uppercase text-gray-400 mb-1">Received Date & Time</span>
                <span className="text-gray-600 font-semibold flex items-center gap-1.5">
                  <Calendar size={12} />
                  {selectedInquiry.created_at || selectedInquiry.createdAt ? (() => {
                    const d = new Date(selectedInquiry.created_at || selectedInquiry.createdAt);
                    return isNaN(d.getTime()) ? 'N/A' : d.toLocaleString();
                  })() : 'N/A'}
                </span>
              </div>
            </div>

            {/* Message Content */}
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Message Payload</h4>
              <div className="text-gray-800 text-sm leading-relaxed bg-white p-5 rounded-2xl border border-gray-200 whitespace-pre-line shadow-inner max-h-[300px] overflow-y-auto">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <button
                onClick={() => handleContactDelete(selectedInquiry._id)}
                className="px-4 py-2.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
              >
                <Trash2 size={14} /> Delete Inquiry
              </button>

              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Re: Inquiry from ${encodeURIComponent(selectedInquiry.name)}`}
                  className="px-5 py-2.5 bg-brand-blue text-white hover:bg-brand-blue/90 text-xs font-bold rounded-xl flex items-center gap-2 shadow-md shadow-brand-blue/10 transition-all"
                >
                  <Mail size={14} /> Reply via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {statusMessage.success && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 bg-emerald-600 text-white rounded-2xl shadow-2xl text-sm font-bold animate-bounce border border-emerald-500">
          <CheckCircle size={20} /> {statusMessage.success}
        </div>
      )}
      {statusMessage.error && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 bg-rose-600 text-white rounded-2xl shadow-2xl text-sm font-bold border border-rose-500">
          <AlertCircle size={20} /> {statusMessage.error}
        </div>
      )}
    </>
  );
}
