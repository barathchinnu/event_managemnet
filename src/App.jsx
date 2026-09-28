import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Footer from './components/Footer';
import RegistrationModal from './components/RegistrationModal';
import RegistrationsListModal from './components/RegistrationsListModal';
import { ToastProvider } from './components/Toast';
import { getStoredRegistrations, getStoredEventCounts } from './utils/storage';
import { fetchLiveEventCounts } from './utils/googleSheets';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'register'
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [registrationCount, setRegistrationCount] = useState(0);
  const [eventCounts, setEventCounts] = useState(() => getStoredEventCounts());

  // Sync registration count on load and fetch live counts
  useEffect(() => {
    updateCount();
    fetchLiveEventCounts().then((liveCounts) => {
      if (liveCounts) {
        setEventCounts((prev) => ({ ...prev, ...liveCounts }));
      }
    });
  }, []);

  const updateCount = (newCounts) => {
    const list = getStoredRegistrations();
    setRegistrationCount(list.length);
    if (newCounts) {
      setEventCounts((prev) => ({ ...prev, ...newCounts }));
    } else {
      setEventCounts(getStoredEventCounts());
    }
  };

  const handleOpenRegister = (eventId = '') => {
    setSelectedEventId(eventId);
    setIsRegisterModalOpen(true);
  };

  const handleRegisteredSuccess = (record) => {
    updateCount();
    // Re-fetch live counts after registration
    fetchLiveEventCounts().then((liveCounts) => {
      if (liveCounts) {
        setEventCounts((prev) => ({ ...prev, ...liveCounts }));
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenRegister={() => handleOpenRegister('')}
        onViewRegistrations={() => setIsListModalOpen(true)}
        registrationCount={registrationCount}
      />

      {/* Main Content: Home Page or Dedicated Register Page */}
      <main className="flex-1">
        {currentPage === 'home' ? (
          <Home
            onOpenRegisterModal={handleOpenRegister}
            selectedEventForModal={selectedEventId}
            eventCounts={eventCounts}
          />
        ) : (
          <Register
            onBackToHome={() => setCurrentPage('home')}
            preselectedEventId={selectedEventId}
            eventCounts={eventCounts}
            onRegisteredSuccess={handleRegisteredSuccess}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onOpenRegister={() => handleOpenRegister('')} />

      {/* Quick Interactive Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        selectedEventId={selectedEventId}
        onRegistered={handleRegisteredSuccess}
        eventCounts={eventCounts}
      />

      {/* My Registrations / Delegate Passes Stored Modal */}
      <RegistrationsListModal
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        onRefreshCount={() => updateCount()}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
