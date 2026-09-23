import React, { useState } from 'react';
import { 
  Sparkles, 
  Filter, 
  Cpu, 
  Flame, 
  Presentation, 
  HelpCircle, 
  Gavel, 
  HeartHandshake,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';
import Hero from '../components/Hero';
import PosterShowcase from '../components/PosterShowcase';
import EventCard from '../components/EventCard';
import EventDetails from '../components/EventDetails';
import RegistrationForm from '../components/RegistrationForm';
import About from '../components/About';
import WhyParticipate from '../components/WhyParticipate';
import Contact from '../components/Contact';
import { EVENTS_DATA } from '../data/events';

const Home = ({ onOpenRegisterModal, selectedEventForModal }) => {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'technical', 'non-technical'
  const [selectedEventForDetails, setSelectedEventForDetails] = useState(null);

  const technicalEvents = EVENTS_DATA.filter((e) => e.type === 'technical');
  const nonTechnicalEvents = EVENTS_DATA.filter((e) => e.type === 'non-technical');

  const filteredEvents = 
    activeFilter === 'all'
      ? EVENTS_DATA
      : EVENTS_DATA.filter((e) => e.type === activeFilter);

  const scrollToEvents = () => {
    const el = document.getElementById('events');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToShowcase = () => {
    const el = document.getElementById('poster') || document.getElementById('showcase');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToRegister = (eventId) => {
    onOpenRegisterModal(eventId);
  };

  return (
    <div className="relative">
      {/* 1. HERO SECTION (Includes Banner Ratio Carousel: Dept Banner + CEA Team Stage) */}
      <Hero
        onExploreEvents={scrollToEvents}
        onOpenRegister={() => onOpenRegisterModal('')}
        onViewShowcase={scrollToShowcase}
      />

      {/* 2. OFFICIAL POSTER SHOWCASE (Dedicated Portrait Ratio with Zoom Lightbox & Arenas) */}
      <PosterShowcase
        onOpenRegister={onOpenRegisterModal}
        onExploreEvents={scrollToEvents}
      />

      {/* 2. EVENTS SECTION */}
      <section id="events" className="py-24 relative overflow-hidden bg-slate-950">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-500/15 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              CIVISTA Arenas
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4 font-heading">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Events</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-300">
              Pick your arena, assemble your crew, and compete against the brightest minds for prizes, trophies, and glory.
            </p>
          </div>

          {/* Filter Navigation Tabs */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-14 flex-wrap">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeFilter === 'all'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>All Events (4)</span>
            </button>

            <button
              onClick={() => setActiveFilter('technical')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeFilter === 'technical'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800'
              }`}
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Technical Events (2)</span>
            </button>

            <button
              onClick={() => setActiveFilter('non-technical')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeFilter === 'non-technical'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/30 ring-1 ring-amber-300'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Non-Technical Events (2)</span>
            </button>
          </div>

          {/* DISPLAY MODE 1: ALL EVENTS (Divided into Technical & Non-Technical) */}
          {activeFilter === 'all' ? (
            <div className="space-y-16">
              {/* Technical Events Subsection */}
              <div>
                <div className="flex items-center gap-3 mb-6 pb-3 border-b border-indigo-500/20">
                  <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white font-heading tracking-wide">
                      TECHNICAL EVENTS
                    </h3>
                    <p className="text-xs text-slate-400">
                      Showcase research, engineering depth, and problem-solving agility
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {technicalEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onViewDetails={(ev) => setSelectedEventForDetails(ev)}
                      onRegister={(evId) => scrollToRegister(evId)}
                    />
                  ))}
                </div>
              </div>

              {/* Non-Technical Events Subsection */}
              <div>
                <div className="flex items-center gap-3 mb-6 pb-3 border-b border-amber-500/20">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white font-heading tracking-wide">
                      NON-TECHNICAL EVENTS
                    </h3>
                    <p className="text-xs text-slate-400">
                      High-stakes cricket auction strategy and high-energy trust team challenges
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {nonTechnicalEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onViewDetails={(ev) => setSelectedEventForDetails(ev)}
                      onRegister={(evId) => scrollToRegister(evId)}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* DISPLAY MODE 2: FILTERED EVENTS */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-300">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onViewDetails={(ev) => setSelectedEventForDetails(ev)}
                  onRegister={(evId) => scrollToRegister(evId)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <About />

      {/* 4. WHY PARTICIPATE SECTION */}
      <WhyParticipate onRegisterClick={() => onOpenRegisterModal('')} />

      {/* 5. INLINE REGISTRATION SECTION */}
      <section id="register" className="py-24 relative overflow-hidden bg-slate-950/90 border-t border-slate-900">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-500/15 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Seamless Registration
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4 font-heading">
              Register for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">CIVISTA 2026</span>
            </h2>
            <p className="text-base text-slate-300">
              Complete your entry below to receive your official digital pass. Free registration for all accredited college delegates.
            </p>
          </div>

          <div className="glass-card p-6 sm:p-10 rounded-3xl border border-indigo-500/25 shadow-2xl">
            <RegistrationForm
              selectedEventId={selectedEventForModal || ''}
              isModal={false}
            />
          </div>
        </div>
      </section>

      {/* 6. CONTACT SECTION */}
      <Contact />

      {/* MODAL: Event Details Popup */}
      <EventDetails
        event={selectedEventForDetails}
        isOpen={Boolean(selectedEventForDetails)}
        onClose={() => setSelectedEventForDetails(null)}
        onRegister={(eventId) => {
          setSelectedEventForDetails(null);
          scrollToRegister(eventId);
        }}
      />
    </div>
  );
};

export default Home;
