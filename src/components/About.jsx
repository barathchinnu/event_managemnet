import React from 'react';
import { 
  Sparkles, 
  Layers, 
  Cpu, 
  Users2, 
  Award, 
  CheckCircle2, 
  Target, 
  TrendingUp, 
  Compass 
} from 'lucide-react';
import { FEST_DETAILS } from '../data/events';

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-950/70 border-t border-slate-900">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-amber-500/30 shadow-md">
            <img src="/cea-logo.png" alt="CEA" className="w-4 h-4 object-contain" />
            <span>Civil Engineering Association (CEA) Presents</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-6 font-heading">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">CIVISTA</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            CIVISTA is a college event designed to bring students together through technology, creativity, competition and teamwork. From technical presentations and quizzes to exciting non-technical challenges, CIVISTA provides a platform for students to showcase their knowledge, skills and team spirit.
          </p>
        </div>

        {/* 4 Required Key Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Card 1: 4 Events */}
          <div className="glass-card glass-card-hover p-6 rounded-3xl border border-indigo-500/20 relative group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <div className="text-3xl font-extrabold text-white mb-1 font-heading">
              4 Events
            </div>
            <div className="text-sm font-semibold text-indigo-300 mb-2">
              Curated Competitions
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Carefully crafted spectrum of events testing presentation clarity, technical acumen, financial strategy, and physical coordination.
            </p>
          </div>

          {/* Card 2: Technical & Non-Technical */}
          <div className="glass-card glass-card-hover p-6 rounded-3xl border border-purple-500/20 relative group">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <div className="text-3xl font-extrabold text-white mb-1 font-heading">
              Tech & Non-Tech
            </div>
            <div className="text-sm font-semibold text-purple-300 mb-2">
              Balanced Arenas
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Equally balanced between high-level algorithmic & research challenges and heart-pounding cricket strategy & synergy games.
            </p>
          </div>

          {/* Card 3: Team Challenges */}
          <div className="glass-card glass-card-hover p-6 rounded-3xl border border-pink-500/20 relative group">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users2 className="w-6 h-6" />
            </div>
            <div className="text-3xl font-extrabold text-white mb-1 font-heading">
              Team Challenges
            </div>
            <div className="text-sm font-semibold text-pink-300 mb-2">
              Collaborative Synergy
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Experience the power of camaraderie. Forge bonds, collaborate under pressure, and conquer podiums together with your crew.
            </p>
          </div>

          {/* Card 4: One Exciting Experience */}
          <div className="glass-card glass-card-hover p-6 rounded-3xl border border-amber-500/20 relative group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-3xl font-extrabold text-white mb-1 font-heading">
              One Exciting
            </div>
            <div className="text-sm font-semibold text-amber-300 mb-2">
              Unforgettable Experience
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              A full day of thrilling spectacles, vibrant campus atmosphere, networking with industry judges, food stalls, and certificate awards.
            </p>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="glass-card rounded-3xl p-8 sm:p-10 border border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 shrink-0">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">Our Mission</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  To ignite competitive excellence and cultivate cross-disciplinary skills among future engineers, creators, and leaders.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">Skill Development</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Real-time problem solving, impromptu public speaking, negotiation tactics, and high-trust leadership under dynamic rules.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">Open to All Colleges</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Welcoming undergraduate and postgraduate students from engineering, science, management, and technology institutions nationwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
