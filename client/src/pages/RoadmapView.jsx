import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRoadmap, updateTopicStatus } from '../services/api';
import { 
  MapPin, Clock, BookOpen, CheckCircle2, Circle, ArrowRight, Sparkles, 
  AlertCircle, RefreshCw, ChevronDown, ChevronUp, Layers, Check, ExternalLink, Zap
} from 'lucide-react';

export default function RoadmapView() {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchRoadmap();
  }, []);

  const fetchRoadmap = async () => {
    try {
      setLoading(true);
      const res = await getRoadmap();
      setRoadmap(res.data.data);
    } catch (err) {
      console.error('Error fetching roadmap:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (topicName, currentStatus) => {
    try {
      setUpdating(true);
      await updateTopicStatus({
        topicName,
        isCompleted: !currentStatus
      });
      fetchRoadmap();
    } catch (err) {
      console.error('Error updating topic status:', err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-slate-400">
        <RefreshCw className="w-8 h-8 animate-spin text-slate-400 mb-3" />
        <p className="text-xs font-mono text-slate-400">Rendering Personalized Learning Graph...</p>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="min-h-[70vh] p-8 flex items-center justify-center text-center">
        <div className="max-w-md p-8 rounded-3xl glass-panel space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.04] text-slate-300 border border-white/[0.08] flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white">No Roadmap Generated Yet</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Take the diagnostic skill evaluation to automatically map out your adaptive career journey.
          </p>
          <Link to="/assessment" className="inline-block px-6 py-3 rounded-xl btn-glow-primary text-white text-xs font-bold transition">
            Take Skill Assessment
          </Link>
        </div>
      </div>
    );
  }

  const totalTopics = roadmap.phases.reduce((acc, p) => acc + p.topics.length, 0);
  const completedTopicsCount = roadmap.phases.reduce(
    (acc, p) => acc + p.topics.filter(t => t.isCompleted).length, 0
  );
  const completionPercentage = totalTopics > 0 ? Math.round((completedTopicsCount / totalTopics) * 100) : 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 glass-panel border border-white/[0.09] shadow-[0_12px_40px_rgba(0,0,0,0.4)] overflow-hidden space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-slate-400" />
              <span>Adaptive Roadmap Architecture</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {roadmap.goal}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              {roadmap.summary}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center min-w-[130px]">
              <span className="text-[10px] text-slate-400 block uppercase font-mono tracking-wider">Completion</span>
              <span className="text-xl font-extrabold text-slate-200 font-mono">{completionPercentage}%</span>
              <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-slate-400 h-full rounded-full" style={{ width: `${completionPercentage}%` }} />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center min-w-[130px]">
              <span className="text-[10px] text-slate-400 block uppercase font-mono tracking-wider">Est. Duration</span>
              <span className="text-xl font-extrabold text-slate-300 font-mono">{roadmap.estimatedDuration}</span>
            </div>
          </div>
        </div>

        {roadmap.status === 're-adjusted' && (
          <div className="relative z-10 p-3.5 rounded-2xl bg-amber-500/[0.08] border border-amber-500/25 text-amber-300 text-xs flex items-center gap-2.5">
            <Zap className="w-4 h-4 shrink-0 text-amber-400" />
            <span>
              <strong>Adaptive Path Recalibrated:</strong> Remedial or accelerated modules were dynamically injected based on your topic quiz evaluations.
            </span>
          </div>
        )}
      </div>

      {/* Connected Graph Phases */}
      <div className="space-y-10 relative">
        {roadmap.phases.map((phase, pIdx) => (
          <div key={phase.phase} className="relative space-y-4">
            {/* Phase Header Node */}
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-slate-800 text-slate-200 border border-white/[0.1] font-extrabold flex items-center justify-center text-xs font-mono shrink-0">
                0{phase.phase}
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  {phase.title}
                </h2>
                <span className="text-[10px] font-mono font-semibold text-slate-300 bg-white/[0.04] border border-white/[0.08] px-2.5 py-0.5 rounded-full">
                  {phase.duration}
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">• {phase.reason}</span>
              </div>
            </div>

            {/* Topics Node Stack */}
            <div className="grid grid-cols-1 gap-3.5 sm:pl-12">
              {phase.topics.map((topic) => {
                const isExpanded = expandedTopic === topic.name;

                let difficultyTag = {
                  color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                  dot: 'bg-emerald-400'
                };
                if (topic.difficulty === 'Basic') {
                  difficultyTag = { color: 'bg-slate-500/10 text-slate-300 border-slate-500/20', dot: 'bg-slate-400' };
                } else if (topic.difficulty === 'Intermediate') {
                  difficultyTag = { color: 'bg-zinc-500/10 text-zinc-300 border-zinc-500/20', dot: 'bg-zinc-400' };
                } else if (topic.difficulty === 'Advanced') {
                  difficultyTag = { color: 'bg-amber-500/10 text-amber-300/80 border-amber-500/20', dot: 'bg-amber-400' };
                }

                return (
                  <div
                    key={topic.name}
                    className={`rounded-2xl transition-all duration-200 border ${
                      topic.isCompleted
                        ? 'bg-slate-900/40 border-white/[0.04] opacity-80'
                        : 'glass-panel glass-panel-hover'
                    }`}
                  >
                    <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Left: Info & Checkbox */}
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <button
                            onClick={() => handleToggleComplete(topic.name, topic.isCompleted)}
                            className="flex items-center gap-2.5 group text-left"
                            title="Toggle module completion"
                          >
                            {topic.isCompleted ? (
                              <div className="w-5 h-5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                                <Check className="w-3.5 h-3.5" />
                              </div>
                            ) : (
                              <div className="w-5 h-5 rounded-lg border border-slate-600 group-hover:border-slate-400 group-hover:bg-white/[0.05] flex items-center justify-center shrink-0 transition" />
                            )}
                            <h3 className={`text-sm font-bold text-white transition ${topic.isCompleted ? 'line-through text-slate-400' : ''}`}>
                              {topic.name}
                            </h3>
                          </button>

                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border ${difficultyTag.color}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${difficultyTag.dot}`} />
                            {topic.difficulty}
                          </span>

                          <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-500" /> {topic.estimatedHours}h
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                          {topic.description}
                        </p>

                        {topic.whyRecommended && (
                          <div className="text-[11px] text-slate-300 bg-white/[0.04] px-3 py-1 rounded-xl border border-white/[0.08] inline-flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-slate-400 shrink-0" />
                            <span><strong>Adaptive Reason:</strong> {topic.whyRecommended}</span>
                          </div>
                        )}

                        {topic.prerequisites && topic.prerequisites.length > 0 && (
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-0.5">
                            <span className="font-mono text-[10px] text-slate-500">Prereqs:</span>
                            {topic.prerequisites.map((p) => (
                              <span key={p} className="bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-md text-slate-300 font-mono text-[10px]">
                                {p}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2 shrink-0 border-t sm:border-t-0 border-white/[0.06] pt-3 sm:pt-0">
                        <button
                          onClick={() => setExpandedTopic(isExpanded ? null : topic.name)}
                          className="px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs text-slate-300 font-medium flex items-center gap-1.5 transition"
                        >
                          Resources {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>

                        <Link
                          to={`/topic/${encodeURIComponent(topic.name)}`}
                          className="px-4 py-2 rounded-xl btn-glow-primary text-white text-xs font-semibold flex items-center gap-1.5 transition"
                        >
                          <span>Study & Quiz</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* Resources Drawer */}
                    {isExpanded && (
                      <div className="border-t border-white/[0.06] p-4 sm:p-5 bg-black/30 rounded-b-2xl space-y-3">
                        <div className="flex items-center justify-between text-xs text-slate-300 font-bold uppercase tracking-wider">
                          <span className="flex items-center gap-2 font-mono text-[11px] text-slate-300">
                            <BookOpen className="w-3.5 h-3.5" /> Curated Reference Materials
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {(topic.resources || []).map((res, rIdx) => (
                            <a
                              key={rIdx}
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.2] text-xs flex items-center justify-between transition group hover:bg-white/[0.04]"
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
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

