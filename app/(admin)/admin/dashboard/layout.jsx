"use client";
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from "next/navigation";
import { useContent } from '@/context/ContentContext';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Mail, 
  LogOut, 
  Menu,
  Package,
  Settings,
  FileCode,
  Key,
  Handshake
} from 'lucide-react';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { adminToken, logoutAdmin, contacts } = useContent();

  // Accessibility Font Scale state
  const [fontScale, setFontScale] = useState(100);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedScale = localStorage.getItem("global-font-scale");
      if (savedScale) {
        const parsed = parseInt(savedScale, 10);
        if (!isNaN(parsed) && parsed >= 80 && parsed <= 130) {
          setFontScale(parsed);
          document.documentElement.style.fontSize = `${parsed}%`;
        }
      }
    }
  }, []);

  const changeFontScale = (newScale) => {
    if (newScale >= 80 && newScale <= 130) {
      setFontScale(newScale);
      document.documentElement.style.fontSize = `${newScale}%`;
      localStorage.setItem("global-font-scale", newScale.toString());
    }
  };

  const increaseFontSize = () => changeFontScale(fontScale + 10);
  const decreaseFontSize = () => changeFontScale(fontScale - 10);
  const resetFontSize = () => changeFontScale(100);

  // Redirection guard
  useEffect(() => {
    if (!adminToken) {
      router.push('/admin');
    }
  }, [adminToken, router]);

  if (!adminToken) return null;

  const navItems = [
    { name: 'Page Content', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Navigation Menu', path: '/admin/dashboard/navigation', icon: Menu },
    { name: 'Manage Products', path: '/admin/dashboard/products', icon: Package },
    { name: 'Manage Blogs', path: '/admin/dashboard/blogs', icon: FileText },
    { name: 'Manage Team', path: '/admin/dashboard/team', icon: Users },
    { name: 'Manage Alliances', path: '/admin/dashboard/alliances', icon: Handshake },
    { name: 'Manage Footer', path: '/admin/dashboard/footer', icon: Settings },
    { name: 'Manage Sitemap', path: '/admin/dashboard/sitemap', icon: FileCode },
    { name: 'SMTP Settings', path: '/admin/dashboard/smtp', icon: Key },
    { name: 'Inquiries', path: '/admin/dashboard/contacts', icon: Mail, badge: contacts.length },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row md:h-screen md:overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-brand-blue text-white flex flex-col shrink-0 md:h-screen">
        <div className="p-6 border-b border-white/10 flex items-center justify-between shrink-0">
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

        <nav className="p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto flex-1 sidebar-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 transition-colors text-sm font-bold whitespace-nowrap shrink-0 ${
                  isActive ? 'bg-brand-orange text-white shadow-md' : 'hover:bg-white/5 text-white/80'
                }`}
              >
                <Icon size={18} />
                {item.name}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="ml-auto bg-brand-orange text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 mt-auto shrink-0 hidden md:block bg-brand-blue">
          <button 
            onClick={() => { logoutAdmin(); router.push('/admin'); }}
            className="w-full px-4 py-3 rounded-xl border border-white/20 text-white/90 hover:text-white hover:bg-white/10 flex items-center justify-center gap-2 transition-all text-sm font-bold shadow-sm"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area with Header */}
      <main className="flex-grow flex flex-col h-full overflow-hidden w-full">
        {/* Admin Top Bar */}
        <div className="bg-white border-b border-gray-200/80 px-6 py-3.5 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Aether RFID Admin Dashboard</span>
          </div>

          {/* Text Size Control Widget */}
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] text-gray-600 font-extrabold uppercase tracking-wider select-none">
              TEXT SIZE:
            </span>
            <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-700/80 rounded-2xl shadow-inner">
              <button
                type="button"
                onClick={decreaseFontSize}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-extrabold transition-all duration-200 select-none ${
                  fontScale < 100
                    ? "bg-brand-orange text-white shadow-md shadow-brand-orange/20"
                    : "bg-slate-800/80 text-slate-200 hover:bg-slate-700 hover:text-white"
                }`}
                title="Decrease Font Size (A-)"
              >
                A-
              </button>
              <button
                type="button"
                onClick={resetFontSize}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-extrabold transition-all duration-200 select-none ${
                  fontScale === 100
                    ? "bg-slate-700 text-white border border-slate-500/50"
                    : "bg-slate-800/80 text-slate-200 hover:bg-slate-700 hover:text-white"
                }`}
                title="Reset Font Size (A)"
              >
                A
              </button>
              <button
                type="button"
                onClick={increaseFontSize}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-extrabold transition-all duration-200 select-none ${
                  fontScale > 100
                    ? "bg-brand-orange text-white shadow-md shadow-brand-orange/20"
                    : "bg-slate-800/80 text-slate-200 hover:bg-slate-700 hover:text-white"
                }`}
                title="Increase Font Size (A+)"
              >
                A+
              </button>
            </div>
          </div>
        </div>

        <div className="flex-grow p-6 md:p-10 max-w-[1200px] mx-auto w-full overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
