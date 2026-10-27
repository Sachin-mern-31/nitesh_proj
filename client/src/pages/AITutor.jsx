import React, { useState, useEffect } from 'react';
import { askAITutor, getProgress } from '../services/api';
import { Sparkles, Send, Bot, User, Code, CheckCircle, RefreshCw, Terminal, Lightbulb } from 'lucide-react';

export default function AITutor() {
  const [query, setQuery] = useState('');
  const [currentTopic, setCurrentTopic] = useState('JavaScript Fundamentals');
  const [careerGoal, setCareerGoal] = useState('MERN Stack Developer');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello! I am your AI Learning Tutor, connected directly to your active learning path and prerequisite graph. Ask me to break down complex concepts, review code, or generate interactive practice problems!',
      practiceQuestion: null
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [selectedPracticeOption, setSelectedPracticeOption] = useState(null);

  useEffect(() => {
    fetchContext();
  }, []);

  const fetchContext = async () => {
    try {
      const res = await getProgress();
      if (res.data && res.data.data) {
        setCurrentTopic(res.data.data.currentTopic || 'JavaScript Fundamentals');
        setCareerGoal(res.data.data.careerGoal || 'MERN Stack Developer');
      }
    } catch (err) {
      console.error('Error fetching tutor context:', err);
    }
  };

  const handleSendQuery = async (userText) => {
    if (!userText.trim() || loading) return;

    setQuery('');
    setSelectedPracticeOption(null);

    const newMessages = [...messages, { sender: 'user', text: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await askAITutor({
        query: userText,
        currentTopic,
        chatHistory: newMessages.slice(-4)
      });

      const tutorReply = res.data.data;
      setMessages([
        ...newMessages,
        {
          sender: 'ai',
          text: tutorReply.reply,
          practiceQuestion: tutorReply.practiceQuestion
        }
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        {
          sender: 'ai',
          text: 'I encountered an issue reaching the AI engine. Meanwhile, test your knowledge with the topic quiz or review the starter code in the Roadmap module!',
          practiceQuestion: null
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendQuery(query);
  };

  const quickPrompts = [
    `Explain ${currentTopic} with a real-world analogy`,
    `Give me a coding exercise for ${currentTopic}`,
    `What are the most common beginner pitfalls in ${currentTopic}?`
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto flex flex-col space-y-6">
      {/* Header Banner */}
      <div className="relative rounded-3xl p-6 glass-panel border border-white/[0.09] shadow-[0_12px_40px_rgba(0,0,0,0.4)] overflow-hidden flex items-center justify-between gap-4">
        <div className="space-y-1 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 text-xs font-semibold tracking-wide mb-1">
            <Sparkles className="w-3.5 h-3.5 text-slate-400" />
            <span>24/7 Context-Aware Mentor</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">AI Learning Tutor</h1>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
            <span className="text-slate-400">Target:</span>
            <span className="font-semibold text-white px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08]">{careerGoal}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">Current Topic:</span>
            <span className="font-semibold text-slate-300 font-mono">{currentTopic}</span>
          </div>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-200 border border-white/[0.1] flex items-center justify-center shrink-0 hidden sm:flex">
          <Bot className="w-6 h-6" />
        </div>
      </div>

      {/* Chat Conversation Canvas */}
      <div className="glass-panel border border-white/[0.09] rounded-3xl p-5 sm:p-6 flex-1 min-h-[460px] flex flex-col justify-between space-y-5 shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
        {/* Messages Stream */}
        <div className="space-y-4 max-h-[520px] overflow-y-auto pr-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-200 border border-white/[0.1] flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-4 sm:p-5 rounded-2xl max-w-xl space-y-3.5 ${
                  msg.sender === 'user'
                    ? 'bg-slate-800 text-slate-100 border border-white/[0.1] rounded-tr-none'
                    : 'bg-white/[0.04] border border-white/[0.08] text-slate-100 rounded-tl-none shadow-sm backdrop-blur-md'
                }`}
              >
                <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>

                {/* Generated Practice Question */}
                {msg.practiceQuestion && (
                  <div className="mt-4 p-4 rounded-xl bg-black/40 border border-white/[0.08] space-y-3">
                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" /> Practice Challenge
                    </span>
                    <p className="font-semibold text-white text-xs sm:text-sm">{msg.practiceQuestion.question}</p>

                    <div className="space-y-2">
                      {msg.practiceQuestion.options.map((opt, optIdx) => {
                        const isSelected = selectedPracticeOption === optIdx;
                        const isCorrect = optIdx === msg.practiceQuestion.correctAnswer;
                        return (
                          <button
                            key={optIdx}
                            onClick={() => setSelectedPracticeOption(optIdx)}
                            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs transition flex items-center justify-between border ${
                              isSelected
                                ? isCorrect
                                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                                  : 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold'
                                : 'bg-white/[0.02] border-white/[0.06] text-slate-300 hover:border-white/[0.15]'
                            }`}
                          >
                            <span>{opt}</span>
                            {isSelected && (
                              <span className="text-[10px] uppercase font-bold font-mono">
                                {isCorrect ? '✓ Correct' : '✗ Try Again'}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {selectedPracticeOption !== null && (
                      <p className="text-[11px] text-slate-400 pt-2 border-t border-white/[0.08]">
                        💡 <strong>Explanation:</strong> {msg.practiceQuestion.explanation}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-white/[0.08] border border-white/[0.1] text-slate-200 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>AI Tutor is analyzing topic dependencies and formulating answer...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/[0.06]">
          <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
            <Lightbulb className="w-3 h-3 text-amber-400" /> Prompts:
          </span>
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendQuery(p)}
              className="text-[11px] text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] px-2.5 py-1 rounded-lg transition"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSubmit} className="flex gap-2.5">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Ask a question or request a code snippet on ${currentTopic}...`}
            className="flex-1 glass-input rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-5 py-3 rounded-xl btn-glow-primary text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition disabled:opacity-50"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}

