import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  X, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Phone, 
  ArrowRight, 
  Download, 
  Layers, 
  Users2, 
  FileText, 
  HelpCircle, 
  Gavel, 
  HeartHandshake 
} from 'lucide-react';

const SLIDES = [
  {
    id: 'poster',
    type: 'poster',
    badge: 'Official Symposium Poster',
    badgeClass: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    title: 'CIVISTA 2026 Symposium Poster',
    subtitle: 'Department of Civil Engineering • Civil Engineering Association (CEA)',
    description: 'The official poster for the Intra College Technical Symposium featuring all 4 flagship arenas: Paper Summit, Mock IPL Auction, Technical Quiz, and Build The Bond.',
    image: '/images/civista-symposium-poster.jpg',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    glowBorder: 'border-amber-500/40',
    details: [
      { label: 'Date', value: 'Wednesday, September 30, 2026', icon: Calendar },
      { label: 'Venue', value: 'Kalingarayan Seminar Hall, KEC', icon: MapPin },
      { label: 'Queries', value: '+91 93425 29462 / +91 6369 074 765', icon: Phone },
    ],
    tags: ['Paper Summit', 'Mock IPL Auction', 'Technical Quiz', 'Build The Bond']
  },
  {
    id: 'department',
    type: 'department',
    badge: 'Civil Engineering Campus Banner',
    badgeClass: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
    title: 'Department of Civil Engineering',
    subtitle: 'Kongu Engineering College (Autonomous) • Perundurai',
    description: 'Iconic campus view of the Civil Engineering Department with visionary architectural blueprints. The hub of academic excellence, structural innovation, and technical leadership.',
    image: '/images/civil-department-banner.png',
    glowColor: 'rgba(99, 102, 241, 0.25)',
    glowBorder: 'border-indigo-500/40',
    details: [
      { label: 'Institution', value: 'Kongu Engineering College (Autonomous)', icon: MapPin },
      { label: 'Organized by', value: 'Civil Engineering Association (CEA)', icon: Sparkles },
      { label: 'Symposium', value: 'CIVISTA 2026 Intra College Conclave', icon: Calendar },
    ],
    tags: ['Civil Engineering', 'Architectural Legacy', 'Innovation Hub', 'CEA KEC']
  },
  {
    id: 'team',
    type: 'team',
    badge: 'CEA Association & Student Coordinators',
    badgeClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    title: 'நம்ம CIVIL — The CEA Team',
    subtitle: 'Civil Engineering Association (CEA) • Kongu Engineering College',
    description: 'The energetic student coordinators, volunteers, and faculty mentors behind CIVISTA 2026 on stage at the Kalingarayan Hall. Dedicated to orchestrating an unforgettable competitive symposium experience.',
    image: '/images/cea-team-stage.jpg',
    glowColor: 'rgba(16, 185, 129, 0.25)',
    glowBorder: 'border-emerald-500/40',
    details: [
      { label: 'Stage', value: 'Kalingarayan Seminar Hall Auditorium', icon: MapPin },
      { label: 'Team Spirit', value: 'நம்ம CIVIL (Namma Civil)', icon: Users2 },
      { label: 'Coordinators', value: 'Maheshkumar S & Samruthaa S', icon: Phone },
    ],
    tags: ['Student Coordinators', 'Faculty Mentors', 'Event Volunteers', 'KEC Civil Legacy']
  },
  {
    id: 'showcase-dual',
    type: 'dual',
    badge: 'Symposium Overview Flow',
    badgeClass: 'bg-pink-500/15 text-pink-300 border-pink-500/30',
    title: 'Civista Arenas & Campus Legacy',
    subtitle: 'Two Pillars of CIVISTA: Department Legacy & Technical Symposium',
    description: 'Explore the symposium dynamics alongside our department heritage. Free registrations now open for accredited delegates.',
    image: '/images/civista-symposium-poster.jpg',
    secondaryImage: '/images/civil-department-banner.png',
    tertiaryImage: '/images/cea-team-stage.jpg',
    glowColor: 'rgba(236, 72, 153, 0.25)',
    glowBorder: 'border-pink-500/40',
    details: [
      { label: 'Competitions', value: '2 Technical + 2 Non-Technical', icon: Layers },
      { label: 'Recognition', value: 'Winner & Participation Certificates', icon: Sparkles },
      { label: 'Portal', value: 'ceakec.tech', icon: MapPin },
    ],
    tags: ['Live Auction', 'Paper Summit', 'Tech Quiz', 'Team Synergy']
  }
];

const CarouselFlow = ({ onOpenRegister, onExploreEvents }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxTitle, setLightboxTitle] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const slideDuration = 6000; // 6 seconds per slide
  const progressInterval = 50; // update every 50ms

  // Next & Previous Slide handlers
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  const openLightbox = (imgUrl, title) => {
    setLightboxImage(imgUrl);
    setLightboxTitle(title || 'CIVISTA Preview');
    setZoomLevel(1);
  };

  // Auto-play timer with progress
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + (progressInterval / slideDuration) * 100;
      });
    }, progressInterval);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxImage) {
        if (e.key === 'Escape') setLightboxImage(null);
        return;
      }
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage, prevSlide, nextSlide]);

  // Touch gesture handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const activeSlide = SLIDES[currentIndex];

  return (
    <section 
      id="showcase" 
      className="py-16 sm:py-24 relative overflow-hidden bg-slate-950 border-t border-b border-slate-900/80"
    >
      {/* Background Ambience & Lighting */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none transition-colors duration-1000 opacity-20"
        style={{ backgroundColor: activeSlide.glowColor }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3 border border-indigo-500/30 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Visual Flow</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">CIVISTA 2026</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-heading">
            Official <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-pink-400 to-indigo-400">Showcase & Gallery Flow</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Discover the official symposium poster, campus civil department legacy, and the vibrant CEA team in an interactive visual flow.
          </p>
        </div>

        {/* CAROUSEL CONTAINER */}
        <div 
          className="relative glass-card rounded-3xl border border-slate-800/80 shadow-2xl overflow-hidden transition-all duration-500"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Timer Progress Bar */}
          <div className="h-1 w-full bg-slate-900/90 relative overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 via-indigo-500 to-purple-500 transition-all ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Carousel Top Bar (Slide Counter + Controls) */}
          <div className="flex items-center justify-between px-4 sm:px-8 py-3.5 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md">
            {/* Left: Active Badge */}
            <div className="flex items-center gap-3">
              <span className={`text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full border ${activeSlide.badgeClass}`}>
                {activeSlide.badge}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <span>0{currentIndex + 1}</span>
                <span className="text-slate-600">/</span>
                <span>0{SLIDES.length}</span>
              </span>
            </div>

            {/* Right: Flow Controls (Play/Pause, Lightbox, Nav Arrows) */}
            <div className="flex items-center gap-2">
              {/* Play/Pause Toggle */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-all text-xs flex items-center gap-1.5 cursor-pointer"
                title={isPlaying ? "Pause Flow" : "Play Flow"}
                aria-label={isPlaying ? "Pause Flow" : "Play Flow"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                <span className="hidden md:inline font-medium text-[11px]">
                  {isPlaying ? 'Auto-Flow On' : 'Paused'}
                </span>
              </button>

              {/* Fullscreen Zoom Button */}
              <button
                onClick={() => openLightbox(activeSlide.image, activeSlide.title)}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-indigo-600 text-slate-300 hover:text-white border border-slate-700/60 transition-all flex items-center gap-1.5 cursor-pointer"
                title="View Fullscreen / Zoom"
                aria-label="View Fullscreen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden md:inline font-medium text-[11px]">Inspect</span>
              </button>

              {/* Previous & Next Mini Buttons */}
              <div className="flex items-center gap-1 ml-2">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 active:scale-90 transition-transform cursor-pointer"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 active:scale-90 transition-transform cursor-pointer"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* MAIN SLIDE CONTENT AREA */}
          <div className="p-4 sm:p-8 lg:p-10">
            {/* SLIDE 1: OFFICIAL POSTER */}
            {activeSlide.type === 'poster' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-500">
                {/* Poster Display Column with Ambient Cinema Frame */}
                <div className="lg:col-span-6 flex justify-center">
                  <div 
                    onClick={() => openLightbox(activeSlide.image, activeSlide.title)}
                    className="relative group cursor-pointer max-w-sm sm:max-w-md w-full"
                  >
                    {/* Glowing ambient backlight */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/30 via-indigo-500/30 to-purple-500/30 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition duration-500"></div>

                    {/* Image Container */}
                    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-700/80 group-hover:border-amber-400/80 shadow-2xl bg-slate-900 transition-all duration-300 group-hover:scale-[1.01]">
                      <img 
                        src={activeSlide.image} 
                        alt="CIVISTA 2026 Official Poster" 
                        className="w-full h-auto max-h-[500px] object-contain mx-auto transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Hover Overlay Hint */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-amber-400/50 text-amber-300 text-xs font-semibold backdrop-blur-md">
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>Click to Inspect High-Res Poster</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Poster Information & Highlights Column */}
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-heading leading-tight">
                      {activeSlide.title}
                    </h3>
                    <p className="text-sm sm:text-base font-semibold text-amber-400 mt-1">
                      {activeSlide.subtitle}
                    </p>
                    <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                      {activeSlide.description}
                    </p>
                  </div>

                  {/* 4 Featured Events Badges on Poster */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Featured In Poster:
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {activeSlide.tags.map((tag, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-200 hover:border-amber-500/40 transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                          <span>{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Event Metadata Pills */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
                    {activeSlide.details.map((detail, idx) => {
                      const IconComponent = detail.icon;
                      return (
                        <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                          <div className="p-1.5 rounded-lg bg-indigo-500/15 text-indigo-400 shrink-0">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <span className="font-semibold text-slate-400">{detail.label}:</span>
                          <span className="text-white font-medium">{detail.value}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-4">
                    <button
                      onClick={() => onOpenRegister?.('')}
                      className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Register for CIVISTA</span>
                    </button>

                    <button
                      onClick={() => openLightbox(activeSlide.image, activeSlide.title)}
                      className="px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <ZoomIn className="w-4 h-4 text-indigo-400" />
                      <span>Zoom Poster</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 2: CIVIL ENGINEERING DEPARTMENT BANNER */}
            {activeSlide.type === 'department' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                {/* Panoramic Banner Display */}
                <div 
                  onClick={() => openLightbox(activeSlide.image, activeSlide.title)}
                  className="relative group cursor-pointer w-full"
                >
                  {/* Glowing backlight */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600/30 via-cyan-500/30 to-blue-600/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-500"></div>

                  <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-700/80 group-hover:border-indigo-400/80 shadow-2xl bg-slate-950 transition-all duration-300">
                    <img 
                      src={activeSlide.image} 
                      alt="Civil Engineering Department Building Banner" 
                      className="w-full h-auto max-h-[380px] sm:max-h-[440px] object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                    />

                    {/* Gradient Overlay for Cinematic Feel */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none"></div>

                    {/* Floating Corner Overlay */}
                    <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 pointer-events-none">
                      <div className="bg-slate-950/85 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-slate-800/80 max-w-xl">
                        <div className="text-xs uppercase tracking-widest text-indigo-300 font-semibold mb-1 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                          Kongu Engineering College
                        </div>
                        <h4 className="text-lg sm:text-2xl font-black text-white font-heading">
                          Department of Civil Engineering
                        </h4>
                      </div>

                      <div className="pointer-events-auto">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-indigo-400/40 text-xs font-semibold text-indigo-200 backdrop-blur-md shadow-lg">
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>Click for Full Panoramic View</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Department Details and Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                      Legacy & Host
                    </div>
                    <div className="text-sm sm:text-base font-bold text-white mb-1">
                      Civil Engineering Association (CEA)
                    </div>
                    <p className="text-xs text-slate-400">
                      Organizing technical symposiums and skill conclaves for decades with industry benchmarks.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                      Venue Hall
                    </div>
                    <div className="text-sm sm:text-base font-bold text-white mb-1">
                      Kalingarayan Seminar Hall
                    </div>
                    <p className="text-xs text-slate-400">
                      State-of-the-art auditorium equipped with acoustics, high-res presentation screens, and seating.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                        Explore Competitions
                      </div>
                      <div className="text-sm sm:text-base font-bold text-white mb-1">
                        4 Curated Arenas
                      </div>
                    </div>
                    <button
                      onClick={onExploreEvents}
                      className="mt-2 w-full py-2 px-3 rounded-xl bg-indigo-600/30 hover:bg-indigo-600 border border-indigo-500/40 text-xs font-bold text-indigo-200 hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>View All Events</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 3: CEA TEAM ON STAGE (நம்ம CIVIL) */}
            {activeSlide.type === 'team' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-500">
                {/* Photo Display Column with Ambient Glow */}
                <div className="lg:col-span-7">
                  <div 
                    onClick={() => openLightbox(activeSlide.image, activeSlide.title)}
                    className="relative group cursor-pointer w-full"
                  >
                    {/* Glowing backlight */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-indigo-500/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-500"></div>

                    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-700/80 group-hover:border-emerald-400/80 shadow-2xl bg-slate-950 transition-all duration-300">
                      <img 
                        src={activeSlide.image} 
                        alt="Civil Engineering Association Team on Stage" 
                        className="w-full h-auto max-h-[420px] object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                      />

                      {/* Gradient Bottom Hint */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>

                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                        <span className="px-3 py-1.5 rounded-xl bg-slate-900/90 text-emerald-300 text-xs font-bold border border-emerald-500/40 backdrop-blur-md">
                          நம்ம CIVIL • KEC Kalingarayan Hall
                        </span>
                        <span className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs font-semibold text-slate-200 backdrop-blur-md shadow-lg">
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Inspect Photo</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team Info & Highlights Column */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-heading leading-tight">
                      {activeSlide.title}
                    </h3>
                    <p className="text-sm sm:text-base font-semibold text-emerald-400 mt-1">
                      {activeSlide.subtitle}
                    </p>
                    <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                      {activeSlide.description}
                    </p>
                  </div>

                  {/* Team Tags */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Key Highlights:
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {activeSlide.tags.map((tag, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-200 hover:border-emerald-500/40 transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          <span>{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metadata Pills */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
                    {activeSlide.details.map((detail, idx) => {
                      const IconComponent = detail.icon;
                      return (
                        <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                          <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 shrink-0">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <span className="font-semibold text-slate-400">{detail.label}:</span>
                          <span className="text-white font-medium">{detail.value}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => onOpenRegister?.('')}
                      className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Join as Delegate</span>
                    </button>

                    <button
                      onClick={() => openLightbox(activeSlide.image, activeSlide.title)}
                      className="px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <ZoomIn className="w-4 h-4 text-emerald-400" />
                      <span>Zoom Stage Photo</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 4: DUAL / COMPOSITE OVERVIEW */}
            {activeSlide.type === 'dual' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-500">
                {/* Left: 3-Card Interactive Preview Strip */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Department Card */}
                    <div 
                      onClick={() => openLightbox('/images/civil-department-banner.png', 'Civil Engineering Department')}
                      className="group cursor-pointer rounded-2xl overflow-hidden border border-slate-800 hover:border-indigo-500/60 bg-slate-900 transition-all hover:scale-[1.02] shadow-xl p-2"
                    >
                      <div className="h-32 sm:h-36 overflow-hidden rounded-xl relative">
                        <img 
                          src="/images/civil-department-banner.png" 
                          alt="Civil Department" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/10 transition-colors flex items-center justify-center">
                          <span className="p-1.5 rounded-full bg-slate-900/80 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                      <div className="p-2">
                        <div className="text-[10px] font-semibold text-indigo-400 uppercase">Campus Legacy</div>
                        <div className="text-xs font-bold text-white truncate">Department</div>
                      </div>
                    </div>

                    {/* Poster Card */}
                    <div 
                      onClick={() => openLightbox('/images/civista-symposium-poster.jpg', 'CIVISTA Symposium Poster')}
                      className="group cursor-pointer rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/60 bg-slate-900 transition-all hover:scale-[1.02] shadow-xl p-2"
                    >
                      <div className="h-32 sm:h-36 overflow-hidden rounded-xl relative">
                        <img 
                          src="/images/civista-symposium-poster.jpg" 
                          alt="CIVISTA Poster" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/10 transition-colors flex items-center justify-center">
                          <span className="p-1.5 rounded-full bg-slate-900/80 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                      <div className="p-2">
                        <div className="text-[10px] font-semibold text-amber-400 uppercase">Schedule</div>
                        <div className="text-xs font-bold text-white truncate">Official Poster</div>
                      </div>
                    </div>

                    {/* Team Card */}
                    <div 
                      onClick={() => openLightbox('/images/cea-team-stage.jpg', 'CEA Student Association Team')}
                      className="group cursor-pointer rounded-2xl overflow-hidden border border-slate-800 hover:border-emerald-500/60 bg-slate-900 transition-all hover:scale-[1.02] shadow-xl p-2"
                    >
                      <div className="h-32 sm:h-36 overflow-hidden rounded-xl relative">
                        <img 
                          src="/images/cea-team-stage.jpg" 
                          alt="CEA Team on Stage" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/10 transition-colors flex items-center justify-center">
                          <span className="p-1.5 rounded-full bg-slate-900/80 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                      <div className="p-2">
                        <div className="text-[10px] font-semibold text-emerald-400 uppercase">Organizers</div>
                        <div className="text-xs font-bold text-white truncate">நம்ம CIVIL Team</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Quick Action Hub */}
                <div className="lg:col-span-5 space-y-5">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-heading">
                      Ready to Compete in CIVISTA 2026?
                    </h3>
                    <p className="text-sm text-slate-300 mt-2">
                      Four high-octane competitions designed to test technical presentation, algorithmic reasoning, auction economics, and physical collaboration.
                    </p>
                  </div>

                  {/* 4 Mini Event Badges */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-indigo-500/30 flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-indigo-400 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white">Paper Summit</div>
                        <div className="text-[10px] text-slate-400">Technical</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white">Technical Quiz</div>
                        <div className="text-[10px] text-slate-400">Technical</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/30 flex items-center gap-2.5">
                      <Gavel className="w-4 h-4 text-amber-400 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white">Mock IPL Auction</div>
                        <div className="text-[10px] text-slate-400">Non-Technical</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex items-center gap-2.5">
                      <HeartHandshake className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white">Build The Bond</div>
                        <div className="text-[10px] text-slate-400">Non-Technical</div>
                      </div>
                    </div>
                  </div>

                  {/* Call to Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => onOpenRegister?.('')}
                      className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-lg shadow-indigo-600/30 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-indigo-200" />
                      <span>Register Now (Free)</span>
                    </button>

                    <button
                      onClick={onExploreEvents}
                      className="px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Explore Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CAROUSEL BOTTOM THUMBNAIL / SLIDE SELECTOR BAR */}
          <div className="px-4 sm:px-8 py-4 border-t border-slate-800/80 bg-slate-900/70 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Thumbnail Pills */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
              {SLIDES.map((slide, index) => {
                const isActive = currentIndex === index;
                return (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(index)}
                    className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-slate-800 border-indigo-400/80 text-white shadow-md shadow-indigo-500/10'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-md overflow-hidden bg-slate-800 shrink-0 border border-slate-700">
                      <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                    </div>
                    <span>{slide.badge}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {SLIDES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === index
                      ? 'w-8 bg-gradient-to-r from-amber-400 to-indigo-500'
                      : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX / ZOOM MODAL */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-8 animate-in fade-in duration-300"
          onClick={() => setLightboxImage(null)}
        >
          {/* Top Bar with Controls */}
          <div 
            className="absolute top-4 sm:top-6 left-4 right-4 sm:left-6 sm:right-6 flex items-center justify-between z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-bold text-white px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700 backdrop-blur-md">
                {lightboxTitle || 'CIVISTA High-Resolution Preview'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Zoom In */}
              <button
                onClick={() => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5))}
                className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 active:scale-95 transition-all cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              {/* Zoom Out */}
              <button
                onClick={() => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75))}
                className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 active:scale-95 transition-all cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              {/* Reset Zoom */}
              <button
                onClick={() => setZoomLevel(1)}
                className="px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold active:scale-95 transition-all cursor-pointer"
              >
                Reset ({Math.round(zoomLevel * 100)}%)
              </button>

              {/* Open in new tab */}
              <a
                href={lightboxImage}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 active:scale-95 transition-all cursor-pointer"
                title="Open original image in new tab"
              >
                <Download className="w-4 h-4" />
              </a>

              {/* Close Button */}
              <button
                onClick={() => setLightboxImage(null)}
                className="p-2.5 rounded-xl bg-red-600/80 hover:bg-red-600 text-white border border-red-500/50 active:scale-95 transition-all cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Lightbox Image Container */}
          <div 
            className="max-w-5xl max-h-[85vh] overflow-auto p-2 flex items-center justify-center"
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
    </section>
  );
};

export default CarouselFlow;
