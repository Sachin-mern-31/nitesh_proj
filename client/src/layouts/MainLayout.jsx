import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function MainLayout() {
  const location = useLocation();

  // Hide sidebar on landing, login, register, and profile setup pages
  const noSidebarPaths = ['/', '/login', '/register', '/profile-setup'];
  const showSidebar = !noSidebarPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-[#0b0d14] text-slate-200 flex flex-col font-sans relative selection:bg-slate-700 selection:text-white">
      {/* Global Background Layering: Very Subtle Vignette & Muted Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Understated tech grid overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-25 [mask-image:radial-gradient(ellipse_75%_50%_at_50%_0%,#000_50%,transparent_100%)]" />

        {/* Soft, low-contrast ambient shadows */}
        <div className="absolute -top-32 left-1/3 w-[500px] h-[350px] ambient-glow-1 blur-[100px] opacity-40" />
        <div className="absolute top-1/2 -right-20 w-[400px] h-[350px] ambient-glow-2 blur-[100px] opacity-30" />

        {/* Subtle dot texture */}
        <div className="absolute inset-0 bg-dot-pattern opacity-10" />
      </div>

      {/* Main App Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <div className="flex-1 flex">
          {showSidebar && <Sidebar />}
          <main className="flex-1 transition-all duration-200">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}


