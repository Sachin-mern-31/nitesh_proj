import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTopicDetails } from '../services/api';
import { 
  BookOpen, CheckCircle2, Code2, Award, ArrowRight, ExternalLink, 
  RefreshCw, Sparkles, Terminal, Copy, Check, ChevronLeft, Zap
} from 'lucide-react';

export default function TopicDetail() {
  const { topicName } = useParams();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchDetails();
  }, [topicName]);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const res = await getTopicDetails(topicName);
      setTopic(res.data.data);
    } catch (err) {
      console.error('Error fetching topic details:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyCode = (code) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-slate-400">
        <RefreshCw className="w-8 h-8 animate-spin text-slate-400 mb-3" />
        <p className="text-xs font-mono text-slate-400">Fetching Learning Materials for {topicName}...</p>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="min-h-[70vh] p-8 flex items-center justify-center text-center">
        <div className="max-w-md p-8 rounded-3xl glass-panel space-y-4">
          <h2 className="text-lg font-bold text-white">Topic Not Found</h2>
          <p className="text-xs text-slate-400">The requested learning module is not registered in the roadmap.</p>
          <Link to="/roadmap" className="inline-block px-6 py-2.5 rounded-xl btn-glow-primary text-white text-xs font-bold transition">
            Back to Roadmap
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* Back Link */}
      <Link to="/roadmap" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition">
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Full Roadmap</span>
      </Link>

      {/* Header Overview Card */}
      <div className="relative rounded-3xl p-6 sm:p-8 glass-panel border border-white/[0.09] shadow-[0_12px_40px_rgba(0,0,0,0.4)] overflow-hidden space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold font-mono text-slate-300 bg-white/[0.04] border border-white/[0.08] px-3 py-1 rounded-full uppercase tracking-wider">
              {topic.category || 'Core Skill'}
            </span>
            <span className="text-[10px] font-bold font-mono text-slate-300 bg-white/[0.04] border border-white/[0.08] px-3 py-1 rounded-full uppercase tracking-wider">
              {topic.difficulty || 'Beginner'}
            </span>
          </div>

          <span className="text-xs text-slate-400 font-mono bg-white/[0.04] px-3 py-1 rounded-lg border border-white/[0.06]">
            Est. Study Time: {topic.estimatedHours || 4} Hours
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight relative z-10">
          {topic.name}
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl relative z-10">
          {topic.description}
        </p>
      </div>

      {/* Grid: Objectives & Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Objectives */}
        <div className="glass-panel rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Key Learning Objectives
          </h3>
          <ul className="space-y-3">
            {(topic.learningObjectives || [
              'Understand core fundamentals and semantic syntax',
              'Master standard problem-solving patterns in real code',
              'Implement modular clean code architecture'
            ]).map((obj, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs text-slate-300 leading-relaxed">
                <span className="w-5 h-5 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                  ✓
                </span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div className="glass-panel rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-slate-400" /> Curated References & Docs
          </h3>
          <div className="space-y-2.5">
            {(topic.resources || [
              { title: 'Official Documentation & Guides', type: 'Documentation', url: 'https://developer.mozilla.org', estimatedTime: '45 mins' }
            ]).map((res, rIdx) => (
              <a
                key={rIdx}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.2] text-xs flex items-center justify-between transition group hover:bg-white/[0.04]"
              >
                <div>
                  <span className="font-semibold text-slate-200 group-hover:text-white block">{res.title}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{res.type} • {res.estimatedTime || '30 mins'}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Practice Exercise & Code Window */}
      {topic.practiceExercise && (
        <div className="glass-panel rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Code2 className="w-4 h-4 text-slate-400" /> Practice Challenge: {topic.practiceExercise.title}
            </h3>
            <span className="text-[10px] font-mono text-slate-300 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.08]">
              Interactive
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">{topic.practiceExercise.instructions}</p>

          {/* Code Window Container */}
          <div className="rounded-2xl bg-[#06080e] border border-white/[0.08] overflow-hidden shadow-2xl">
            <div className="px-4 py-3 bg-white/[0.03] border-b border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                <span className="font-mono text-[11px] text-slate-400 ml-2">starter.js</span>
              </div>

              <button
                type="button"
                onClick={() => copyCode(topic.practiceExercise.starterCode)}
                className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-white/[0.06] transition"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <pre className="p-4 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
              <code>{topic.practiceExercise.starterCode}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Hands-On Mini Project */}
      {topic.miniProject && (
        <div className="glass-panel rounded-3xl p-6 space-y-3 border border-white/[0.08]">
          <div className="flex items-center gap-2 text-amber-300/80 text-xs font-bold uppercase tracking-wider font-mono">
            <Award className="w-4 h-4" />
            <span>Capstone Mini-Project: {topic.miniProject.title}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{topic.miniProject.description}</p>
        </div>
      )}

      {/* Footer Quiz Action Banner */}
      <div className="p-6 rounded-3xl glass-panel border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">Finished Studying This Topic?</h4>
          <p className="text-xs text-slate-400 mt-0.5">Test your comprehension with the 3-minute topic knowledge quiz.</p>
        </div>

        <Link
          to={`/quiz/${encodeURIComponent(topic.name)}`}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl btn-glow-primary text-white font-bold text-xs flex items-center justify-center gap-2 transition"
        >
          <Sparkles className="w-4 h-4" />
          <span>Take Topic Knowledge Quiz</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

