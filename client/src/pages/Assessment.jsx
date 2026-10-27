import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAssessmentQuestions, submitAssessment, generateRoadmap, getProfile } from '../services/api';
import { 
  CheckCircle2, AlertTriangle, ArrowRight, Brain, Award, BarChart2, 
  Sparkles, RefreshCw, Check, Target, ChevronRight, Zap
} from 'lucide-react';

export default function Assessment() {
  const navigate = useNavigate();

  const [careerGoal, setCareerGoal] = useState('MERN Stack Developer');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const profRes = await getProfile().catch(() => null);
        const goal = profRes?.data?.data?.careerGoal || 'MERN Stack Developer';
        setCareerGoal(goal);

        const res = await getAssessmentQuestions(goal);
        setQuestions(res.data.questions || []);
      } catch (err) {
        console.error('Error fetching questions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleOptionSelect = (qId, optionIdx) => {
    setAnswers({ ...answers, [qId]: optionIdx });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await submitAssessment({
        careerGoal,
        userAnswers: answers
      });
      setResult(res.data.data);
    } catch (err) {
      console.error('Error submitting assessment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGenerateRoadmap = async () => {
    setGenerating(true);
    try {
      await generateRoadmap();
      navigate('/roadmap');
    } catch (err) {
      console.error('Error generating roadmap:', err);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-slate-400">
        <RefreshCw className="w-8 h-8 animate-spin text-slate-400 mb-3" />
        <p className="text-xs font-mono text-slate-400">Loading Diagnostic Skill Bank for {careerGoal}...</p>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;
  const progressPercent = questions.length > 0 ? Math.round((answeredCount / questions.length) * 100) : 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8 flex justify-center">
      <div className="max-w-4xl w-full glass-panel border border-white/[0.09] rounded-3xl p-6 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.4)] space-y-8 relative overflow-hidden">
        {/* Header Section */}
        <div className="border-b border-white/[0.07] pb-6 space-y-3 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <Brain className="w-3.5 h-3.5 text-slate-400" />
                <span>Diagnostic Assessment</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Skill Baseline: {careerGoal}
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Pinpoint your exact knowledge gaps to automatically customize your roadmap phases.
              </p>
            </div>

            {!result && (
              <div className="text-right sm:text-right shrink-0">
                <span className="text-xs text-slate-400 font-mono">Progress: {answeredCount}/{questions.length} Questions</span>
                <div className="w-32 bg-slate-900 h-1.5 rounded-full mt-1.5 overflow-hidden border border-white/[0.06]">
                  <div className="bg-slate-400 h-full rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Result View */}
        {result ? (
          <div className="space-y-8 relative z-10">
            {/* Score Showcase */}
            <div className="p-8 rounded-3xl glass-panel border border-white/[0.1] text-center space-y-4 relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-slate-300 flex items-center justify-center mx-auto">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-white">Diagnostic Evaluation Complete</h2>
                <p className="text-xs text-slate-400 mt-1">Your competency baseline across required topics</p>
              </div>
              <div className="text-5xl font-extrabold text-white font-mono">
                {result.percentage}%
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {result.totalScore} of {result.totalQuestions} questions correct
              </p>
            </div>

            {/* Skill Level Mastery Breakdown */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-slate-400" /> Topic Proficiency Matrix
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {result.skillBreakdown.map((sb) => {
                  let badgeStyle = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25';
                  if (sb.level === 'Beginner') badgeStyle = 'bg-rose-500/10 text-rose-400 border-rose-500/25';
                  if (sb.level === 'Basic') badgeStyle = 'bg-slate-500/10 text-slate-300 border-slate-500/25';
                  if (sb.level === 'Intermediate') badgeStyle = 'bg-zinc-500/10 text-zinc-300 border-zinc-500/25';

                  return (
                    <div key={sb.skill} className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="font-bold text-white text-sm block">{sb.skill}</span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {sb.score}/{sb.total} Correct ({sb.percentage}%)
                        </span>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border font-mono ${badgeStyle}`}>
                        {sb.level}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3 Skill Categorization Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20 space-y-3">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Strong Skills
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {result.strongSkills && result.strongSkills.length > 0 ? (
                    result.strongSkills.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 text-xs font-medium border border-emerald-500/20 font-mono">
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500 italic">None identified</span>
                  )}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20 space-y-3">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Needs Practice
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {result.improvementSkills && result.improvementSkills.length > 0 ? (
                    result.improvementSkills.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 text-xs font-medium border border-amber-500/20 font-mono">
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500 italic">None identified</span>
                  )}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-rose-500/[0.04] border border-rose-500/20 space-y-3">
                <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                  <Brain className="w-4 h-4" /> Missing Prereqs
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {result.missingSkills && result.missingSkills.length > 0 ? (
                    result.missingSkills.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-300 text-xs font-medium border border-rose-500/20 font-mono">
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500 italic">None identified</span>
                  )}
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-6 border-t border-white/[0.08] text-center">
              <button
                onClick={handleGenerateRoadmap}
                disabled={generating}
                className="w-full sm:w-auto px-10 py-4 rounded-xl btn-glow-primary text-white font-bold text-sm flex items-center justify-center gap-3 transition"
              >
                {generating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Synthesizing Adaptive Roadmap...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate AI Personalized Roadmap</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Question Form */
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="space-y-6">
              {questions.map((q, idx) => (
                <div key={q.questionId} className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold font-mono text-slate-300 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/[0.08]">
                      Q{idx + 1} • {q.skill}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider bg-white/[0.04] px-2 py-0.5 rounded">
                      {q.difficulty}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white leading-snug">{q.question}</h3>

                  <div className="grid grid-cols-1 gap-2.5 pt-2">
                    {q.options.map((option, optIdx) => {
                      const isSelected = answers[q.questionId] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleOptionSelect(q.questionId, optIdx)}
                          className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-between border ${
                            isSelected
                              ? 'bg-white/[0.06] text-white border-white/[0.25]'
                              : 'bg-white/[0.02] text-slate-300 border-white/[0.06] hover:border-white/[0.15] hover:bg-white/[0.04]'
                          }`}
                        >
                          <span>{option}</span>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                            isSelected ? 'border-slate-300 bg-slate-300' : 'border-slate-600'
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                {answeredCount} of {questions.length} answered
              </span>

              <button
                type="submit"
                disabled={submitting || answeredCount === 0}
                className="px-8 py-3.5 rounded-xl btn-glow-primary text-white font-bold text-xs flex items-center gap-2 transition disabled:opacity-50"
              >
                {submitting ? 'Auditing Skills...' : 'Submit Assessment & Analyze Skill Matrix'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

