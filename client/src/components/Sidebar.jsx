import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  CheckSquare,
  Sparkles,
  User,
  Activity,
  Zap,
  ShieldCheck
} from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Adaptive Roadmap', path: '/roadmap', icon: MapPin },
    { name: 'Skill Assessment', path: '/assessment', icon: CheckSquare },
    { name: 'AI Tutor', path: '/ai-tutor', icon: Sparkles, badge: 'Active' },
    { name: 'Profile & Goals', path: '/profile-setup', icon: User }
  ];

  return (
    <aside className="w-64 bg-[#0a0e1a]/60 backdrop-blur-xl border-r border-white/[0.06] p-4 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-65px)]">
      <div className="space-y-6">
        <div className="px-3 pt-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-between">
          <span>Navigation</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </div>

        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-white/[0.06] text-white border border-white/[0.12]'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 transition-transform group-hover:scale-110 text-slate-400 group-hover:text-white" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-white/[0.06] text-slate-300 border border-white/[0.1]">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Adaptive Status Card — Real-Time Engine Card */}
      <div className="p-4 rounded-2xl glass-panel border border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.3)] space-y-3 relative overflow-hidden group">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
            <Zap className="w-3.5 h-3.5 text-slate-400" />
            <span>Adaptive Engine</span>
          </div>
          <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Online
          </span>
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
          Roadmap nodes dynamically re-balance based on your diagnostic and quiz scores.
        </p>

        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-slate-400">
          <span>Prerequisite Graph</span>
          <span className="text-slate-300 font-semibold font-mono">Enforced</span>
        </div>
      </div>
    </aside>
  );
}

