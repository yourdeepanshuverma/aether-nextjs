"use client";
import { useState, useEffect } from 'react';
import { useContent } from '@/context/ContentContext';
import { api } from '@/utils/api';
import { 
  Key, 
  Eye, 
  EyeOff, 
  Save, 
  Send, 
  CheckCircle, 
  AlertCircle,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

export default function SmtpSettingsPage() {
  const { getContent, updateSectionContent, adminToken } = useContent();
  
  const [formData, setFormData] = useState({
    host: 'smtp.hostinger.com',
    port: '465',
    user: 'info@aetherrfid.com',
    pass: '',
    notificationEmail: 'info@aetherrfid.com'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ success: '', error: '' });

  // Load existing SMTP settings from DB
  useEffect(() => {
    const smtpData = getContent('smtp-settings', {
      content: {
        host: 'smtp.hostinger.com',
        port: '465',
        user: 'info@aetherrfid.com',
        pass: '',
        notificationEmail: 'info@aetherrfid.com'
      }
    });
    setFormData({
      host: smtpData.host || 'smtp.hostinger.com',
      port: smtpData.port || '465',
      user: smtpData.user || 'info@aetherrfid.com',
      pass: smtpData.pass || '',
      notificationEmail: smtpData.notificationEmail || 'info@aetherrfid.com'
    });
  }, []);

  const showStatus = (success = '', error = '') => {
    setStatusMessage({ success, error });
    setTimeout(() => setStatusMessage({ success: '', error: '' }), 5000);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateSectionContent('smtp-settings', {
        title: 'SMTP Mail Configuration',
        subtitle: 'Email Settings',
        content: formData
      });
      showStatus('SMTP Settings updated successfully in Database!');
    } catch (err) {
      showStatus('', err.message || 'Failed to save SMTP settings.');
    } finally {
      setSaving(false);
    }
  };

  const handleSendTestEmail = async () => {
    if (!adminToken) return;
    try {
      setTesting(true);
      const res = await api.testSmtp(formData.notificationEmail, adminToken);
      showStatus(res.message || 'Test email sent successfully!');
    } catch (err) {
      showStatus('', err.message || 'Failed to send test email. Check your SMTP password and server details.');
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-gray-200/60 pb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            <Key className="text-brand-orange" size={28} /> SMTP Email Settings
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage Hostinger / Custom SMTP email credentials and password directly from Admin Dashboard
          </p>
        </div>
      </div>

      {/* Global Status Banner */}
      {statusMessage.success && (
        <div className="mb-6 flex items-center gap-3 p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl text-sm font-medium">
          <CheckCircle size={18} /> {statusMessage.success}
        </div>
      )}
      {statusMessage.error && (
        <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm font-medium">
          <AlertCircle size={18} /> {statusMessage.error}
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-6">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100 text-brand-blue font-bold text-sm uppercase tracking-wider">
            <ShieldCheck size={18} /> Server Credentials
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SMTP Host */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                SMTP Host Server
              </label>
              <input
                type="text"
                required
                placeholder="smtp.hostinger.com"
                value={formData.host}
                onChange={(e) => setFormData({ ...formData, host: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm font-semibold focus:outline-none focus:border-brand-blue focus:bg-white transition-all"
              />
              <span className="text-[11px] text-gray-400">Hostinger: smtp.hostinger.com | Gmail: smtp.gmail.com</span>
            </div>

            {/* SMTP Port */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                SMTP Port
              </label>
              <input
                type="text"
                required
                placeholder="465"
                value={formData.port}
                onChange={(e) => setFormData({ ...formData, port: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm font-semibold focus:outline-none focus:border-brand-blue focus:bg-white transition-all"
              />
              <span className="text-[11px] text-gray-400">465 (SSL) or 587 (TLS)</span>
            </div>

            {/* SMTP User / Email */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                Sender Email (SMTP User)
              </label>
              <input
                type="email"
                required
                placeholder="info@aetherrfid.com"
                value={formData.user}
                onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm font-semibold focus:outline-none focus:border-brand-blue focus:bg-white transition-all"
              />
            </div>

            {/* Notification Recipient Email */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                Target Notification Email
              </label>
              <input
                type="email"
                required
                placeholder="info@aetherrfid.com"
                value={formData.notificationEmail}
                onChange={(e) => setFormData({ ...formData, notificationEmail: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm font-semibold focus:outline-none focus:border-brand-blue focus:bg-white transition-all"
              />
              <span className="text-[11px] text-gray-400">Inquiries will be forwarded to this inbox</span>
            </div>
          </div>

          {/* SMTP Password Field with Toggle */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
              SMTP Password / App Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter your Hostinger Email Password"
                value={formData.pass}
                onChange={(e) => setFormData({ ...formData, pass: e.target.value })}
                className="w-full pl-4 pr-12 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-sm font-semibold focus:outline-none focus:border-brand-blue focus:bg-white transition-all tracking-wider"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                title={showPassword ? 'Hide Password' : 'Show Password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              🔐 You can change your SMTP password anytime right here. It is saved directly to your database.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={handleSendTestEmail}
              disabled={testing || !formData.pass}
              className="w-full sm:w-auto px-6 py-3.5 bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20 text-xs font-bold rounded-2xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {testing ? <RefreshCw size={16} className="animate-spin" /> : <Send size={16} />}
              <span>Send Test Email</span>
            </button>

            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto px-8 py-3.5 bg-brand-orange hover:bg-black text-white text-xs font-bold rounded-2xl shadow-lg shadow-brand-orange/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {saving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
              <span>Save SMTP Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
