import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X, Sparkles } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    const newToast = { id, ...toast };
    
    setToasts((prev) => [...prev, newToast]);

    if (toast.duration !== 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 4500);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-md w-full px-4 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto transform transition-all duration-300 ease-out translate-y-0 opacity-100 flex items-start gap-3 p-4 rounded-xl shadow-2xl border backdrop-blur-md ${
              t.type === 'error'
                ? 'bg-red-950/90 border-red-500/50 text-red-100'
                : t.type === 'warning'
                ? 'bg-amber-950/90 border-amber-500/50 text-amber-100'
                : t.type === 'info'
                ? 'bg-sky-950/90 border-sky-500/50 text-sky-100'
                : 'bg-emerald-950/90 border-emerald-500/50 text-emerald-100'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {t.type === 'error' ? (
                <AlertCircle className="w-5 h-5 text-red-400" />
              ) : t.type === 'warning' ? (
                <AlertCircle className="w-5 h-5 text-amber-400" />
              ) : t.type === 'info' ? (
                <Info className="w-5 h-5 text-sky-400" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              )}
            </div>
            <div className="flex-1 text-sm">
              {t.title && <div className="font-semibold text-white tracking-wide">{t.title}</div>}
              <div className="text-slate-200 mt-0.5 leading-snug">{t.message}</div>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-slate-400 hover:text-white transition-colors p-1"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
