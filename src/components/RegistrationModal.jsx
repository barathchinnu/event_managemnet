import React, { useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import RegistrationForm from './RegistrationForm';

const RegistrationModal = ({ isOpen, onClose, selectedEventId, onRegistered }) => {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-3xl bg-slate-950 border border-indigo-500/30 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 transition-all animate-in fade-in zoom-in-95 duration-200">
        <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors z-20 border border-slate-800"
          aria-label="Close registration dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              CIVISTA 2026 Portal
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Event Registration
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Complete your details below to secure your spot. Spot confirmation will be generated instantly.
            </p>
          </div>

          <RegistrationForm
            selectedEventId={selectedEventId}
            isModal={true}
            onSuccess={(data) => {
              if (onRegistered) onRegistered(data);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
