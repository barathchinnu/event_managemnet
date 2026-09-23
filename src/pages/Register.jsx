import React from 'react';
import { ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react';
import RegistrationForm from '../components/RegistrationForm';

const Register = ({ onBackToHome, preselectedEventId = '' }) => {
  return (
    <div className="min-h-screen pt-28 pb-20 relative bg-slate-950">
      {/* Ambient background glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back Button */}
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Fest Overview</span>
        </button>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-2xl bg-slate-900/90 p-2 border border-slate-800 shadow-xl shadow-indigo-500/10 flex items-center justify-center">
              <img src="/cea-logo.png" alt="CEA" className="w-full h-full object-contain" />
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-900 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-amber-500/30">
            <span>Civil Engineering Association (CEA)</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-3 font-heading">
            Register for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">CIVISTA 2026</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Join premier colleges across the state. Fill in your details below to obtain your verified delegate pass.
          </p>
        </div>

        {/* Registration Container */}
        <div className="glass-card p-6 sm:p-10 rounded-3xl border border-indigo-500/30 shadow-2xl">
          <RegistrationForm
            selectedEventId={preselectedEventId}
            isModal={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
