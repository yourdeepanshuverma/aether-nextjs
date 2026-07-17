"use client";
import { useEffect } from 'react';
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
  Package
} from 'lucide-react';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { adminToken, logoutAdmin, contacts } = useContent();

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
    { name: 'Inquiries', path: '/admin/dashboard/contacts', icon: Mail, badge: contacts.length },
  ];

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
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 transition-colors text-sm font-bold whitespace-nowrap ${
                  isActive ? 'bg-brand-orange text-white' : 'hover:bg-white/5 text-white/80'
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
        {children}
      </main>
    </div>
  );
}
