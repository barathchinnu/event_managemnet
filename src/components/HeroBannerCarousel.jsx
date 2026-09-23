import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Sparkles, 
  ZoomIn, 
  ZoomOut, 
  X, 
  Download,
  Building2,
  Users2
} from 'lucide-react';

const BANNER_SLIDES = [
  {
    id: 'department-banner',
    title: 'Department of Civil Engineering',
    subtitle: 'Kongu Engineering College (Autonomous) • Perundurai, Erode',
    badge: 'Campus Heritage & Legacy',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    image: '/images/civil-department-banner.png',
    icon: Building2,
    accentGlow: 'from-indigo-600/30 via-cyan-500/20 to-blue-600/30',
    caption: 'Iconic Civil Engineering entrance with visionary architectural blueprints'
  },
  {
    id: 'cea-team-stage',
    title: 'நம்ம CIVIL — The CEA Team',
    subtitle: 'Civil Engineering Association • Kalingarayan Seminar Hall Stage',
    badge: 'Student Leadership & Mentors',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    image: '/images/cea-team-stage.jpg',
    icon: Users2,
    accentGlow: 'from-emerald-600/30 via-teal-500/20 to-indigo-600/30',
    caption: 'Dedicated coordinators, volunteers, and faculty mentors behind CIVISTA 2026'
  }
];

const HeroBannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxTitle, setLightboxTitle] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length);
  }, []);

  // Auto slide every 5.5 seconds
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide]);

  const active = BANNER_SLIDES[currentSlide];
  const IconComp = active.icon;

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-8">
      {/* Outer Banner Card with Ambient Glow */}
      <div 
        className="relative group rounded-3xl overflow-hidden border-2 border-slate-800/90 hover:border-indigo-500/50 shadow-2xl bg-slate-950 transition-all duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Ambient background glow */}
        <div 
          className={`absolute -inset-2 bg-gradient-to-r ${active.accentGlow} rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none`}
        ></div>

        {/* Banner Media Frame (Responsive Banner Ratio) */}
        <div 
          className="relative h-56 sm:h-72 md:h-80 lg:h-96 w-full overflow-hidden cursor-pointer bg-slate-950"
          onClick={() => {
            setLightboxImage(active.image);
            setLightboxTitle(active.title);
            setZoomLevel(1);
          }}
        >
          {/* Active Banner Image with Smooth Transition */}
          <img 
            key={active.id}
            src={active.image} 
            alt={active.title} 
            className="w-full h-full object-cover object-center animate-in fade-in zoom-in-95 duration-700 transition-transform duration-700 group-hover:scale-[1.02]"
          />

          {/* Cinematic Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-slate-950/70 pointer-events-none"></div>

          {/* Top Floating Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
            <div className="flex items-center gap-2">
              {/* CEA 3D Logo Emblem Stamp */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-950/90 border border-slate-700/80 p-1 shadow-lg backdrop-blur-md flex items-center justify-center shrink-0">
                <img src="/cea-logo.png" alt="CEA" className="w-full h-full object-contain" />
              </div>
              <span className={`text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full border backdrop-blur-md shadow-md ${active.badgeColor} flex items-center gap-1.5`}>
                <IconComp className="w-3.5 h-3.5" />
                <span>{active.badge}</span>
              </span>
            </div>

            <div className="pointer-events-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxImage(active.image);
                  setLightboxTitle(active.title);
                  setZoomLevel(1);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 backdrop-blur-md shadow-lg transition-all active:scale-95 cursor-pointer"
                title="Inspect High-Res View"
              >
                <Maximize2 className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">Inspect</span>
              </button>
            </div>
          </div>

          {/* Bottom Caption Overlay */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 z-10 pointer-events-none">
            <div className="bg-slate-950/85 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-slate-800/90 max-w-xl shadow-xl">
              <h3 className="text-base sm:text-xl md:text-2xl font-black text-white font-heading tracking-tight">
                {active.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                {active.subtitle}
              </p>
              <p className="text-[11px] text-slate-400 mt-1 hidden sm:block">
                {active.caption}
              </p>
            </div>

            {/* Slide Navigation Dots and Buttons */}
            <div className="pointer-events-auto flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                className="p-2 sm:p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 shadow-lg active:scale-90 transition-transform cursor-pointer"
                aria-label="Previous Banner"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                className="p-2 sm:p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 shadow-lg active:scale-90 transition-transform cursor-pointer"
                aria-label="Next Banner"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Carousel Indicator Bar */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-900/90 border-t border-slate-800/90 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {BANNER_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  currentSlide === idx
                    ? 'bg-slate-800 text-white border border-indigo-500/50 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${currentSlide === idx ? 'bg-indigo-400 animate-pulse' : 'bg-slate-600'}`}></span>
                <span className="hidden sm:inline">{slide.badge}</span>
                <span className="sm:hidden">0{idx + 1}</span>
              </button>
            ))}
          </div>

          <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
            <span className="text-white font-bold">0{currentSlide + 1}</span>
            <span className="text-slate-600">/</span>
            <span>0{BANNER_SLIDES.length}</span>
            <span className="text-slate-600 ml-1">• Banner Flow</span>
          </div>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-8 animate-in fade-in duration-300"
          onClick={() => setLightboxImage(null)}
        >
          {/* Header Controls */}
          <div 
            className="absolute top-4 sm:top-6 left-4 right-4 sm:left-6 sm:right-6 flex items-center justify-between z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-xs sm:text-sm font-bold text-white px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700 backdrop-blur-md">
              {lightboxTitle}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5))}
                className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 active:scale-95 transition-all cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75))}
                className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 active:scale-95 transition-all cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold active:scale-95 transition-all cursor-pointer"
              >
                Reset
              </button>
              <a
                href={lightboxImage}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 active:scale-95 transition-all cursor-pointer"
                title="Open in new tab"
              >
                <Download className="w-4 h-4" />
              </a>
              <button
                onClick={() => setLightboxImage(null)}
                className="p-2.5 rounded-xl bg-red-600/80 hover:bg-red-600 text-white border border-red-500/50 active:scale-95 transition-all cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div 
            className="max-w-6xl max-h-[85vh] overflow-auto p-2 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={lightboxImage} 
              alt={lightboxTitle} 
              className="max-h-[80vh] w-auto object-contain rounded-2xl shadow-2xl transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroBannerCarousel;
