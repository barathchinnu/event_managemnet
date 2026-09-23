import React, { useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Trophy, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Coins, 
  Phone, 
  Mail, 
  Presentation, 
  HelpCircle, 
  Gavel, 
  HeartHandshake 
} from 'lucide-react';

const EventDetails = ({ event, isOpen, onClose, onRegister }) => {
  // ESC key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  const isIpl = event.isIplSpecial;

  const getEventIcon = () => {
    switch (event.id) {
      case 'presentation':
        return <Presentation className="w-7 h-7 text-indigo-400" />;
      case 'technical-quiz':
        return <HelpCircle className="w-7 h-7 text-cyan-400" />;
      case 'ipl-auction':
        return <Gavel className="w-7 h-7 text-amber-400" />;
      case 'build-the-bond':
        return <HeartHandshake className="w-7 h-7 text-emerald-400" />;
      default:
        return <Sparkles className="w-7 h-7 text-indigo-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Blurred Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div 
        className={`relative w-full max-w-2xl bg-slate-900 border rounded-3xl shadow-2xl overflow-hidden z-10 my-8 transition-all animate-in fade-in zoom-in-95 duration-200 ${
          isIpl 
            ? 'border-amber-500/40 shadow-amber-500/10' 
            : 'border-slate-800 shadow-indigo-500/10'
        }`}
      >
        {/* Accent Banner */}
        <div 
          className={`h-2 w-full ${
            isIpl 
              ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-600' 
              : event.type === 'technical'
              ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400'
              : 'bg-gradient-to-r from-emerald-400 to-teal-500'
          }`}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
          {/* Header Info */}
          <div className="flex items-start gap-4 mb-6">
            <div 
              className={`p-3.5 rounded-2xl shrink-0 ${
                isIpl 
                  ? 'bg-amber-500/20 border border-amber-500/40 text-amber-400' 
                  : event.type === 'technical'
                  ? 'bg-indigo-500/20 border border-indigo-500/30 text-indigo-400'
                  : 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400'
              }`}
            >
              {getEventIcon()}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span 
                  className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    event.type === 'technical'
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : isIpl
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}
                >
                  {event.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  {event.badge}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                {event.title}
              </h2>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Event Overview
            </h4>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {event.fullDescription || event.shortDescription}
            </p>
          </div>

          {/* Special IPL Auction Box if applicable */}
          {isIpl && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm mb-1">
                <Coins className="w-4 h-4 text-amber-400" />
                <span>Auction Mechanics & Budget System</span>
              </div>
              <p className="text-xs text-amber-200/90 leading-relaxed">
                {event.budgetSystem}. Teams compete against live clocks and rival franchises to construct a balanced XI while complying with domestic, overseas, and uncapped quotas.
              </p>
            </div>
          )}

          {/* Key Logistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
              <div>
                <span className="text-xs text-slate-400 block">Date</span>
                <span className="text-slate-200 font-medium">{event.date}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="w-4 h-4 text-purple-400 shrink-0" />
              <div>
                <span className="text-xs text-slate-400 block">Timing</span>
                <span className="text-slate-200 font-medium">{event.time}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-pink-400 shrink-0" />
              <div>
                <span className="text-xs text-slate-400 block">Venue</span>
                <span className="text-slate-200 font-medium">{event.venue}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Users className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-xs text-slate-400 block">Participation</span>
                <span className="text-slate-200 font-medium">{event.teamSize}</span>
              </div>
            </div>
          </div>

          {/* Rules & Guidelines */}
          <div className="mb-6">
            <h4 className="text-sm uppercase tracking-wider text-slate-200 font-bold mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              Rules & Guidelines
            </h4>
            <ul className="space-y-2.5">
              {event.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0"></span>
                  <span className="leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Prize and Coordinator */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase mb-1">
                <Trophy className="w-4 h-4" />
                Prizes & Recognition
              </div>
              <p className="text-sm font-semibold text-white">
                {event.prize}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Event Coordinator
              </span>
              <p className="text-sm font-medium text-slate-200">
                {event.coordinator.name}
              </p>
              <div className="flex items-center gap-3 text-xs text-indigo-300 mt-1">
                <span>{event.coordinator.phone}</span>
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onRegister(event.id);
              }}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg transition-all flex items-center gap-2 active:scale-95 ${
                isIpl
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-black hover:from-amber-400 hover:to-yellow-500'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500'
              }`}
            >
              <span>Register for {event.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
