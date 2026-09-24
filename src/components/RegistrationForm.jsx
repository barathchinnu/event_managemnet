import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  RotateCcw, 
  User, 
  Users, 
  CheckCircle2, 
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Copy,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EVENTS_DATA, EVENT_WHATSAPP_GROUPS } from '../data/events';
import { saveRegistration } from '../utils/storage';
import { submitRegistrationToSheets, isGoogleSheetsConfigured, testConnectionToSheets } from '../utils/googleSheets';
import { useToast } from './Toast';

const DEPARTMENTS = [
  "Computer Science & Engineering",
  "Information Technology",
  "Artificial Intelligence & Data Science",
  "Electronics & Communication Engineering",
  "Electrical & Electronics Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Master of Computer Applications (MCA)",
  "Management Studies (MBA/BBA)",
  "Sciences & Humanities",
  "Other"
];

const YEARS_OF_STUDY = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "Postgraduate (PG)"
];

const INITIAL_FORM_STATE = {
  fullName: '',
  email: '',
  phone: '',
  college: 'Kongu Engineering College',
  department: '',
  year: '',
  event: '',
  participationType: 'individual',
  teamName: '',
  teamLeaderName: '',
  teamMember2: '',
  teamMember3: '',
  teamMember4: '',
};

const RegistrationForm = ({ 
  selectedEventId = '', 
  onSuccess = null,
  isModal = false 
}) => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredSuccessData, setRegisteredSuccessData] = useState(null);
  // submissionError: null | { message: string } — keeps form data intact on API failure
  const [submissionError, setSubmissionError] = useState(null);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionTestResult, setConnectionTestResult] = useState(null);
  const [showAllWhatsappGroups, setShowAllWhatsappGroups] = useState(false);

  // Sync when selectedEventId prop changes
  useEffect(() => {
    if (selectedEventId) {
      handleEventSelection(selectedEventId);
    }
  }, [selectedEventId]);

  const currentEventConfig = EVENTS_DATA.find(e => e.id === formData.event);

  const handleEventSelection = (eventId) => {
    const ev = EVENTS_DATA.find(e => e.id === eventId);
    if (!ev) return;

    let pType = 'individual';
    // If event does not support individual, force team
    if (!ev.supportsIndividual && ev.supportsTeam) {
      pType = 'team';
    }

    setFormData(prev => ({
      ...prev,
      event: eventId,
      participationType: pType,
      // If team leader empty, default to full name
      teamLeaderName: prev.teamLeaderName || prev.fullName
    }));

    // Clear event error if any
    setErrors(prev => ({ ...prev, event: undefined }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => {
      const next = { ...prev, [field]: value };
      if (field === 'fullName' && !prev.teamLeaderName) {
        next.teamLeaderName = value;
      }
      return next;
    });

    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Field validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Please enter a valid full name";
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g. alex@gmail.com)";
    }

    // Phone validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    const cleanPhone = formData.phone.replace(/[\s\-\+\(\)]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }

    if (!formData.college.trim()) {
      newErrors.college = "College Name is required";
    }

    if (!formData.department) {
      newErrors.department = "Please select your department";
    }

    if (!formData.year) {
      newErrors.year = "Please select your year of study";
    }

    if (!formData.event) {
      newErrors.event = "Please select an event to register for";
    }

    // Team validation if participationType is 'team'
    if (formData.participationType === 'team') {
      if (!formData.teamName.trim()) {
        newErrors.teamName = "Team Name is required for team participation";
      }

      if (!formData.teamLeaderName.trim()) {
        newErrors.teamLeaderName = "Team Leader Name is required";
      }

      if (!formData.teamMember2.trim()) {
        newErrors.teamMember2 = "Team Member 2 Name is required";
      }

      // Check minimum team sizes
      if (currentEventConfig) {
        if (currentEventConfig.minTeamSize >= 3 && !formData.teamMember3.trim()) {
          newErrors.teamMember3 = `Team Member 3 is required for ${currentEventConfig.title} (Min ${currentEventConfig.minTeamSize} members)`;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError(null);

    if (!validateForm()) {
      addToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please fill in all required fields correctly before submitting.'
      });
      return;
    }

    setIsSubmitting(true);

    // Build team members array for localStorage backup
    const teamMembersArray = [];
    if (formData.participationType === 'team') {
      if (formData.teamLeaderName.trim()) teamMembersArray.push(formData.teamLeaderName.trim());
      if (formData.teamMember2.trim()) teamMembersArray.push(formData.teamMember2.trim());
      if (formData.teamMember3.trim()) teamMembersArray.push(formData.teamMember3.trim());
      if (formData.teamMember4.trim()) teamMembersArray.push(formData.teamMember4.trim());
    }

    try {
      let registrationId;
      let regDate = new Date().toLocaleDateString('en-IN');
      let regTime = new Date().toLocaleTimeString('en-IN');

      if (isGoogleSheetsConfigured()) {
        // ── PRIMARY: Google Sheets via Apps Script ──────────────────────────
        const result = await submitRegistrationToSheets(formData, currentEventConfig);

        if (!result.success) {
          throw new Error(result.message || 'Google Sheets returned an error.');
        }

        registrationId = result.registrationId;
        regDate        = result.registrationDate || regDate;
        regTime        = result.registrationTime || regTime;
        formData.sheetName = result.sheetName || 'CIVISTA Registrations';
        formData.spreadsheetUrl = result.spreadsheetUrl || null;
      } else {
        // ── FALLBACK: localStorage only (no Apps Script URL configured) ────
        console.warn(
          '[CIVISTA] VITE_GOOGLE_SHEETS_API_URL is not set. ' +
          'Registration saved locally only. See .env.example to configure Google Sheets.'
        );
        registrationId = `CIV-LOCAL-${Math.floor(10000 + Math.random() * 90000)}`;
      }

      // Build the full record for localStorage (backup copy)
      const registrationRecord = {
        registrationId,
        fullName:      formData.fullName.trim(),
        email:         formData.email.trim(),
        phone:         formData.phone.trim(),
        college:       formData.college.trim(),
        department:    formData.department,
        year:          formData.year,
        event:         formData.event,
        eventTitle:    currentEventConfig ? currentEventConfig.title : formData.event,
        eventCategory: currentEventConfig ? currentEventConfig.category : '',
        participationType: formData.participationType,
        teamName:      formData.participationType === 'team' ? formData.teamName.trim() : null,
        teamMembers:   teamMembersArray,
        registrationDate: regDate,
        registrationTime: regTime,
        sheetName:     formData.sheetName || 'CIVISTA Registrations',
        spreadsheetUrl: formData.spreadsheetUrl || null,
        whatsappGroupUrl: currentEventConfig?.whatsappGroupUrl || EVENT_WHATSAPP_GROUPS[formData.event]?.url || null,
      };

      // Save backup to localStorage (won't throw; non-critical)
      try {
        saveRegistration(registrationRecord);
      } catch (_) {}

      // Confetti celebration burst
      try {
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
      } catch (_) {}

      addToast({
        type: 'success',
        title: 'Registration Successful!',
        message: `Welcome to CIVISTA, ${registrationRecord.fullName}! Registered for ${registrationRecord.eventTitle}.`
      });

      setIsSubmitting(false);
      setRegisteredSuccessData(registrationRecord);

      if (onSuccess) onSuccess(registrationRecord);

    } catch (err) {
      console.error('[CIVISTA] Registration error:', err);
      setIsSubmitting(false);
      setSubmissionError({
        message: err.message || 'Unable to save your registration right now. Please try again.'
      });
      addToast({
        type: 'error',
        title: 'Registration Failed',
        message: 'Could not connect to the registration server. Your form data is preserved.'
      });
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
    setRegisteredSuccessData(null);
    setSubmissionError(null);
    addToast({
      type: 'info',
      title: 'Form Reset',
      message: 'Registration form fields have been reset.'
    });
  };

  const handleSaveLocallyFallback = () => {
    const isTeam = formData.participationType === 'team';
    const teamMembersArray = [];
    if (isTeam) {
      if (formData.teamLeaderName.trim()) teamMembersArray.push(formData.teamLeaderName.trim());
      if (formData.teamMember2.trim()) teamMembersArray.push(formData.teamMember2.trim());
      if (formData.teamMember3.trim()) teamMembersArray.push(formData.teamMember3.trim());
      if (formData.teamMember4.trim()) teamMembersArray.push(formData.teamMember4.trim());
    }

    const registrationRecord = {
      registrationId: `CIV-LOCAL-${Math.floor(10000 + Math.random() * 90000)}`,
      fullName:          formData.fullName.trim(),
      email:             formData.email.trim(),
      phone:             formData.phone.trim(),
      college:           formData.college.trim(),
      department:        formData.department,
      year:              formData.year,
      event:             formData.event,
      eventTitle:        currentEventConfig ? currentEventConfig.title : formData.event,
      eventCategory:     currentEventConfig ? currentEventConfig.category : '',
      participationType: formData.participationType,
      teamName:          isTeam ? (formData.teamName || '').trim() : null,
      teamMembers:       teamMembersArray,
      registrationDate:  new Date().toLocaleDateString('en-IN'),
      registrationTime:  new Date().toLocaleTimeString('en-IN'),
      whatsappGroupUrl:  currentEventConfig?.whatsappGroupUrl || EVENT_WHATSAPP_GROUPS[formData.event]?.url || null,
    };

    try {
      saveRegistration(registrationRecord);
    } catch (_) {}

    try {
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    } catch (_) {}

    addToast({
      type: 'warning',
      title: 'Pass Saved Locally',
      message: 'Pass saved to your browser! Google Sheets was unreachable.'
    });

    setSubmissionError(null);
    setRegisteredSuccessData(registrationRecord);
    if (onSuccess) onSuccess(registrationRecord);
  };

  const handleTestBackendConnection = async () => {
    setIsTestingConnection(true);
    setConnectionTestResult(null);
    try {
      const result = await testConnectionToSheets();
      setConnectionTestResult(result);
      if (result.connected) {
        addToast({
          type: 'success',
          title: 'Backend Online',
          message: 'Google Apps Script is reachable and ready to receive submissions!'
        });
      } else {
        addToast({
          type: 'error',
          title: 'Access Blocked',
          message: result.message
        });
      }
    } catch (err) {
      setConnectionTestResult({
        connected: false,
        message: err.message || 'Connection test failed.'
      });
    } finally {
      setIsTestingConnection(false);
    }
  };

  // ── ERROR SCREEN: API failed but form data is preserved ──────────────────
  if (submissionError) {
    return (
      <div className="bg-slate-900/90 border border-red-500/40 rounded-3xl p-6 sm:p-10 text-center backdrop-blur-xl shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-red-500/20 border border-red-500/40 rounded-2xl flex items-center justify-center mx-auto mb-4 text-red-400">
          <AlertCircle className="w-10 h-10" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 font-heading">
          Registration Not Saved to Google Sheets
        </h3>

        <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto mb-3">
          Your form data is safe! The backend rejected the submission due to Google Apps Script permissions.
        </p>

        <p className="text-xs text-red-400/90 mb-5 font-mono bg-red-950/40 border border-red-900/50 rounded-xl px-4 py-2.5 max-w-md mx-auto">
          {submissionError.message}
        </p>

        {/* Live Backend Connection Tester */}
        <div className="max-w-md mx-auto mb-6 p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-left">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Diagnostic Connection Test
            </span>
            <button
              type="button"
              onClick={handleTestBackendConnection}
              disabled={isTestingConnection}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-300 bg-indigo-950/60 hover:bg-indigo-900/70 border border-indigo-500/30 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isTestingConnection ? 'animate-spin' : ''}`} />
              <span>{isTestingConnection ? 'Testing...' : 'Test Connection'}</span>
            </button>
          </div>

          {connectionTestResult && (
            <div className={`p-3 rounded-xl text-xs mb-3 border ${
              connectionTestResult.connected
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-red-950/40 border-red-500/40 text-red-300'
            }`}>
              <div className="font-bold flex items-center gap-1.5 mb-1">
                {connectionTestResult.connected ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Backend is Reachable!</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>Access Blocked (401 / CORS)</span>
                  </>
                )}
              </div>
              <p className="text-[11px] opacity-90">{connectionTestResult.message}</p>
            </div>
          )}

          {/* Step-by-Step Fix Instructions */}
          <div className="text-[11px] text-slate-300 space-y-2 bg-slate-900/60 rounded-xl p-3 border border-slate-800/80">
            <p className="font-bold text-indigo-300">
              🛠️ How to fix in Google Apps Script (30 seconds):
            </p>
            <ol className="list-decimal list-inside space-y-1 text-slate-400">
              <li>Open your script at <strong className="text-slate-200">script.google.com</strong></li>
              <li>Click <strong className="text-slate-200">Deploy</strong> &rarr; <strong className="text-slate-200">Manage deployments</strong></li>
              <li>Click the ✏️ <strong className="text-slate-200">Edit</strong> icon on your active deployment</li>
              <li>Change <strong className="text-amber-300">Who has access</strong> to <strong className="text-emerald-400">"Anyone"</strong> <span className="text-xs text-rose-400">(NOT "Only myself")</span></li>
              <li>Under Version, select <strong className="text-indigo-300">"New version"</strong>, then click <strong className="text-indigo-400">Deploy</strong></li>
            </ol>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setSubmissionError(null)}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20"
          >
            Try Again
          </button>
          <button
            onClick={handleSaveLocallyFallback}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-bold text-emerald-300 hover:text-white bg-emerald-950/50 hover:bg-emerald-900/70 border border-emerald-600/40 transition-colors shadow-lg"
            title="Save the pass directly to your browser storage"
          >
            Save as Offline Pass
          </button>
          <button
            onClick={handleReset}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700 transition-colors border border-slate-700"
          >
            Reset Form
          </button>
        </div>
      </div>
    );
  }

  // ── SUCCESS SCREEN ─────────────────────────────────────────────────────────
  if (registeredSuccessData) {
    return (
      <div className="bg-slate-900/90 border border-emerald-500/40 rounded-3xl p-6 sm:p-10 text-center backdrop-blur-xl shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-400">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 font-heading">
          Registration Successful! Welcome to CIVISTA.
        </h3>

        <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto mb-6">
          Congratulations <strong className="text-white">{registeredSuccessData.fullName}</strong>! You have successfully registered for{' '}
          <strong className="text-indigo-400">{registeredSuccessData.eventTitle}</strong>.
        </p>

        {/* Delegate Pass Card */}
        <div className="max-w-md mx-auto bg-slate-950 border border-slate-800 rounded-2xl p-5 text-left mb-8 shadow-inner relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Registration ID</span>
              <span className="text-sm font-mono font-bold text-indigo-400">
                {registeredSuccessData.registrationId}
              </span>
            </div>
            <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Confirmed
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <div>
              <span className="text-slate-500">Participant:</span>{' '}
              <span className="font-semibold text-white">{registeredSuccessData.fullName}</span>
            </div>
            <div>
              <span className="text-slate-500">Event:</span>{' '}
              <span className="font-semibold text-indigo-300">{registeredSuccessData.eventTitle}</span>{' '}
              ({registeredSuccessData.participationType === 'team' ? 'Team Participation' : 'Individual'})
            </div>
            {registeredSuccessData.participationType === 'team' && (
              <div>
                <span className="text-slate-500">Team Name:</span>{' '}
                <span className="font-semibold text-amber-300">{registeredSuccessData.teamName}</span>
                <span className="text-slate-400 block text-[11px] mt-0.5">
                  Members: {registeredSuccessData.teamMembers?.join(', ')}
                </span>
              </div>
            )}
            <div>
              <span className="text-slate-500">College:</span>{' '}
              <span className="text-slate-200">{registeredSuccessData.college}</span>
            </div>
            <div>
              <span className="text-slate-500">Department & Year:</span>{' '}
              <span className="text-slate-200">{registeredSuccessData.department} • {registeredSuccessData.year}</span>
            </div>
            {registeredSuccessData.registrationDate && (
              <div>
                <span className="text-slate-500">Registered on:</span>{' '}
                <span className="text-slate-200">
                  {registeredSuccessData.registrationDate} at {registeredSuccessData.registrationTime}
                </span>
              </div>
            )}
            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Registration Status: <strong className="text-white">Confirmed & Recorded</strong></span>
            </div>
          </div>
        </div>

        {/* OFFICIAL PARTICIPANT WHATSAPP GROUP JOIN CARD */}
        {(() => {
          const eventWhatsappUrl = 
            registeredSuccessData.whatsappGroupUrl || 
            EVENT_WHATSAPP_GROUPS[registeredSuccessData.event]?.url || 
            (
              registeredSuccessData.event?.includes('quiz') ? EVENT_WHATSAPP_GROUPS['technical-quiz'].url :
              registeredSuccessData.event?.includes('auction') ? EVENT_WHATSAPP_GROUPS['ipl-auction'].url :
              registeredSuccessData.event?.includes('bond') ? EVENT_WHATSAPP_GROUPS['build-the-bond'].url :
              EVENT_WHATSAPP_GROUPS['presentation'].url
            );

          return (
            <div className="max-w-md mx-auto mb-8 rounded-3xl bg-gradient-to-br from-emerald-950/80 via-slate-950 to-emerald-950/80 border-2 border-emerald-500/50 p-5 sm:p-6 text-left shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-start gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#25D366]/20 border border-[#25D366]/50 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30">
                  <svg className="w-6 h-6 text-[#25D366] fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.99.54 1.761.83 2.796.83h.001c3.181 0 5.766-2.586 5.767-5.767.001-3.18-2.585-5.766-5.768-5.766zm3.328 8.163c-.14-.233-.513-.372-.979-.606-.466-.233-2.756-1.359-3.185-1.515-.429-.156-.741-.233-1.053.233-.312.467-1.207 1.515-1.48 1.826-.272.312-.544.351-1.01.117-.466-.233-1.968-.725-3.748-2.312-1.385-1.234-2.321-2.759-2.593-3.226-.272-.467-.029-.719.204-.951.21-.21.466-.544.699-.816.233-.272.311-.467.466-.778.156-.312.078-.584-.039-.817-.117-.233-1.053-2.535-1.442-3.471-.379-.912-.764-.788-1.053-.802l-.897-.015c-.312 0-.817.117-1.246.584s-1.636 1.597-1.636 3.896c0 2.299 1.675 4.519 1.908 4.831.233.312 3.298 5.036 7.99 7.062 1.116.482 1.988.77 2.667.985 1.121.356 2.141.306 2.947.185.899-.134 2.756-1.127 3.146-2.217.389-1.089.389-2.023.272-2.217z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      Official WhatsApp Group
                    </span>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white font-heading">
                    Join {registeredSuccessData.eventTitle} Group
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Click below to join your event's WhatsApp group for room allotments, spot schedules, rule updates, and coordinator announcements.
                  </p>
                </div>
              </div>

              {/* Clickable Action Button */}
              <div className="space-y-3 pt-3 border-t border-emerald-500/20">
                <a
                  href={eventWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl font-black text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-[#25D366] via-emerald-400 to-[#25D366] hover:from-emerald-300 hover:to-emerald-400 shadow-xl shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 active:scale-95 group/btn cursor-pointer"
                >
                  <span>Click to Join WhatsApp Group</span>
                  <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>

                <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 bg-slate-900/70 p-2 rounded-xl border border-slate-800">
                  <span className="truncate max-w-[220px] sm:max-w-[260px] text-emerald-300 font-mono">
                    {eventWhatsappUrl}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(eventWhatsappUrl);
                      addToast({
                        type: 'success',
                        title: 'Link Copied!',
                        message: 'WhatsApp group invite link copied to clipboard.'
                      });
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </button>
                </div>

                {/* All 4 Groups Expandable Section */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAllWhatsappGroups(!showAllWhatsappGroups)}
                    className="w-full text-xs text-slate-400 hover:text-slate-200 flex items-center justify-between py-1 transition-colors cursor-pointer"
                  >
                    <span>Need to join other CIVISTA event groups?</span>
                    {showAllWhatsappGroups ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {showAllWhatsappGroups && (
                    <div className="mt-2 space-y-2 pt-2 border-t border-slate-800/80 animate-in fade-in duration-200">
                      {Object.entries(EVENT_WHATSAPP_GROUPS).map(([key, item]) => (
                        <div key={key} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                          <span className="text-slate-200 font-medium truncate max-w-[190px]">{item.name}</span>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white font-semibold flex items-center gap-1 transition-colors"
                          >
                            <span>Join</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })()}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              setRegisteredSuccessData(null);
              setSubmissionError(null);
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20"
          >
            Register for Another Event
          </button>
          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700"
          >
            Print / Save Pass
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* SECTION 1: PERSONAL DETAILS */}
      <div>
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800">
          <User className="w-5 h-5 text-indigo-400" />
          <h4 className="text-lg font-bold text-white font-heading">
            1. Personal Details
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Full Name <span className="text-pink-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="e.g. Alexander Vance"
                className={`w-full px-4 py-3 bg-slate-900/90 rounded-xl border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                  errors.fullName
                    ? 'border-red-500 focus:ring-red-500/50'
                    : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/30'
                }`}
              />
            </div>
            {errors.fullName && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Email Address <span className="text-pink-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="e.g. alex@example.com"
                className={`w-full px-4 py-3 bg-slate-900/90 rounded-xl border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-500/50'
                    : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/30'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Phone Number <span className="text-pink-500">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                maxLength={10}
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, ''))}
                placeholder="10-digit mobile number"
                className={`w-full px-4 py-3 bg-slate-900/90 rounded-xl border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                  errors.phone
                    ? 'border-red-500 focus:ring-red-500/50'
                    : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/30'
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.phone}
              </p>
            )}
          </div>

          {/* College Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              College Name <span className="text-pink-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.college}
                onChange={(e) => handleInputChange('college', e.target.value)}
                placeholder="Kongu Engineering College"
                className={`w-full px-4 py-3 bg-slate-900/90 rounded-xl border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                  errors.college
                    ? 'border-red-500 focus:ring-red-500/50'
                    : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/30'
                }`}
              />
            </div>
            {errors.college && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.college}
              </p>
            )}
          </div>

          {/* Department Dropdown */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Department <span className="text-pink-500">*</span>
            </label>
            <select
              value={formData.department}
              onChange={(e) => handleInputChange('department', e.target.value)}
              className={`w-full px-4 py-3 bg-slate-900/90 rounded-xl border text-sm text-white focus:outline-none focus:ring-2 transition-all ${
                errors.department
                  ? 'border-red-500 focus:ring-red-500/50'
                  : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/30'
              }`}
            >
              <option value="">-- Select Department --</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept} className="bg-slate-900 text-white">
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.department}
              </p>
            )}
          </div>

          {/* Year of Study */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Year of Study <span className="text-pink-500">*</span>
            </label>
            <select
              value={formData.year}
              onChange={(e) => handleInputChange('year', e.target.value)}
              className={`w-full px-4 py-3 bg-slate-900/90 rounded-xl border text-sm text-white focus:outline-none focus:ring-2 transition-all ${
                errors.year
                  ? 'border-red-500 focus:ring-red-500/50'
                  : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/30'
              }`}
            >
              <option value="">-- Select Year --</option>
              {YEARS_OF_STUDY.map((yr) => (
                <option key={yr} value={yr} className="bg-slate-900 text-white">
                  {yr}
                </option>
              ))}
            </select>
            {errors.year && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.year}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 2: EVENT DETAILS */}
      <div>
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <h4 className="text-lg font-bold text-white font-heading">
            2. Event Selection & Team Configuration
          </h4>
        </div>

        {/* Selected Event Picker */}
        <div className="mb-6">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Choose Event <span className="text-pink-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {EVENTS_DATA.map((ev) => {
              const isSelected = formData.event === ev.id;
              return (
                <button
                  type="button"
                  key={ev.id}
                  onClick={() => handleEventSelection(ev.id)}
                  className={`p-3.5 rounded-2xl text-left border transition-all duration-200 relative ${
                    isSelected
                      ? ev.isIplSpecial
                        ? 'bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/20 ring-1 ring-amber-400'
                        : 'bg-indigo-600/25 border-indigo-500 shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-500'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {ev.category === 'Technical Event' ? 'Tech' : 'Non-Tech'}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                    )}
                  </div>
                  <div className="font-bold text-sm text-white">{ev.title}</div>
                  <div className="text-[11px] text-slate-400 mt-1">{ev.teamSize}</div>
                  <div className="text-[10px] text-indigo-400 font-medium mt-0.5">{ev.time}</div>
                </button>
              );
            })}
          </div>
          {errors.event && (
            <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.event}
            </p>
          )}
        </div>

        {/* Participation Type Selector */}
        {currentEventConfig && (
          <div className="mb-6 p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Participation Mode
            </label>
            <div className="flex flex-wrap gap-4">
              {currentEventConfig.supportsIndividual && (
                <label className="flex items-center gap-2 text-sm text-slate-200 cursor-pointer">
                  <input
                    type="radio"
                    name="participationType"
                    value="individual"
                    checked={formData.participationType === 'individual'}
                    onChange={() => handleInputChange('participationType', 'individual')}
                    className="accent-indigo-500 w-4 h-4"
                  />
                  <span>Individual Participation</span>
                </label>
              )}

              {currentEventConfig.supportsTeam && (
                <label className="flex items-center gap-2 text-sm text-slate-200 cursor-pointer">
                  <input
                    type="radio"
                    name="participationType"
                    value="team"
                    checked={formData.participationType === 'team'}
                    onChange={() => handleInputChange('participationType', 'team')}
                    className="accent-indigo-500 w-4 h-4"
                  />
                  <span>Team Participation ({currentEventConfig.teamSize})</span>
                </label>
              )}
            </div>

            {!currentEventConfig.supportsIndividual && (
              <p className="text-xs text-amber-300/80 mt-2 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Note: {currentEventConfig.title} requires team participation ({currentEventConfig.teamSize}).
              </p>
            )}
          </div>
        )}

        {/* DYNAMIC TEAM MEMBER FIELDS */}
        {formData.participationType === 'team' && currentEventConfig && (
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-indigo-500/25 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-sm font-bold text-indigo-300">
              <Users className="w-4 h-4" />
              <span>Team Details & Member Roster</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Team Name */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Team Name <span className="text-pink-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.teamName}
                  onChange={(e) => handleInputChange('teamName', e.target.value)}
                  placeholder="e.g. Quantum Pioneers / Royal Challengers"
                  className={`w-full px-4 py-3 bg-slate-950 rounded-xl border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.teamName
                      ? 'border-red-500 focus:ring-red-500/50'
                      : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/30'
                  }`}
                />
                {errors.teamName && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.teamName}
                  </p>
                )}
              </div>

              {/* Team Leader Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Team Leader (Member 1) <span className="text-pink-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.teamLeaderName || formData.fullName}
                  onChange={(e) => handleInputChange('teamLeaderName', e.target.value)}
                  placeholder="Team Leader Full Name"
                  className={`w-full px-4 py-3 bg-slate-950 rounded-xl border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.teamLeaderName
                      ? 'border-red-500 focus:ring-red-500/50'
                      : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/30'
                  }`}
                />
                {errors.teamLeaderName && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.teamLeaderName}
                  </p>
                )}
              </div>

              {/* Team Member 2 */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Team Member 2 <span className="text-pink-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.teamMember2}
                  onChange={(e) => handleInputChange('teamMember2', e.target.value)}
                  placeholder="Full Name of Member 2"
                  className={`w-full px-4 py-3 bg-slate-950 rounded-xl border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.teamMember2
                      ? 'border-red-500 focus:ring-red-500/50'
                      : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/30'
                  }`}
                />
                {errors.teamMember2 && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.teamMember2}
                  </p>
                )}
              </div>

              {/* Team Member 3 (Shown if maxTeamSize >= 3) */}
              {currentEventConfig.maxTeamSize >= 3 && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Team Member 3{' '}
                    {currentEventConfig.minTeamSize >= 3 ? (
                      <span className="text-pink-500">*</span>
                    ) : (
                      <span className="text-slate-500 text-[10px]">(Optional)</span>
                    )}
                  </label>
                  <input
                    type="text"
                    value={formData.teamMember3}
                    onChange={(e) => handleInputChange('teamMember3', e.target.value)}
                    placeholder="Full Name of Member 3"
                    className={`w-full px-4 py-3 bg-slate-950 rounded-xl border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                      errors.teamMember3
                        ? 'border-red-500 focus:ring-red-500/50'
                        : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/30'
                    }`}
                  />
                  {errors.teamMember3 && (
                    <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.teamMember3}
                    </p>
                  )}
                </div>
              )}

              {/* Team Member 4 (Shown if maxTeamSize >= 4) */}
              {currentEventConfig.maxTeamSize >= 4 && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Team Member 4 <span className="text-slate-500 text-[10px]">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.teamMember4}
                    onChange={(e) => handleInputChange('teamMember4', e.target.value)}
                    placeholder="Full Name of Member 4"
                    className="w-full px-4 py-3 bg-slate-950 rounded-xl border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* FORM ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <button
          type="button"
          onClick={handleReset}
          className="w-full sm:w-auto px-5 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Form</span>
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span>Processing Registration...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              <span>Submit Registration</span>
            </div>
          )}
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
