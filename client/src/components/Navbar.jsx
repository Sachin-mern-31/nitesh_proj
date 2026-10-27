import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Compass, Sparkles, LayoutDashboard, MapPin, LogOut, ChevronRight, 
  User, Menu, X, CheckSquare, Search, ChevronDown, Shield, Bell,
  BookOpen, Zap
} from 'lucide-react';

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Listen to scroll to adjust navbar depth
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu upon navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#070a13]/90 backdrop-blur-2xl border-b border-white/[0.09] shadow-[0_8px_30px_rgba(0,0,0,0.5)] py-2.5' 
          : 'bg-[#070a13]/70 backdrop-blur-xl border-b border-white/[0.06] py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo with Muted, Refined Styling */}
          <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-3 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-zinc-800/90 border border-zinc-700/80 flex items-center justify-center text-zinc-200 group-hover:border-zinc-500 transition-all shadow-sm">
              <Compass className="w-4.5 h-4.5 group-hover:rotate-45 transition-transform duration-300" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-white tracking-tight">
                  PathGen<span className="text-zinc-400">.ai</span>
                </span>
                <span className="text-[9px] uppercase font-bold font-mono tracking-wider px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                  Adaptive
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 -mt-0.5 font-normal hidden sm:block">Personalized Learning Roadmap</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          {user ? (
            <div className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-zinc-900/80 border border-zinc-800 shadow-sm">
              <Link
                to="/dashboard"
                className={`flex items-center gap-2 text-xs font-medium px-3.5 py-1.5 rounded-lg transition-all ${
                  isActive('/dashboard')
                    ? 'bg-zinc-800 text-white font-semibold border border-zinc-700 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/roadmap"
                className={`flex items-center gap-2 text-xs font-medium px-3.5 py-1.5 rounded-lg transition-all ${
                  isActive('/roadmap')
                    ? 'bg-zinc-800 text-white font-semibold border border-zinc-700 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Roadmap</span>
              </Link>

              <Link
                to="/assessment"
                className={`flex items-center gap-2 text-xs font-medium px-3.5 py-1.5 rounded-lg transition-all ${
                  isActive('/assessment')
                    ? 'bg-zinc-800 text-white font-semibold border border-zinc-700 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
              >
                <CheckSquare className="w-3.5 h-3.5" />
                <span>Assessment</span>
              </Link>

              <Link
                to="/ai-tutor"
                className={`flex items-center gap-2 text-xs font-medium px-3.5 py-1.5 rounded-lg transition-all ${
                  isActive('/ai-tutor')
                    ? 'bg-zinc-800 text-white font-semibold border border-zinc-700 shadow-sm'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                <span>AI Tutor</span>
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-400">
              <Link to="/" className="hover:text-zinc-200 transition">Overview</Link>
              <Link to="/register" className="hover:text-zinc-200 transition">Adaptive Engine</Link>
              <Link to="/login" className="hover:text-zinc-200 transition">Diagnostic</Link>
            </div>
          )}

          {/* Right Action Elements */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2.5">
                {/* User Profile Dropdown Pill */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2.5 pl-2 pr-3 py-1 rounded-xl bg-zinc-900/90 hover:bg-zinc-800/80 border border-zinc-800 hover:border-zinc-700 transition-all text-left group shadow-sm"
                  >
                    <div className="w-6 h-6 rounded-lg bg-zinc-800 text-zinc-300 border border-zinc-700 font-bold text-xs flex items-center justify-center">
                      {user.name ? user.name[0].toUpperCase() : 'S'}
                    </div>
                    <div className="hidden sm:flex flex-col">
                      <span className="text-xs font-medium text-zinc-200 group-hover:text-white truncate max-w-[100px]">
                        {user.name}
                      </span>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180 text-white' : ''}`} />
                  </button>

                  {/* Dropdown Menu Modal */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-60 rounded-xl bg-[#11141c] border border-zinc-800 shadow-xl p-1.5 space-y-1 z-50">
                      {/* User Info Header */}
                      <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 space-y-0.5">
                        <p className="text-xs font-bold text-white truncate">{user.name}</p>
                        <p className="text-[11px] text-zinc-400 font-mono truncate">{user.email}</p>
                      </div>

                      {/* Dropdown Navigation Links */}
                      <div className="py-1 space-y-0.5 text-xs text-zinc-300">
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-zinc-800 hover:text-white transition"
                        >
                          <LayoutDashboard className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Student Dashboard</span>
                        </Link>
                        <Link
                          to="/roadmap"
                          className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-zinc-800 hover:text-white transition"
                        >
                          <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Adaptive Roadmap</span>
                        </Link>
                        <Link
                          to="/profile-setup"
                          className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-zinc-800 hover:text-white transition"
                        >
                          <User className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Study Parameters</span>
                        </Link>
                        <Link
                          to="/assessment"
                          className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-zinc-800 hover:text-white transition"
                        >
                          <CheckSquare className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Skill Assessment</span>
                        </Link>
                      </div>

                      {/* Sign Out Button */}
                      <div className="pt-1 border-t border-zinc-800">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  to="/login"
                  className="text-xs font-medium text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-zinc-800/60 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-xs font-medium btn-glow-primary px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition"
                >
                  <span>Start Free</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-white hover:bg-white/[0.08] transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/[0.07] bg-[#070a13]/95 backdrop-blur-2xl px-4 py-5 space-y-4 animate-in fade-in slide-in-from-top-3 duration-200">
          {user ? (
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-zinc-800 text-zinc-300 border border-zinc-700 font-bold text-sm flex items-center justify-center">
                  {user.name ? user.name[0].toUpperCase() : 'S'}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{user.name}</p>
                  <p className="text-xs text-slate-400 font-mono">{user.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-1 pt-1 text-sm font-medium">
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${
                    isActive('/dashboard') ? 'bg-white/[0.08] text-white' : 'text-slate-300 hover:bg-white/[0.04]'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-slate-400" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/roadmap"
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${
                    isActive('/roadmap') ? 'bg-white/[0.08] text-white' : 'text-slate-300 hover:bg-white/[0.04]'
                  }`}
                >
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>Adaptive Roadmap</span>
                </Link>
                <Link
                  to="/assessment"
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${
                    isActive('/assessment') ? 'bg-white/[0.08] text-white' : 'text-slate-300 hover:bg-white/[0.04]'
                  }`}
                >
                  <CheckSquare className="w-4 h-4 text-slate-400" />
                  <span>Skill Assessment</span>
                </Link>
                <Link
                  to="/ai-tutor"
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${
                    isActive('/ai-tutor') ? 'bg-white/[0.08] text-white' : 'text-slate-300 hover:bg-white/[0.04]'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-slate-400" />
                  <span>AI Tutor</span>
                </Link>
                <Link
                  to="/profile-setup"
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${
                    isActive('/profile-setup') ? 'bg-white/[0.08] text-white' : 'text-slate-300 hover:bg-white/[0.04]'
                  }`}
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Study Parameters & Profile</span>
                </Link>
              </div>

              <div className="pt-3 border-t border-white/[0.06]">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-500/10 text-rose-400 text-xs font-semibold border border-rose-500/20"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <Link
                to="/login"
                className="w-full block py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-center text-xs font-semibold text-white"
              >
                Sign In to Account
              </Link>
              <Link
                to="/register"
                className="w-full block py-3 rounded-xl btn-glow-primary text-center text-xs font-bold text-white shadow-sm"
              >
                Start Free Diagnostic
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}


