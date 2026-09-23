import React from 'react';
import { ArrowUp, Sparkles, Heart } from 'lucide-react';

const Footer = ({ onOpenRegister }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    if (targetId === '#register') {
      onOpenRegister();
      return;
    }
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-12 relative overflow-hidden">
      {/* Decorative top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-slate-900">
          {/* Logo & Tagline */}
          <div className="max-w-md">
            <div className="flex items-center gap-3.5 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400/30 via-indigo-500/40 to-purple-600/40 p-0.5 shadow-lg shadow-indigo-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] p-1 flex items-center justify-center overflow-hidden">
                  <img src="/cea-logo.png" alt="Civil Engineering Association Logo" className="w-full h-full object-contain" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-white font-heading tracking-tight">
                    CIVISTA
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-md">
                    2026
                  </span>
                </div>
                <span className="text-[11px] tracking-wider uppercase text-amber-300/80 font-mono block">
                  Civil Engineering Association (CEA)
                </span>
              </div>
            </div>
            <p className="text-sm font-semibold text-slate-300 font-heading">
              Where Ideas Meet Innovation, Competition Meets Fun
            </p>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              The premier national-level inter-college symposium bringing together technical mastery, analytical genius, and high-energy camaraderie.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-sm font-medium text-slate-400">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="hover:text-white transition-colors"
            >
              Home
            </a>
            <a
              href="#events"
              onClick={(e) => handleNavClick(e, '#events')}
              className="hover:text-white transition-colors"
            >
              Events
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, '#about')}
              className="hover:text-white transition-colors"
            >
              About
            </a>
            <button
              onClick={() => onOpenRegister()}
              className="hover:text-white transition-colors"
            >
              Register
            </button>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-indigo-500/50 transition-all shadow-md group"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 CIVISTA. All Rights Reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 inline mx-0.5" />
            <span>for collegiate innovation & excellence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
