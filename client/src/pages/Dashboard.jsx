import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProgress, getRoadmap } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, AreaChart, Area } from 'recharts';
import { 
  Award, Flame, Clock, CheckCircle, ArrowRight, Sparkles, MapPin, 
  RefreshCw, TrendingUp, Compass, BookOpen, ChevronRight, Zap
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  const [progress, setProgress] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [progRes, roadRes] = await Promise.all([
        getProgress().catch(() => null),
        getRoadmap().catch(() => null)
      ]);

      if (progRes?.data?.data) {
        setProgress(progRes.data.data);
      }
      if (roadRes?.data?.data) {
        setRoadmap(roadRes.data.data);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-slate-400">
        <RefreshCw className="w-8 h-8 animate-spin text-slate-400 mb-3" />
        <p className="text-xs font-mono text-slate-400">Synchronizing Adaptive Learning Metrics...</p>
      </div>
    );
  }

  const skillData = progress?.skillProgress || [
    { skill: 'HTML & CSS', percentage: 90 },
    { skill: 'JavaScript', percentage: 70 },
    { skill: 'DOM API', percentage: 55 },
    { skill: 'React Core', percentage: 35 },
    { skill: 'Node.js', percentage: 20 },
    { skill: 'MongoDB', percentage: 10 }
  ];

  const weeklyData = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.2 },
    { day: 'Wed', hours: 1.8 },
    { day: 'Thu', hours: 4.0 },
    { day: 'Fri', hours: 2.5 },
    { day: 'Sat', hours: 3.8 },
    { day: 'Sun', hours: 2.0 }
  ];

  const barColors = ['#475569', '#64748b', '#334155', '#475569', '#64748b', '#334155'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 rounded-xl bg-[#0d1222]/95 backdrop-blur-md border border-white/10 shadow-2xl text-xs space-y-1">
          <p className="font-bold text-white">{label}</p>
          <p className="text-slate-300 font-mono">
            {payload[0].value} {payload[0].dataKey === 'hours' ? 'hours studied' : '% competency'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 glass-panel border border-white/[0.09] shadow-[0_12px_40px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-slate-400" />
            <span>Active Student Portal</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Welcome back, {user?.name || 'Engineer'}
          </h1>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-300">
            <span className="text-slate-400">Target Career:</span>
            <span className="font-semibold text-white px-2.5 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.08]">
              {progress?.careerGoal || 'MERN Stack Developer'}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">Pace:</span>
            <span className="font-semibold text-slate-300 font-mono">
              {progress?.estimatedDuration || '10 weeks'} roadmap
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <Link
            to="/roadmap"
            className="px-5 py-3 rounded-xl btn-glow-primary text-white font-semibold text-xs flex items-center justify-center gap-2 transition"
          >
            <MapPin className="w-4 h-4" />
            <span>Interactive Roadmap</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Top 4 Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Progress */}
        <div className="p-5 rounded-2xl glass-panel glass-panel-hover space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overall Progress</span>
            <div className="w-8 h-8 rounded-lg bg-white/[0.04] text-slate-300 border border-white/[0.08] flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white font-mono">
              {progress?.overallProgressPercentage || 25}%
            </span>
            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              +5% this week
            </span>
          </div>
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-white/[0.06]">
            <div
              className="bg-slate-400 h-full rounded-full transition-all duration-700"
              style={{ width: `${progress?.overallProgressPercentage || 25}%` }}
            />
          </div>
        </div>

        {/* Learning Streak */}
        <div className="p-5 rounded-2xl glass-panel glass-panel-hover space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Daily Streak</span>
            <div className="w-8 h-8 rounded-lg bg-white/[0.04] text-amber-300/80 border border-white/[0.08] flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-white font-mono">
              {progress?.learningStreakDays || 4}{' '}
              <span className="text-xs text-slate-400 font-sans font-normal">days</span>
            </div>
            <span className="text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
              On fire 🔥
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Keep studying today to maintain streak!</p>
        </div>

        {/* Study Time */}
        <div className="p-5 rounded-2xl glass-panel glass-panel-hover space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Weekly Effort</span>
            <div className="w-8 h-8 rounded-lg bg-white/[0.04] text-slate-300 border border-white/[0.08] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-white font-mono">
              {progress?.weeklyStudyHours || 14}{' '}
              <span className="text-xs text-slate-400 font-sans font-normal">hrs</span>
            </div>
            <span className="text-[11px] font-semibold text-slate-300 bg-white/[0.04] px-2 py-0.5 rounded-full border border-white/[0.08]">
              Target met
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Weekly goal: 10 hrs required</p>
        </div>

        {/* Completed Modules */}
        <div className="p-5 rounded-2xl glass-panel glass-panel-hover space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Modules Mastered</span>
            <div className="w-8 h-8 rounded-lg bg-white/[0.04] text-emerald-400/80 border border-white/[0.08] flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-white font-mono">
              {progress?.completedTopics?.length || 2}{' '}
              <span className="text-xs text-slate-400 font-sans font-normal">units</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Current: JS Core
            </span>
          </div>
          <p className="text-[11px] text-slate-400 truncate">
            Up Next: {progress?.currentTopic || 'JavaScript Fundamentals'}
          </p>
        </div>
      </div>

      {/* AI Adaptive Feedback Alert Card */}
      <div className="p-5 rounded-2xl glass-panel border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
            <Zap className="w-4 h-4 text-slate-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">Adaptive Recalibration Note</h4>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">Synced</span>
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Based on your skill assessment, JavaScript functions and array operations are prioritized before unlocking React state management.
            </p>
          </div>
        </div>

        <Link
          to={`/topic/${encodeURIComponent(progress?.currentTopic || 'JavaScript Fundamentals')}`}
          className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.1] text-white text-xs font-semibold shrink-0 transition flex items-center gap-1.5"
        >
          <span>Continue Learning</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Breakdown Chart */}
        <div className="p-6 rounded-3xl glass-panel space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-slate-400" />
                Competency Breakdown
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Assessed skill proficiency by topic</p>
            </div>
            <span className="text-[11px] font-mono text-slate-300 bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded-md">
              0 - 100%
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis type="number" domain={[0, 100]} stroke="#475569" fontSize={11} tickLine={false} />
                <YAxis dataKey="skill" type="category" stroke="#94a3b8" fontSize={11} width={85} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="percentage" radius={[0, 6, 6, 0]}>
                  {skillData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Study Activity Area Chart */}
        <div className="p-6 rounded-3xl glass-panel space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                Weekly Study Velocity
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Hours studied per day</p>
            </div>
            <span className="text-[11px] font-mono text-emerald-400/90 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
              Target: 2.0h/day
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="velocityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#64748b" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#64748b" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#475569" fontSize={11} tickLine={false} />
                <YAxis stroke="#475569" fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="#94a3b8" 
                  strokeWidth={2} 
                  fillOpacity={1} 
                  fill="url(#velocityGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

