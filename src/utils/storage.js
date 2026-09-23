// Registration storage and persistence helper

const STORAGE_KEY = "civista_registrations";

export const getStoredRegistrations = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading registrations from localStorage:", err);
    return [];
  }
};

export const saveRegistration = (registrationData) => {
  try {
    const current = getStoredRegistrations();
    const newRecord = {
      ...registrationData,
      registrationId: registrationData.registrationId || `CIV-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
    };
    
    const updated = [newRecord, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newRecord;
  } catch (err) {
    console.error("Error saving registration to localStorage:", err);
    throw err;
  }
};

export const deleteRegistration = (id) => {
  try {
    const current = getStoredRegistrations();
    const filtered = current.filter(item => item.registrationId !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return filtered;
  } catch (err) {
    console.error("Error deleting registration:", err);
    return [];
  }
};

export const getRegistrationById = (id) => {
  const current = getStoredRegistrations();
  return current.find(item => item.registrationId === id) || null;
};

/**
 * Export all locally stored registrations to a downloadable CSV spreadsheet.
 */
export const exportRegistrationsToCSV = () => {
  const registrations = getStoredRegistrations();
  if (!registrations || registrations.length === 0) return false;

  const headers = [
    "Registration ID",
    "Full Name",
    "Email",
    "Phone Number",
    "College Name",
    "Department",
    "Year",
    "Event",
    "Category",
    "Participation Type",
    "Team Name",
    "Team Members",
    "Registration Date",
    "Registration Time"
  ];

  const rows = registrations.map(reg => [
    reg.registrationId || "",
    `"${(reg.fullName || "").replace(/"/g, '""')}"`,
    `"${(reg.email || "").replace(/"/g, '""')}"`,
    `"${(reg.phone || "").replace(/"/g, '""')}"`,
    `"${(reg.college || "").replace(/"/g, '""')}"`,
    `"${(reg.department || "").replace(/"/g, '""')}"`,
    `"${(reg.year || "").replace(/"/g, '""')}"`,
    `"${(reg.eventTitle || reg.event || "").replace(/"/g, '""')}"`,
    `"${(reg.eventCategory || "").replace(/"/g, '""')}"`,
    `"${(reg.participationType || "").replace(/"/g, '""')}"`,
    `"${(reg.teamName || "").replace(/"/g, '""')}"`,
    `"${((reg.teamMembers || []).join("; ")).replace(/"/g, '""')}"`,
    `"${(reg.registrationDate || (reg.createdAt ? new Date(reg.createdAt).toLocaleDateString() : '')).replace(/"/g, '""')}"`,
    `"${(reg.registrationTime || (reg.createdAt ? new Date(reg.createdAt).toLocaleTimeString() : '')).replace(/"/g, '""')}"`
  ]);

  const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(r => r.join(","))].join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `CIVISTA_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return true;
};

