"use client";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useContent } from '@/context/ContentContext';
import { Lock, User, AlertCircle, ShieldAlert } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginAdmin, adminToken } = useContent();
  const router = useRouter();

  useEffect(() => {
    // If already logged in, redirect to dashboard
    if (adminToken) {
      router.push('/admin/dashboard');
    }
  }, [adminToken, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await loginAdmin(username, password);
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-5 py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-blue/5 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10 relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-brand-blue">
            <ShieldAlert size={32} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Admin Portal</h2>
          <p className="text-gray-500 mt-2">Sign in to manage your website content dynamically</p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm">
            <AlertCircle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <User size={18} />
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={18} />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-blue text-white font-bold py-4 rounded-xl hover:bg-brand-blue/90 transition-all flex items-center justify-center shadow-lg shadow-brand-blue/15 hover:shadow-brand-blue/25 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>
        
        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="text-xs text-gray-400">
            For initial setup, check the seeded database credentials.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
