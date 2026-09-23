/**
 * Google Sheets API utility for CIVISTA 2026 Registration
 *
 * Uses Google Apps Script as the serverless backend.
 * The Apps Script URL is stored in VITE_GOOGLE_SHEETS_API_URL env variable.
 */

const APPS_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SHEETS_API_URL;
const SHEETS_ID        = import.meta.env.VITE_GOOGLE_SHEETS_ID;

/**
 * Checks if a string looks like a valid Google Spreadsheet ID
 * (Google Sheets IDs are typically ~44 alphanumeric characters and don't start with 'AKfycb' which is an Apps Script Deployment ID).
 */
function isValidSheetId(id) {
  if (!id || typeof id !== 'string') return false;
  const trimmed = id.trim();
  if (trimmed.startsWith('AKfycb')) return false; // This is an Apps Script deployment ID!
  return trimmed.length >= 25;
}

/**
 * Build the registration payload to send to Apps Script.
 */
function buildPayload(formData, eventConfig) {
  const isTeam = formData.participationType === 'team';
  return {
    fullName:          formData.fullName.trim(),
    email:             formData.email.trim(),
    phone:             formData.phone.trim(),
    college:           formData.college.trim(),
    department:        formData.department,
    year:              formData.year,
    event:             eventConfig ? eventConfig.title : formData.event,
    category:          eventConfig ? eventConfig.category : '',
    participationType: formData.participationType,
    teamName:          isTeam ? (formData.teamName || '').trim() : '',
    teamLeader:        isTeam ? (formData.teamLeaderName || formData.fullName || '').trim() : '',
    teamMember2:       isTeam ? (formData.teamMember2 || '').trim() : '',
    teamMember3:       isTeam ? (formData.teamMember3 || '').trim() : '',
    teamMember4:       isTeam ? (formData.teamMember4 || '').trim() : '',
  };
}

/**
 * Test connectivity to Google Apps Script.
 * Performs an unauthenticated GET request to diagnose permissions and CORS settings.
 *
 * @returns {Promise<{connected: boolean, message: string, data?: object, reason?: string}>}
 */
export async function testConnectionToSheets() {
  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.trim() === '') {
    return {
      connected: false,
      reason: 'MISSING_URL',
      message: 'VITE_GOOGLE_SHEETS_API_URL is not configured in .env'
    };
  }

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      return {
        connected: false,
        reason: 'HTTP_ERROR',
        message: `Server returned HTTP ${response.status} (${response.statusText}).`
      };
    }

    const data = await response.json();
    return {
      connected: true,
      data,
      message: 'Google Apps Script is online, authorized, and responding successfully!'
    };
  } catch (err) {
    return {
      connected: false,
      reason: 'PERMISSIONS_OR_CORS',
      message: 'Connection blocked by Google Apps Script. "Who has access" must be set to "Anyone" (not "Only myself").',
      error: err.message
    };
  }
}

/**
 * Submit a registration to Google Sheets via Google Apps Script.
 *
 * @param {object} formData       - The raw form state object
 * @param {object} eventConfig    - Matching event object from EVENTS_DATA
 * @returns {Promise<{success, registrationId, registrationDate, registrationTime, message}>}
 */
export async function submitRegistrationToSheets(formData, eventConfig) {
  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.trim() === '') {
    throw new Error(
      'VITE_GOOGLE_SHEETS_API_URL is not set. ' +
      'Add your Google Apps Script deployment URL to the .env file.'
    );
  }

  const payload = buildPayload(formData, eventConfig);

  try {
    // ── Primary fetch: text/plain prevents CORS preflight, redirect: 'follow' ──
    const response = await fetch(APPS_SCRIPT_URL, {
      method:   'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Google Sheets returned an error while saving data.');
    }

    return result; // { success: true, registrationId, registrationDate, registrationTime, message }

  } catch (err) {
    // If the browser threw a network/CORS error, diagnose it specifically
    if (err.name === 'TypeError' || err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) {
      throw new Error(
        'Could not reach Google Sheets. ' +
        'Please ensure your Google Apps Script Web App is deployed with "Who has access: Anyone" (NOT "Only myself").'
      );
    }

    throw err;
  }
}

/**
 * Returns the direct Excel (.xlsx) download URL for the Google Sheet.
 * Requires a valid VITE_GOOGLE_SHEETS_ID to be set.
 */
export function getExcelDownloadUrl() {
  if (!isValidSheetId(SHEETS_ID)) return null;
  return `https://docs.google.com/spreadsheets/d/${SHEETS_ID.trim()}/export?format=xlsx&sheet=CIVISTA%20Registrations`;
}

/**
 * Returns the Google Sheet's browser URL for organizer access.
 */
export function getSheetUrl() {
  if (!isValidSheetId(SHEETS_ID)) return null;
  return `https://docs.google.com/spreadsheets/d/${SHEETS_ID.trim()}/edit`;
}

/**
 * Returns true if the Google Sheets integration is configured.
 */
export function isGoogleSheetsConfigured() {
  return Boolean(APPS_SCRIPT_URL && APPS_SCRIPT_URL.trim());
}
