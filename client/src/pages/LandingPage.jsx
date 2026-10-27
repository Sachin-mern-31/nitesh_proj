import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Compass, ArrowRight, Brain, Zap, Clock, BookOpen, 
  ChevronRight, CheckCircle2, Shield, Code2, Network, Target, Award,
  Terminal, Check
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden text-slate-100 flex flex-col">
      {/* Hero Section */}
      <div className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        {/* Floating Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 text-xs font-semibold tracking-wide mb-8 hover:border-white/[0.14] transition">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Intelligent Skill Gap Diagnostic & Adaptive Graph</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight max-w-5xl mx-auto leading-[1.12]">
          Master Any Tech Career With A{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Roadmap That Adapts To You.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-300/90 max-w-2xl mx-auto leading-relaxed font-normal">
          Break free from generic, rigid tutorials. PathGen evaluates your true skill baseline, verifies strict prerequisites, and dynamically recalibrates your path every time you learn.
        </p>

        {/* Hero Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-4 rounded-xl btn-glow-primary text-white font-bold text-sm flex items-center justify-center gap-2 transition"
          >
            <span>Start Free Diagnostic Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.1] text-slate-200 font-semibold text-sm transition"
          >
            Sign In to Dashboard
          </Link>
        </div>

        {/* Social Proof Strip */}
        <div className="mt-8 flex items-center justify-center gap-4 text-xs text-slate-400">
          <div className="flex -space-x-2">
            {['#334155', '#475569', '#3b4252', '#2e3440'].map((color, idx) => (
              <div
                key={idx}
                className="w-7 h-7 rounded-full border border-white/[0.1] flex items-center justify-center text-[10px] font-bold text-slate-300"
                style={{ backgroundColor: color }}
              >
                {['JD', 'AM', 'SK', 'NR'][idx]}
              </div>
            ))}
          </div>
          <span>Used by aspiring full-stack engineers & self-taught developers</span>
        </div>

        {/* Live Interactive Dashboard Preview Card */}
        <div className="mt-16 max-w-5xl mx-auto p-2 sm:p-3 rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="rounded-2xl bg-[#0b0f1a]/95 backdrop-blur-2xl border border-white/[0.06] p-4 sm:p-6 text-left space-y-5">
            {/* Window Topbar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                <span className="ml-2 font-mono text-[11px] text-slate-400">pathgen.ai/graph/mern-fullstack</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-300 font-mono bg-white/[0.04] border border-white/[0.08] px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Adaptive Engine: Active
              </div>
            </div>

            {/* Interactive Graph Node Simulation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Node 1 */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-emerald-500/25 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 font-mono tracking-wider flex items-center gap-1">
                    <Check className="w-3 h-3" /> Mastered
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Score: 92%</span>
                </div>
                <h4 className="font-bold text-white text-sm">HTML & Modern CSS</h4>
                <p className="text-xs text-slate-400">Semantic layouts, Flexbox, Grid & responsive design.</p>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400/80 w-full rounded-full" />
                </div>
              </div>

              {/* Node 2 - In Progress */}
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.12] space-y-2 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-200 font-mono tracking-wider flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-slate-300" /> Current Focus
                  </span>
                  <span className="text-[10px] text-slate-300 font-mono">60% Completed</span>
                </div>
                <h4 className="font-bold text-white text-sm">JavaScript Closures & Async</h4>
                <p className="text-xs text-slate-400">Promises, Event Loop, DOM manipulation & ES6+.</p>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-400 w-3/5 rounded-full" />
                </div>
              </div>

              {/* Node 3 - Locked */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-2 opacity-60">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider">
                    🔒 Locked Node
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Prereq: JS Core</span>
                </div>
                <h4 className="font-bold text-slate-300 text-sm">React Components & State</h4>
                <p className="text-xs text-slate-400">Hooks, Virtual DOM, side-effects & state management.</p>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-700 w-0 rounded-full" />
                </div>
              </div>
            </div>

            {/* AI Tutor Annotation Pill */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3 text-xs text-slate-300">
              <div className="w-7 h-7 rounded-lg bg-white/[0.06] text-slate-300 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <p>
                <strong className="text-slate-200">AI Tutor Insight:</strong> JavaScript prerequisites are strictly validated before React is unlocked, preventing conceptual bottlenecks.
              </p>
            </div>
          </div>
        </div>

        {/* Bento Grid Architecture Features */}
        <div className="mt-28 text-left space-y-8">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block font-mono">Engine Architecture</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Built to Engineer Authentic Mastery</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1: Diagnostic */}
            <div className="p-7 rounded-3xl glass-panel glass-panel-hover space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-slate-300 flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">1. Diagnostic Skill Gap Audit</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Take a concise baseline assessment. PathGen instantly computes your score matrix and classifies skills into Strong, Needs Improvement, or Missing.
              </p>
            </div>

            {/* Bento Card 2: Dependency Graph */}
            <div className="p-7 rounded-3xl glass-panel glass-panel-hover space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-slate-300 flex items-center justify-center">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">2. Strict Prerequisite Graphs</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                No illogical learning jumps. Advanced modules stay locked until required foundation concepts are proven through diagnostic quizzes.
              </p>
            </div>

            {/* Bento Card 3: Dynamic Adaptive Loop */}
            <div className="p-7 rounded-3xl glass-panel glass-panel-hover space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-slate-300 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">3. Real-Time Recalibration</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Fail a quiz? Remedial micro-modules are injected immediately. Excel with high marks? The engine fast-tracks you to advanced concepts.
              </p>
            </div>
          </div>
        </div>

        {/* Traditional vs PathGen Comparison */}
        <div className="mt-24 p-8 rounded-3xl glass-panel border border-white/[0.08] text-left">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-white">Why Static Roadmaps Fail</h3>
            <p className="text-xs text-slate-400 mt-2">Compare traditional one-size-fits-all roadmaps to PathGen AI's adaptive engine.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/15 space-y-3">
              <span className="text-xs font-bold text-rose-300/80 uppercase tracking-wider block">Traditional Static Roadmaps</span>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li className="flex items-center gap-2">❌ Blindly assumes everyone starts at the same baseline</li>
                <li className="flex items-center gap-2">❌ Never tests if you actually comprehended the topic</li>
                <li className="flex items-center gap-2">❌ Ignores personal time commitments and study schedules</li>
                <li className="flex items-center gap-2">❌ Leads to tutorial hell with zero feedback</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.09] space-y-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">PathGen Adaptive System</span>
              <ul className="space-y-2.5 text-xs text-slate-200">
                <li className="flex items-center gap-2">✓ Diagnostic quiz pinpoints exact baseline knowledge</li>
                <li className="flex items-center gap-2">✓ Adaptive engine adjusts duration to your actual weekly hours</li>
                <li className="flex items-center gap-2">✓ Topic quizzes trigger live dynamic path recalibrations</li>
                <li className="flex items-center gap-2">✓ 24/7 AI Tutor explains code snippets and generates practice queries</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="mt-24 relative rounded-3xl p-10 text-center overflow-hidden border border-white/[0.08] bg-[#0e121c]">
          <h2 className="text-3xl font-extrabold text-white mb-3">Ready to Accelerate Your Career?</h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto mb-8 font-normal">
            Take the 3-minute diagnostic assessment and obtain your personalized, adaptive learning roadmap today.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl btn-glow-primary text-white font-bold text-sm transition"
          >
            <span>Generate Your Custom Roadmap</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

