import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, updateProfile } from '../services/api';
import { Target, Clock, BookOpen, Sparkles, Check, ChevronRight, Zap } from 'lucide-react';

export default function ProfileSetup() {
  const navigate = useNavigate();

  const [educationLevel, setEducationLevel] = useState('Undergraduate');
  const [careerGoalSelect, setCareerGoalSelect] = useState('MERN Stack Developer');
  const [customGoal, setCustomGoal] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Beginner');
  const [existingSkills, setExistingSkills] = useState(['HTML', 'CSS']);
  const [interests, setInterests] = useState(['Web Development', 'Full Stack Apps']);
  const [dailyStudyHours, setDailyStudyHours] = useState(2);
  const [weeklyStudyDays, setWeeklyStudyDays] = useState(5);
  const [preferredLearningStyle, setPreferredLearningStyle] = useState('Project-based');

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const careerOptions = [
    'MERN Stack Developer',
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'Data Analyst',
    'Data Scientist',
    'AI/ML Engineer',
    'Cybersecurity Engineer',
    'Cloud Engineer',
    'Other'
  ];

  const skillOptions = [
    'HTML', 'CSS', 'JavaScript', 'DOM', 'React', 'Node.js',
    'Express.js', 'MongoDB', 'SQL', 'Python', 'Pandas', 'Git'
  ];

  useEffect(() => {
    const fetchExistingProfile = async () => {
      try {
        setLoading(true);
        const res = await getProfile();
        if (res.data && res.data.data) {
          const p = res.data.data;
          setEducationLevel(p.educationLevel || 'Undergraduate');
          if (careerOptions.includes(p.careerGoal)) {
            setCareerGoalSelect(p.careerGoal);
          } else {
            setCareerGoalSelect('Other');
            setCustomGoal(p.careerGoal);
          }
          setExperienceLevel(p.experienceLevel || 'Beginner');
          setExistingSkills(p.existingSkills || []);
          setInterests(p.interests || []);
          setDailyStudyHours(p.dailyStudyHours || 2);
          setWeeklyStudyDays(p.weeklyStudyDays || 5);
          setPreferredLearningStyle(p.preferredLearningStyle || 'Project-based');
        }
      } catch (err) {
        // No existing profile found, proceed with defaults
      } finally {
        setLoading(false);
      }
    };
    fetchExistingProfile();
  }, []);

  const toggleSkill = (skill) => {
    if (existingSkills.includes(skill)) {
      setExistingSkills(existingSkills.filter((s) => s !== skill));
    } else {
      setExistingSkills([...existingSkills, skill]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const finalGoal = careerGoalSelect === 'Other' ? (customGoal || 'Full Stack Developer') : careerGoalSelect;

    try {
      await updateProfile({
        educationLevel,
        careerGoal: finalGoal,
        experienceLevel,
        existingSkills,
        interests,
        dailyStudyHours: Number(dailyStudyHours),
        weeklyStudyDays: Number(weeklyStudyDays),
        preferredLearningStyle
      });
      setSaving(false);
      navigate('/assessment');
    } catch (err) {
      console.error('Error saving profile:', err);
      setSaving(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 flex justify-center">
      <div className="max-w-3xl w-full glass-panel border border-white/[0.09] rounded-3xl p-6 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.4)] space-y-8 relative overflow-hidden">
        <div className="border-b border-white/[0.07] pb-6 space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-slate-400" />
            <span>Profile Calibration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Configure Your Learning Parameters</h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Our adaptive algorithm utilizes your goals, prior knowledge, and weekly availability to design a personalized roadmap.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          {/* Section 1: Career & Experience */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Target className="w-4 h-4 text-slate-400" /> 1. Career Goal & Experience Level
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider font-mono">Target Career</label>
                <select
                  value={careerGoalSelect}
                  onChange={(e) => setCareerGoalSelect(e.target.value)}
                  className="w-full glass-input rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100"
                >
                  {careerOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#0b0f19] text-white">{opt}</option>
                  ))}
                </select>
              </div>

              {careerGoalSelect === 'Other' && (
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider font-mono">Custom Career Goal</label>
                  <input
                    type="text"
                    value={customGoal}
                    onChange={(e) => setCustomGoal(e.target.value)}
                    placeholder="e.g. Distributed Systems Engineer"
                    className="w-full glass-input rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100"
                    required
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider font-mono">Education Level</label>
                <select
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                  className="w-full glass-input rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100"
                >
                  <option value="High School" className="bg-[#0b0f19]">High School</option>
                  <option value="Undergraduate" className="bg-[#0b0f19]">Undergraduate</option>
                  <option value="Postgraduate" className="bg-[#0b0f19]">Postgraduate</option>
                  <option value="Self-Taught" className="bg-[#0b0f19]">Self-Taught</option>
                  <option value="Other" className="bg-[#0b0f19]">Other</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider font-mono">Current Experience</label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full glass-input rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100"
                >
                  <option value="Beginner" className="bg-[#0b0f19]">Beginner (Starting from scratch)</option>
                  <option value="Intermediate" className="bg-[#0b0f19]">Intermediate (Basic syntax known)</option>
                  <option value="Advanced" className="bg-[#0b0f19]">Advanced (Built real applications)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Existing Skills */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-slate-400" /> 2. Existing Skills
            </h3>
            <p className="text-xs text-slate-400">Select topics you already have prior experience with:</p>

            <div className="flex flex-wrap gap-2 pt-1">
              {skillOptions.map((skill) => {
                const isSelected = existingSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all duration-200 border ${
                      isSelected
                        ? 'bg-white/[0.08] text-white border-white/[0.25]'
                        : 'bg-white/[0.03] text-slate-400 border-white/[0.07] hover:border-white/[0.15] hover:text-slate-200'
                    }`}
                  >
                    {isSelected ? <Check className="w-3.5 h-3.5 text-slate-200" /> : <div className="w-2 h-2 rounded-full bg-slate-600" />}
                    <span>{skill}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Time Availability & Learning Style */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" /> 3. Availability & Learning Style
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-300 uppercase font-mono">
                  <span>Hours / Day</span>
                  <span className="text-slate-200 font-mono text-sm">{dailyStudyHours}h</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="8"
                  step="0.5"
                  value={dailyStudyHours}
                  onChange={(e) => setDailyStudyHours(e.target.value)}
                  className="w-full accent-slate-400"
                />
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-300 uppercase font-mono">
                  <span>Days / Week</span>
                  <span className="text-slate-200 font-mono text-sm">{weeklyStudyDays} days</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="7"
                  step="1"
                  value={weeklyStudyDays}
                  onChange={(e) => setWeeklyStudyDays(e.target.value)}
                  className="w-full accent-slate-400"
                />
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <label className="block text-[11px] font-bold text-slate-300 uppercase font-mono">Style</label>
                <select
                  value={preferredLearningStyle}
                  onChange={(e) => setPreferredLearningStyle(e.target.value)}
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs text-slate-100"
                >
                  <option value="Project-based" className="bg-[#0b0f19]">Project-based</option>
                  <option value="Video-based" className="bg-[#0b0f19]">Video-based</option>
                  <option value="Reading" className="bg-[#0b0f19]">Documentation-first</option>
                  <option value="Practice-based" className="bg-[#0b0f19]">Interactive Exercises</option>
                  <option value="Mixed" className="bg-[#0b0f19]">Mixed Approach</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.08] flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3.5 rounded-xl btn-glow-primary text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition disabled:opacity-50"
            >
              <span>{saving ? 'Saving Parameters...' : 'Save & Proceed to Diagnostic Assessment'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


