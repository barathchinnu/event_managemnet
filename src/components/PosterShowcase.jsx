import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Calendar, 
  MapPin, 
  Phone, 
  ArrowRight, 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  X, 
  Download, 
  FileText, 
  HelpCircle, 
  Gavel, 
  HeartHandshake, 
  QrCode, 
  ExternalLink 
} from 'lucide-react';

const PosterShowcase = ({ onOpenRegister, onExploreEvents }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section 
      id="poster" 
      className="py-20 sm:py-24 relative overflow-hidden bg-slate-950 border-t border-b border-slate-900 scroll-mt-20"
    >
      <div id="showcase" className="absolute top-0"></div>
      {/* Ambient background lighting matching poster denim/gold */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-indigo-600/15 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/15 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-amber-500/30 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Official Event Announcement</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">September 30</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-heading">
            Official <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-pink-400 to-indigo-400">Symposium Poster</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Preserving the authentic full-length portrait format. Inspect the complete schedule, event arenas, coordinators, and QR registration code.
          </p>
        </div>

        {/* POSTER CINEMA SHOWCASE CARD */}
        <div className="glass-card rounded-3xl border border-slate-800/90 shadow-2xl p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: True Portrait Aspect Ratio Poster */}
            <div className="lg:col-span-5 flex justify-center">
              <div 
                onClick={() => {
                  setLightboxOpen(true);
                  setZoomLevel(1);
                }}
                className="relative group cursor-pointer w-full max-w-md"
              >
                {/* Ambient backlighting glow */}
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/30 via-indigo-600/30 to-purple-600/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-500"></div>

                {/* Poster Frame */}
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-700/80 group-hover:border-amber-400 shadow-2xl bg-slate-900 transition-all duration-300 group-hover:scale-[1.01]">
                  <img 
                    src="/images/civista-symposium-poster.jpg" 
                    alt="CIVISTA 2026 Official Symposium Poster" 
                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Hover Overlay Hint */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-5">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/95 border border-amber-400 text-amber-300 text-xs font-bold backdrop-blur-md shadow-xl">
                      <Maximize2 className="w-4 h-4" />
                      <span>Click to Zoom & Inspect Poster</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Breakdown & Interactive Arenas */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    Intra College Technical Symposium
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Kongu Engineering College
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-white font-heading tracking-tight">
                  CIVISTA 2026
                </h3>
                <p className="text-sm font-semibold text-indigo-300 mt-1">
                  Department of Civil Engineering • Civil Engineering Association (CEA)
                </p>
                <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                  Join fellow innovators, strategists, and problem-solvers for a full day of premier technical competitions and exciting team dynamics.
                </p>
              </div>

              {/* 4 Featured Arenas from the Poster */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Four Flagship Arenas (September 30):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 transition-colors flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Paper Summit</div>
                      <div className="text-[11px] text-slate-400">Technical • 10:00 AM</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-colors flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center shrink-0">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Technical Quiz</div>
                      <div className="text-[11px] text-slate-400">Technical • 01:30 PM</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-colors flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
                      <Gavel className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Mock IPL Auction</div>
                      <div className="text-[11px] text-slate-400">Non-Technical • 10:30 AM</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-colors flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                      <HeartHandshake className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Build The Bond</div>
                      <div className="text-[11px] text-slate-400">Non-Technical • 02:30 PM</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Logistics & Contacts from Poster */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5 text-xs sm:text-sm">
                <div className="flex items-center gap-3 text-slate-300">
                  <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-semibold text-slate-400">Date:</span>
                  <span className="text-white font-medium">Wednesday, September 30, 2026</span>
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span className="font-semibold text-slate-400">Venue:</span>
                  <span className="text-white font-medium">Kalingarayan Seminar Hall, KEC</span>
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-slate-400">For Queries:</span>
                  <span className="text-white font-medium">
                    Maheshkumar S (+91 93425 29462) &bull; Suganya S S (+91 98429 83032)
                  </span>
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <svg className="w-4 h-4 text-pink-400 shrink-0 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span className="font-semibold text-slate-400">Instagram:</span>
                  <a 
                    href="https://instagram.com/cea_official_kec" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-pink-300 hover:text-pink-200 hover:underline font-mono"
                  >
                    @cea_official_kec
                  </a>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onOpenRegister?.('')}
                  className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Register Free Online</span>
                </button>

                <button
                  onClick={() => {
                    setLightboxOpen(true);
                    setZoomLevel(1);
                  }}
                  className="px-5 py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ZoomIn className="w-4 h-4 text-indigo-400" />
                  <span>Zoom Poster High-Res</span>
                </button>

                <button
                  onClick={onExploreEvents}
                  className="px-5 py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-800 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>View Event Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-8 animate-in fade-in duration-300"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Header Controls */}
          <div 
            className="absolute top-4 sm:top-6 left-4 right-4 sm:left-6 sm:right-6 flex items-center justify-between z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-xs sm:text-sm font-bold text-white px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700 backdrop-blur-md">
              CIVISTA 2026 Official Poster
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
                href="/images/civista-symposium-poster.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 active:scale-95 transition-all cursor-pointer"
                title="Open in new tab"
              >
                <Download className="w-4 h-4" />
              </a>
              <button
                onClick={() => setLightboxOpen(false)}
                className="p-2.5 rounded-xl bg-red-600/80 hover:bg-red-600 text-white border border-red-500/50 active:scale-95 transition-all cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div 
            className="max-w-4xl max-h-[88vh] overflow-auto p-2 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src="/images/civista-symposium-poster.jpg" 
              alt="CIVISTA Poster Fullscreen" 
              className="max-h-[82vh] w-auto object-contain rounded-2xl shadow-2xl transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default PosterShowcase;
