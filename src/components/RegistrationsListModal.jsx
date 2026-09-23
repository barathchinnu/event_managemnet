import React, { useState, useEffect } from 'react';
import { X, Ticket, Trash2, Printer, ExternalLink, CheckCircle, FileText } from 'lucide-react';
import { getStoredRegistrations, deleteRegistration } from '../utils/storage';
import { EVENT_WHATSAPP_GROUPS } from '../data/events';
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

                    {/* WhatsApp Group Link for registered event */}
                    {(() => {
                      const waUrl = item.whatsappGroupUrl || EVENT_WHATSAPP_GROUPS[item.event]?.url || (
                        item.event?.includes('quiz') ? EVENT_WHATSAPP_GROUPS['technical-quiz'].url :
                        item.event?.includes('auction') ? EVENT_WHATSAPP_GROUPS['ipl-auction'].url :
                        item.event?.includes('bond') ? EVENT_WHATSAPP_GROUPS['build-the-bond'].url :
                        EVENT_WHATSAPP_GROUPS['presentation'].url
                      );

                      return waUrl ? (
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200 text-xs font-semibold transition-all mb-3 w-full justify-center group"
                        >
                          <svg className="w-4 h-4 text-[#25D366] fill-current" viewBox="0 0 24 24">
                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.99.54 1.761.83 2.796.83h.001c3.181 0 5.766-2.586 5.767-5.767.001-3.18-2.585-5.766-5.768-5.766zm3.328 8.163c-.14-.233-.513-.372-.979-.606-.466-.233-2.756-1.359-3.185-1.515-.429-.156-.741-.233-1.053.233-.312.467-1.207 1.515-1.48 1.826-.272.312-.544.351-1.01.117-.466-.233-1.968-.725-3.748-2.312-1.385-1.234-2.321-2.759-2.593-3.226-.272-.467-.029-.719.204-.951.21-.21.466-.544.699-.816.233-.272.311-.467.466-.778.156-.312.078-.584-.039-.817-.117-.233-1.053-2.535-1.442-3.471-.379-.912-.764-.788-1.053-.802l-.897-.015c-.312 0-.817.117-1.246.584s-1.636 1.597-1.636 3.896c0 2.299 1.675 4.519 1.908 4.831.233.312 3.298 5.036 7.99 7.062 1.116.482 1.988.77 2.667.985 1.121.356 2.141.306 2.947.185.899-.134 2.756-1.127 3.146-2.217.389-1.089.389-2.023.272-2.217z"/>
                          </svg>
                          <span>Join WhatsApp Group</span>
                          <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      ) : null;
                    })()}
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
