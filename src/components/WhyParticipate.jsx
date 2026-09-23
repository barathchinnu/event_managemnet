import React from 'react';
import { 
  Lightbulb, 
  Trophy, 
  Users2, 
  PartyPopper, 
  CheckCircle2, 
  Sparkles, 
  ArrowUpRight 
} from 'lucide-react';

const WHY_ITEMS = [
  {
    id: "learn",
    title: "Learn",
    tagline: "Gain knowledge and discover new ideas.",
    description: "Expand your technical repertoire, explore groundbreaking research methodologies, and receive constructive critiques from experienced academicians and industry veterans.",
    icon: Lightbulb,
    badge: "Knowledge Expansion",
    accentBorder: "group-hover:border-blue-500/50",
    iconBg: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
    gradient: "from-blue-500/10 via-transparent to-transparent",
    benefits: ["Cutting-edge tech concepts", "Jury feedback sessions", "Work methodology insights"]
  },
  {
    id: "compete",
    title: "Compete",
    tagline: "Challenge yourself and demonstrate your skills.",
    description: "Pit your intellect against premier collegiate minds. Whether solving rapid algorithmic bugs or strategizing an IPL auction roster, discover your peak potential under pressure.",
    icon: Trophy,
    badge: "Podium Glory",
    accentBorder: "group-hover:border-amber-500/50",
    iconBg: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
    gradient: "from-amber-500/10 via-transparent to-transparent",
    benefits: ["Winner Certificates", "Participation Certificates", "Merit & Recognition Awards"]
  },
  {
    id: "connect",
    title: "Connect",
    tagline: "Meet students from different departments and colleges.",
    description: "Exchange ideas, connect with like-minded coders, strategists, and problem-solvers across 30+ regional colleges. Form networks that last beyond your academic graduation.",
    icon: Users2,
    badge: "Networking",
    accentBorder: "group-hover:border-purple-500/50",
    iconBg: "bg-purple-500/15 text-purple-400 border border-purple-500/30",
    gradient: "from-purple-500/10 via-transparent to-transparent",
    benefits: ["Cross-college peer network", "Student community bonds", "Industry jury contacts"]
  },
  {
    id: "have-fun",
    title: "Have Fun",
    tagline: "Enjoy exciting technical and non-technical events.",
    description: "Beyond intense intellect, CIVISTA celebrates college fest energy! Soak in high-voltage auction drama, humorous team-building obstacle games, food, music, and lasting memories.",
    icon: PartyPopper,
    badge: "Pure Fest Energy",
    accentBorder: "group-hover:border-emerald-500/50",
    iconBg: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    gradient: "from-emerald-500/10 via-transparent to-transparent",
    benefits: ["Thrilling IPL live bidding", "High-energy outdoor games", "Campus celebration vibe"]
  }
];

const WhyParticipate = ({ onRegisterClick }) => {
  return (
    <section id="why-participate" className="py-24 relative overflow-hidden bg-slate-950">
      {/* Background accents */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-500/15 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Empower Your Journey
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4 font-heading">
            Why Participate in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">CIVISTA</span>?
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Four compelling reasons why thousands of students make CIVISTA their premier annual symposium destination.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`glass-card p-6 sm:p-7 rounded-3xl border border-slate-800/80 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${item.accentBorder} hover:-translate-y-1.5 hover:shadow-xl`}
              >
                {/* Subtle top gradient glow inside card */}
                <div className={`absolute inset-0 bg-gradient-to-b ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />

                <div>
                  {/* Top Icon & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${item.iconBg}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-2xl font-bold text-white mb-2 font-heading group-hover:text-indigo-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm font-semibold text-indigo-300 mb-3 leading-snug">
                    {item.tagline}
                  </p>

                  {/* Detailed Description */}
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Key takeaway bullets */}
                <div className="pt-4 border-t border-slate-800/80 space-y-2 mt-auto">
                  {item.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA banner below Why Participate */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-indigo-900/40 via-purple-900/40 to-slate-900 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h4 className="text-xl sm:text-2xl font-bold text-white font-heading mb-1">
              Ready to claim your spot at CIVISTA 2026?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Registrations are open for all 4 events. Limited slots available per college!
            </p>
          </div>
          <button
            onClick={onRegisterClick}
            className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/30 shrink-0 flex items-center gap-2"
          >
            <span>Register Now</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyParticipate;
