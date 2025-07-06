'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Coffee, 
  Newspaper, 
  LogOut,
  Users,
  ShoppingCart,
  Settings,
  BarChart3,
  Package,
  Bell,
  ChevronDown,
  User,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  { 
    label: 'Dashboard', 
    href: '/admin/dashboard', 
    icon: LayoutDashboard,
    badge: null
  },
  { 
    label: 'Product', 
    href: '/admin/product', 
    icon: Coffee,
    badge: '58'
  },
  { 
    label: 'News', 
    href: '/admin/news', 
    icon: Newspaper,
    badge: null
  },
  { 
    label: 'Pesan Masuk', 
    href: '/admin/messages', 
    icon: Bell,
    badge: '12',
    badgeColor: 'bg-red-500'
  },
  { 
    label: 'Edit About', 
    href: '/admin/about', 
    icon: Settings,
    badge: null
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 
        ${isCollapsed ? 'w-24' : 'w-64'} 
        min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
        border-r border-slate-700 shadow-2xl transition-all duration-300 ease-in-out
        ${isCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}
      `}>
        {/* Header */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Coffee className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Gedong Admin</h1>
                  <p className="text-sm text-slate-300">Panel Kontrol</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-slate-700 transition-colors lg:hidden text-slate-300 hover:text-white"
            >
              {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* User Profile Section */}
        {!isCollapsed && (
          <div className="p-6 border-b border-slate-700">
            <div 
              className="flex items-center gap-3 p-4 rounded-xl bg-slate-800 hover:bg-slate-700 cursor-pointer transition-all duration-200 border border-slate-600"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">Admin User</p>
                <p className="text-xs text-slate-300">Super Administrator</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
            </div>
            
            {showUserMenu && (
              <div className="mt-3 py-2 bg-slate-800 rounded-xl border border-slate-600">
                <button className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors flex items-center gap-2 rounded-lg mx-1">
                  <User className="w-4 h-4" />
                  Profile
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors flex items-center gap-2 rounded-lg mx-1">
                  <Settings className="w-4 h-4" />
                  Pengaturan
                </button>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <nav className="p-6 space-y-2 flex-1">
          {!isCollapsed && (
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Menu Utama
            </p>
          )}
          
          {menuItems.map(({ label, href, icon: Icon, badge, badgeColor }) => (
            <Link key={href} href={href}>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group relative
                ${
                  pathname === href
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg transform scale-105'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                
                {!isCollapsed && (
                  <>
                    <span className="flex-1 font-medium">{label}</span>
                    {badge && (
                      <span className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${badgeColor || 'bg-slate-500'} ${pathname === href ? 'bg-white/20' : ''}`}>
                        {badge}
                      </span>
                    )}
                  </>
                )}
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-3 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-slate-600">
                    {label}
                    {badge && (
                      <span className={`ml-2 px-2 py-1 text-xs font-semibold text-white rounded-full ${badgeColor || 'bg-slate-500'}`}>
                        {badge}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-6 border-t border-slate-700">
          <button className={`${
            isCollapsed ? 'w-full justify-center' : 'w-full justify-start'
          } flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-red-500/10 hover:border-red-500/20 rounded-xl transition-all duration-200 group border border-slate-600`}>
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span className="font-medium">Keluar</span>}
            
            {/* Tooltip for collapsed logout */}
            {isCollapsed && (
              <div className="absolute left-full ml-3 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-slate-600">
                Keluar
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* Toggle Button for Desktop */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:block fixed top-6 z-30 p-3 bg-slate-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-slate-600 hover:bg-slate-700"
        style={{ left: isCollapsed ? '98px' : '260px' }}
      >
        <Menu className="w-5 h-5" />
      </button>
    </>
  );
}