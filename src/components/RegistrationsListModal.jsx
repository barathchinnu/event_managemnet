import React, { useState, useEffect } from 'react';
import { X, Ticket, Trash2, Printer, ExternalLink, CheckCircle, FileText } from 'lucide-react';
import { getStoredRegistrations, deleteRegistration } from '../utils/storage';
import { useToast } from './Toast';

const RegistrationsListModal = ({ isOpen, onClose, onRefreshCount }) => {
  const { addToast } = useToast();
  const [registrations, setRegistrations] = useState([]);
  const [selectedPass, setSelectedPass] = useState(null);

  useEffect(() => {
    if (isOpen) {
      loadRegistrations();
    }
  }, [isOpen]);

  const loadRegistrations = () => {
    const list = getStoredRegistrations();
    setRegistrations(list);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove the registration for ${name}?`)) {
      const updated = deleteRegistration(id);
      setRegistrations(updated);
      if (onRefreshCount) onRefreshCount(updated.length);
      addToast({
        type: 'info',
        title: 'Registration Deleted',
        message: `Registration ${id} removed.`
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 my-8">
        <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-2xl">
                <Ticket className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white font-heading">
                  My Registered Passes
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Stored locally in your browser. Total: {registrations.length}
                </p>
              </div>
            </div>
          </div>

          {registrations.length === 0 ? (
            <div className="text-center py-16 px-4 bg-slate-950/60 rounded-2xl border border-dashed border-slate-800">
              <Ticket className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">No Registrations Yet</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto mb-5">
                You haven't registered for any events yet. Pick an event and register to get your official CIVISTA 2026 pass!
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
              >
                Browse Events & Register
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {registrations.map((item) => (
                <div
                  key={item.registrationId}
                  className="bg-slate-950 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-5 transition-all shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold block">
                          {item.registrationId}
                        </span>
                        <h4 className="text-lg font-bold text-white font-heading mt-0.5">
                          {item.eventTitle || item.event}
                        </h4>
                      </div>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Confirmed
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-300 mb-4">
                      <div>
                        <span className="text-slate-500">Name:</span>{' '}
                        <span className="text-slate-200 font-semibold">{item.fullName}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">College:</span>{' '}
                        <span className="text-slate-300">{item.college}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Dept & Year:</span>{' '}
                        <span className="text-slate-300">{item.department} ({item.year})</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Mode:</span>{' '}
                        <span className="capitalize font-medium text-indigo-300">
                          {item.participationType} {item.teamName && `• Team: ${item.teamName}`}
                        </span>
                      </div>
                      {item.teamMembers && item.teamMembers.length > 0 && (
                        <div className="text-[11px] text-slate-400 bg-slate-900/80 p-2 rounded-lg mt-1">
                          <span className="text-slate-500 block">Members:</span>
                          {item.teamMembers.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-900 text-xs text-slate-400">
                    <span className="text-[11px]">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => window.print()}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                        title="Print pass"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.registrationId, item.fullName)}
                        className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-300 transition-colors"
                        title="Delete registration"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationsListModal;
