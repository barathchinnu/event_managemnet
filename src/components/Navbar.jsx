import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Ticket, Calendar, ShieldCheck, ChevronRight } from 'lucide-react';

const Navbar = ({ onOpenRegister, onViewRegistrations, registrationCount = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Events', href: '#events' },
    { name: 'About', href: '#about' },
    { name: 'Why Join', href: '#why-participate' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const navOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-xl border-b border-indigo-500/20 shadow-xl shadow-black/40 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* CIVISTA Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-indigo-400 to-purple-300 font-heading">
                  C
                </span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-400 rounded-full animate-ping opacity-75"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-white font-heading group-hover:text-indigo-300 transition-colors">
                  CIVISTA
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-md">
                  2026
                </span>
              </div>
              <span className="text-[10px] tracking-wider uppercase text-slate-400 font-mono hidden sm:block">
                Inter-College Fest
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Registered Passes shortcut button */}
            <button
              onClick={onViewRegistrations}
              className="relative px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 rounded-xl transition-all flex items-center gap-1.5"
              title="View your saved registrations"
            >
              <Ticket className="w-3.5 h-3.5 text-indigo-400" />
              <span>My Passes</span>
              {registrationCount > 0 && (
                <span className="w-4 h-4 text-[10px] font-bold bg-indigo-500 text-white rounded-full flex items-center justify-center ml-0.5">
                  {registrationCount}
                </span>
              )}
            </button>

            {/* Prominent Register Now CTA */}
            <button
              onClick={() => onOpenRegister()}
              className="relative group overflow-hidden px-5 py-2.5 rounded-xl font-semibold text-sm text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all duration-300 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 group-hover:opacity-95 transition-opacity"></div>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-200" />
                Register Now
              </span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onViewRegistrations}
              className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg relative"
              aria-label="View passes"
            >
              <Ticket className="w-4 h-4 text-indigo-400" />
              {registrationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 text-[9px] font-bold bg-indigo-500 text-white rounded-full flex items-center justify-center">
                  {registrationCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-slate-300 hover:text-white bg-slate-900 border border-slate-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6 text-indigo-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="sm:hidden bg-slate-950/98 backdrop-blur-2xl border-b border-indigo-500/20 px-5 pt-4 pb-6 mt-3 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:text-white hover:bg-slate-900/80 transition-colors"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80 space-y-2.5">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenRegister();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg shadow-indigo-600/30"
            >
              <Sparkles className="w-4 h-4" />
              Register Now
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                onViewRegistrations();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-medium text-sm text-slate-300 bg-slate-900 border border-slate-800"
            >
              <Ticket className="w-4 h-4 text-indigo-400" />
              View Stored Passes ({registrationCount})
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
