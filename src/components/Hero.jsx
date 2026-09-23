import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Calendar, MapPin, Trophy, Users, ShieldCheck, Flame, PlayCircle, FileText } from 'lucide-react';
import { FEST_DETAILS } from '../data/events';
import HeroBannerCarousel from './HeroBannerCarousel';

const Hero = ({ onExploreEvents, onOpenRegister, onViewShowcase }) => {
  // Countdown Timer calculation to fest date
  const [timeLeft, setTimeLeft] = useState({
    days: 32,
    hours: 14,
    minutes: 45,
    seconds: 20
  });

  useEffect(() => {
    // Fixed target date — September 30, 2026
    const targetDate = new Date('2026-09-30T09:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-20 flex items-center justify-center overflow-hidden bg-radial-glow">
      {/* Background Ambience & Gradient Orbs */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>
      
      {/* Glowing atmospheric circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow"></div>
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-20 right-10 w-[380px] h-[380px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Top Banner Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-medium shadow-lg shadow-indigo-500/10 mb-6 animate-float">
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-ping"></span>
            <Flame className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-white">Annual National Inter-College Symposium</span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-indigo-300 hidden sm:inline">September 30, 2026</span>
          </div>

          {/* TWO BANNER RATIO IMAGES AS CAROUSEL IN THIS PLACE */}
          <HeroBannerCarousel />

          {/* Main Title CIVISTA */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight mb-4 font-heading">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-indigo-200">
              CIVIS
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">
              TA
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-200 to-slate-200 mb-6 font-heading">
            Where Ideas Meet Innovation, Competition Meets Fun
          </p>

          {/* Short Description */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Join CIVISTA, a vibrant college event bringing together technical knowledge, creativity, strategy and teamwork.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={onExploreEvents}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl font-bold text-base text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-500/50 shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group active:scale-95 cursor-pointer"
            >
              <span>Explore Events</span>
              <ArrowRight className="w-5 h-5 text-indigo-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onOpenRegister()}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all duration-300 flex items-center justify-center gap-3 group active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-indigo-200" />
              <span>Register Now</span>
            </button>

            <button
              onClick={onViewShowcase}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl font-bold text-base text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-400/60 shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group active:scale-95 cursor-pointer"
            >
              <FileText className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Official Poster Flow</span>
            </button>
          </div>

          {/* Event Quick Info Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto mb-12">
            <div className="glass-card px-4 py-3 rounded-2xl flex items-center justify-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
              <span className="text-slate-200 font-medium">Wednesday, Sep 30, 2026</span>
            </div>
            <div className="glass-card px-4 py-3 rounded-2xl flex items-center justify-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
              <span className="text-slate-200 font-medium">Kalingarayan Seminar Hall</span>
            </div>
            <div className="glass-card px-4 py-3 rounded-2xl flex items-center justify-center gap-3 text-sm">
              <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-slate-200 font-medium">Winner & Participation Certificates</span>
            </div>
          </div>

          {/* Countdown Clock Bar */}
          <div className="max-w-2xl mx-auto glass-card p-5 sm:p-6 rounded-3xl border border-indigo-500/20 shadow-2xl">
            <div className="text-xs uppercase tracking-widest text-indigo-300 font-semibold mb-3 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Fest Countdown to Grand Inauguration
            </div>
            <div className="grid grid-cols-4 gap-3 sm:gap-4 text-center">
              <div className="bg-slate-900/80 rounded-2xl p-3 border border-slate-800">
                <span className="block text-2xl sm:text-4xl font-extrabold text-white font-mono">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[11px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider">Days</span>
              </div>
              <div className="bg-slate-900/80 rounded-2xl p-3 border border-slate-800">
                <span className="block text-2xl sm:text-4xl font-extrabold text-indigo-400 font-mono">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[11px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider">Hours</span>
              </div>
              <div className="bg-slate-900/80 rounded-2xl p-3 border border-slate-800">
                <span className="block text-2xl sm:text-4xl font-extrabold text-purple-400 font-mono">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[11px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider">Mins</span>
              </div>
              <div className="bg-slate-900/80 rounded-2xl p-3 border border-slate-800">
                <span className="block text-2xl sm:text-4xl font-extrabold text-pink-400 font-mono">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[11px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider">Secs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
