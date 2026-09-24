import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Sparkles, 
  UserCheck, 
  CheckCircle2, 
  AlertCircle,
  MessageSquare,
  Code2
} from 'lucide-react';
import { FEST_DETAILS } from '../data/events';
import { useToast } from './Toast';

const Contact = () => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = "Your name is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = "Your email address is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = "Please provide a valid email";
    }
    if (!formData.message.trim()) {
      errs.message = "Message cannot be empty";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      addToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please fill in all contact message fields correctly.'
      });
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
      addToast({
        type: 'success',
        title: 'Message Dispatched!',
        message: `Thank you, ${formData.name}. Our event coordination team will get back to you shortly!`
      });
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 600);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-950/80 border-t border-slate-900">
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-500/15 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Get In Touch
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4 font-heading">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">Coordinators</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Have questions about events, registration, rules, or directions to the venue? Reach out to our organizing team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Coordinators & Venue Logistics */}
          <div className="lg:col-span-6 space-y-6">
            {/* Event Coordinators Card */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
              <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-indigo-400" />
                Event Coordinators
              </h3>

              {/* Staff Coordinator */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 font-bold">
                  FC
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                    Staff Convenor
                  </span>
                  <h4 className="text-base font-bold text-white">
                    {FEST_DETAILS.contact.staffCoordinator.name}
                  </h4>
                  <p className="text-xs text-slate-400 mb-1">
                    {FEST_DETAILS.contact.staffCoordinator.designation}
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs text-indigo-300 mt-2">
                    <a href={`tel:${FEST_DETAILS.contact.staffCoordinator.phone}`} className="hover:underline flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" />
                      {FEST_DETAILS.contact.staffCoordinator.phone}
                    </a>
                    <a href={`mailto:${FEST_DETAILS.contact.staffCoordinator.email}`} className="hover:underline flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" />
                      {FEST_DETAILS.contact.staffCoordinator.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Student President */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0 font-bold">
                  MS
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                    Student Coordinator
                  </span>
                  <h4 className="text-base font-bold text-white">
                    {FEST_DETAILS.contact.studentPresident.name}
                  </h4>
                  <p className="text-xs text-slate-400 mb-1">
                    {FEST_DETAILS.contact.studentPresident.designation}
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs text-pink-300 mt-2">
                    <a href={`tel:${FEST_DETAILS.contact.studentPresident.phone}`} className="hover:underline flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" />
                      {FEST_DETAILS.contact.studentPresident.phone}
                    </a>
                    <a href={`mailto:${FEST_DETAILS.contact.studentPresident.email}`} className="hover:underline flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" />
                      {FEST_DETAILS.contact.studentPresident.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Student Coordinator - Suganya S S */}
              {FEST_DETAILS.contact.studentCoordinator && (
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 font-bold">
                    SS
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                      Student Coordinator
                    </span>
                    <h4 className="text-base font-bold text-white">
                      {FEST_DETAILS.contact.studentCoordinator.name}
                    </h4>
                    <p className="text-xs text-slate-400 mb-1">
                      {FEST_DETAILS.contact.studentCoordinator.designation}
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs text-purple-300 mt-2">
                      <a href={`tel:${FEST_DETAILS.contact.studentCoordinator.phone}`} className="hover:underline flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" />
                        {FEST_DETAILS.contact.studentCoordinator.phone}
                      </a>
                      <a href={`mailto:${FEST_DETAILS.contact.studentCoordinator.email}`} className="hover:underline flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5" />
                        {FEST_DETAILS.contact.studentCoordinator.email}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Portal Developer */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/20 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-bold">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                    Portal Developer & Designer
                  </span>
                  <h4 className="text-base font-bold text-white">
                    Barath M <span className="text-amber-400 text-sm font-mono">(24CSR036)</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Department of Computer Science and Engineering, Kongu Engineering College
                  </p>
                  <div className="mt-2.5">
                    <a
                      href="tel:+916369166195"
                      className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 transition-colors font-medium"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>Contact: 6369166195</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Venue & Location Card */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800">
              <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-pink-400" />
                College / Event Venue
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {FEST_DETAILS.contact.venueAddress}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-slate-800 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-300">{FEST_DETAILS.contact.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-300">{FEST_DETAILS.contact.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-6">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-indigo-400" />
                  Send an Inquiry
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mb-6">
                  Fill in your query and our organizing committee will respond within 24 hours.
                </p>

                {submitted ? (
                  <div className="p-6 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-center my-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                    <h4 className="text-base font-bold text-white mb-1">Message Sent Successfully!</h4>
                    <p className="text-xs text-slate-300">
                      We will get back to you at your provided email shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                        Name <span className="text-pink-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        placeholder="Your full name"
                        className={`w-full px-4 py-3 bg-slate-900 rounded-xl border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                          errors.name
                            ? 'border-red-500 focus:ring-red-500/50'
                            : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/30'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-400 mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                        Email <span className="text-pink-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        placeholder="Your email address"
                        className={`w-full px-4 py-3 bg-slate-900 rounded-xl border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                          errors.email
                            ? 'border-red-500 focus:ring-red-500/50'
                            : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/30'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                        Message <span className="text-pink-500">*</span>
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (errors.message) setErrors({ ...errors, message: undefined });
                        }}
                        placeholder="Type your question or message regarding events, rules, accommodation..."
                        className={`w-full px-4 py-3 bg-slate-900 rounded-xl border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                          errors.message
                            ? 'border-red-500 focus:ring-red-500/50'
                            : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/30'
                        }`}
                      />
                      {errors.message && (
                        <p className="text-xs text-red-400 mt-1">{errors.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSending ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                          <span>Sending Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Social Media Links */}
              <div className="pt-6 border-t border-slate-800 mt-6">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
                  Connect on Social Channels
                </span>
                <div className="flex items-center gap-3">
                  {['Instagram', 'LinkedIn', 'YouTube', 'WhatsApp', 'Twitter'].map((social) => (
                    <button
                      key={social}
                      onClick={() => addToast({ type: 'info', title: social, message: `Visiting CIVISTA ${social} channel...` })}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                    >
                      {social}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
