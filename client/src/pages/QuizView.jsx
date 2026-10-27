import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getQuiz, submitQuiz } from '../services/api';
import { Award, AlertTriangle, CheckCircle2, ArrowRight, RefreshCw, Sparkles, Check, ChevronLeft, Zap } from 'lucide-react';

export default function QuizView() {
  const { topicName } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchQuiz();
  }, [topicName]);

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const res = await getQuiz(topicName);
      setQuestions(res.data.questions || []);
    } catch (err) {
      console.error('Error fetching quiz:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (qId, optionIdx) => {
    setAnswers({ ...answers, [qId]: optionIdx });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await submitQuiz(topicName, { userAnswers: answers });
      setResult(res.data.data);
    } catch (err) {
      console.error('Error submitting quiz:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-slate-400">
        <RefreshCw className="w-8 h-8 animate-spin text-slate-400 mb-3" />
        <p className="text-xs font-mono text-slate-400">Loading Diagnostic Quiz for {topicName}...</p>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 flex justify-center">
      <div className="max-w-3xl w-full glass-panel border border-white/[0.09] rounded-3xl p-6 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.4)] space-y-8 relative overflow-hidden">
        {/* Header */}
        <div className="border-b border-white/[0.07] pb-6 flex items-center justify-between relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5 text-slate-400" />
              <span>Topic Verification</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{topicName} Quiz</h1>
            <p className="text-xs text-slate-400 mt-1">Passing this verification test unlocks subsequent roadmap prerequisites.</p>
          </div>

          <Link to={`/topic/${encodeURIComponent(topicName)}`} className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
            <ChevronLeft className="w-4 h-4" /> Back to Notes
          </Link>
        </div>

        {result ? (
          <div className="space-y-6 relative z-10">
            {/* Score Banner */}
            <div className={`p-8 rounded-3xl border text-center space-y-4 shadow-xl ${
              result.passed
                ? 'bg-emerald-500/[0.08] border-emerald-500/30'
                : 'bg-rose-500/[0.08] border-rose-500/30'
            }`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto ${
                result.passed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}>
                {result.passed ? <Check className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
              </div>

              <h2 className="text-2xl font-extrabold text-white">
                {result.passed ? 'Verification Passed! Module Complete' : 'Revision Suggested'}
              </h2>

              <div className="text-5xl font-extrabold text-white font-mono">
                {result.percentage}% <span className="text-xs font-normal text-slate-400 font-sans">({result.score}/{result.totalQuestions} Correct)</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">{result.feedback}</p>
            </div>

            {/* AI Recommendation Message */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2 font-mono">
                <Sparkles className="w-4 h-4 text-slate-400" /> AI Adaptive Feedback
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">{result.aiRecommendation}</p>
            </div>

            {/* Navigation Buttons */}
            <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
              <Link to="/roadmap" className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-xs text-slate-300 font-semibold text-center hover:bg-white/[0.1] transition">
                Return to Roadmap Graph
              </Link>

              <Link to="/dashboard" className="w-full sm:w-auto px-6 py-3 rounded-xl btn-glow-primary text-white text-xs font-semibold text-center flex items-center justify-center gap-2 transition">
                <span>View Updated Metrics</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-6">
              {questions.map((q, idx) => (
                <div key={q.questionId} className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-slate-300 bg-white/[0.04] px-2.5 py-1 rounded-md border border-white/[0.08]">
                      Question {idx + 1} of {questions.length}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-semibold text-white leading-snug">{q.question}</h3>

                  <div className="grid grid-cols-1 gap-2.5 pt-1">
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
                {submitting ? 'Verifying Answers...' : 'Submit Quiz & Recalibrate'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

