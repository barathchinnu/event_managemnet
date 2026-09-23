import React from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Sparkles, 
  ArrowRight, 
  Presentation, 
  HelpCircle, 
  Gavel, 
  HeartHandshake, 
  Trophy, 
  CheckCircle,
  Coins
} from 'lucide-react';

const EventCard = ({ event, onViewDetails, onRegister }) => {
  const isIpl = event.isIplSpecial;

  // Select appropriate icon
  const getEventIcon = () => {
    switch (event.id) {
      case 'presentation':
        return <Presentation className="w-6 h-6 text-indigo-400" />;
      case 'technical-quiz':
        return <HelpCircle className="w-6 h-6 text-cyan-400" />;
      case 'ipl-auction':
        return <Gavel className="w-6 h-6 text-amber-400" />;
      case 'build-the-bond':
        return <HeartHandshake className="w-6 h-6 text-emerald-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-indigo-400" />;
    }
  };

  return (
    <div
      className={`relative rounded-3xl transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
        isIpl
          ? 'glass-card border border-amber-500/40 bg-gradient-to-b from-amber-950/30 via-slate-900/90 to-slate-950 hover:border-amber-400/70 hover:shadow-2xl hover:shadow-amber-500/20'
          : 'glass-card border border-slate-800/80 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/15'
      }`}
    >
      {/* Decorative accent bar on top */}
      <div
        className={`h-1.5 w-full ${
          isIpl
            ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-600'
            : event.type === 'technical'
            ? 'bg-gradient-to-r from-indigo-500 to-cyan-400'
            : 'bg-gradient-to-r from-emerald-500 to-teal-400'
        }`}
      />

      <div className="p-6 sm:p-7 flex-1 flex flex-col">
        {/* Top Badges & Category */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
              event.type === 'technical'
                ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30'
                : isIpl
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-500/20'
                : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
            }`}
          >
            {event.category}
          </span>

          <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="truncate max-w-[120px]">{event.badge}</span>
          </span>
        </div>

        {/* Header with Icon and Title */}
        <div className="flex items-start gap-4 mb-3">
          <div
            className={`p-3 rounded-2xl shrink-0 transition-transform duration-300 group-hover:scale-110 ${
              isIpl
                ? 'bg-amber-500/20 border border-amber-500/40 text-amber-400 shadow-md shadow-amber-500/20'
                : event.type === 'technical'
                ? 'bg-indigo-500/15 border border-indigo-500/30 text-indigo-400'
                : 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
            }`}
          >
            {getEventIcon()}
          </div>
          <div>
            <h3
              className={`text-2xl font-bold tracking-tight group-hover:text-indigo-300 transition-colors font-heading ${
                isIpl ? 'text-amber-100 group-hover:text-amber-300' : 'text-white'
              }`}
            >
              {event.title}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {event.supportsIndividual && event.supportsTeam
                ? 'Individual or Team'
                : `Team (${event.teamSize})`}
            </p>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          {event.shortDescription}
        </p>

        {/* Special IPL Feature Banner if IPL */}
        {isIpl && (
          <div className="mb-5 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xs font-semibold text-amber-200">
                Virtual Purse: ₹100 Crores
              </span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 uppercase">
              Live Bidding
            </span>
          </div>
        )}

        {/* Event Key Highlights / Metadata */}
        <div className="space-y-2.5 pt-2 border-t border-slate-800/80 mt-auto text-xs text-slate-300">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Users className="w-4 h-4 text-slate-400 shrink-0" />
            <span>{event.teamSize}</span>
          </div>
        </div>
      </div>

      {/* Action Footer Buttons */}
      <div className="p-6 pt-0 flex items-center gap-3">
        <button
          onClick={() => onViewDetails(event)}
          className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-500 transition-all text-center"
        >
          View Details
        </button>

        <button
          onClick={() => onRegister(event.id)}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-white transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5 ${
            isIpl
              ? 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-extrabold shadow-amber-500/20'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-indigo-600/25'
          }`}
        >
          <span>Register Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default EventCard;
