/**
 * CIVISTA 2026 - Google Apps Script (Production Ready & Self-Healing)
 * 
 * ─────────────────────────────────────────────────────────────────────────────
 * ⚠️ CRITICAL DEPLOYMENT SETTINGS (WHY IT FAILS IF NOT SET):
 * 1. Open your Google Sheet -> Click Extensions -> Apps Script
 *    (OR go to script.google.com and set SPREADSHEET_ID below)
 * 2. Paste this entire code into Code.gs and click Save (Ctrl+S)
 * 3. Click "Deploy" (top-right blue button) -> "Manage deployments" (or "New deployment")
 *    - Click the Pencil (Edit) icon
 *    - Execute as: "Me" (your Google account)
 *    - ⚠️ Who has access: "Anyone" (DO NOT choose "Only myself" or "Anyone with Google account"!)
 *    - Version: "New version"
 * 4. Click "Deploy" -> "Authorize access" -> "Advanced" -> "Go to CIVISTA (unsafe)" -> "Allow"
 * 5. Copy the Web App URL (ends with /exec) into your .env as VITE_GOOGLE_SHEETS_API_URL
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── YOUR EXACT GOOGLE SHEET ID ──────────────────────────────────────────────
var SPREADSHEET_ID = "1y_yExPwx9ZTyHc15ZyUOgnUeda4eaDFFMlcOnT3vks4";

// Expected column headers for CIVISTA 2026
var HEADERS = [
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
  "Team Leader",
  "Team Member 2",
  "Team Member 3",
  "Team Member 4",
  "Registration Date",
  "Registration Time"
];

// ─── CORS Helper ─────────────────────────────────────────────────────────────

function corsResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ─── OPTIONS Preflight Handler ───────────────────────────────────────────────

function doOptions(e) {
  return ContentService
    .createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}

// ─── Self-Healing Sheet Loader ───────────────────────────────────────────────

function getTargetSheet() {
  var ss = null;

  // 1. ALWAYS open your exact spreadsheet ID first!
  if (SPREADSHEET_ID && SPREADSHEET_ID.trim() !== "") {
    try {
      ss = SpreadsheetApp.openById(SPREADSHEET_ID.trim());
    } catch (e) {
      // Fallback
    }
  }

  // 2. Fallback to active spreadsheet
  if (!ss) {
    try {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    } catch (e) {}
  }

  if (!ss) {
    throw new Error(
      "No active Google Sheet found! Please ensure SPREADSHEET_ID is correct: " + SPREADSHEET_ID
    );
  }

  // 3. TARGET THE FIRST TAB (the exact one visible when you open the sheet!)
  var sheet = ss.getSheets()[0];

  // 4. Auto-initialize header row if empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);

    // Style the header row with CIVISTA indigo theme
    var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#4338ca"); // Indigo
    headerRange.setFontColor("#ffffff");
    sheet.setFrozenRows(1);

    for (var i = 1; i <= HEADERS.length; i++) {
      sheet.autoResizeColumn(i);
    }
  }

  return { ss: ss, sheet: sheet };
}

// ─── Main POST Handler ───────────────────────────────────────────────────────

function doPost(e) {
  var lock = LockService.getScriptLock();

  try {
    lock.waitLock(30000); // Wait up to 30 seconds for concurrent requests
  } catch (lockErr) {
    return corsResponse({
      success: false,
      message: "Server is currently busy handling other registrations. Please try again."
    });
  }

  try {
    // Parse incoming payload (supports both JSON body and URL encoded parameters)
    var data = null;
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        data = e.parameter;
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    if (!data || !data.fullName || !data.email) {
      lock.releaseLock();
      return corsResponse({
        success: false,
        message: "Invalid registration data. 'fullName' and 'email' are required."
      });
    }

    var target = getTargetSheet();
    var sheet = target.sheet;

    // Generate sequential Registration ID (CIVISTA-0001, CIVISTA-0002, ...)
    var lastRow = sheet.getLastRow();
    var nextNumber = Math.max(1, lastRow); // lastRow includes row 1 header
    var registrationId = "CIVISTA-" + String(nextNumber).padStart(4, "0");

    // Server-side timestamp
    var timeZone = Session.getScriptTimeZone() || "Asia/Kolkata";
    var now = new Date();
    var regDate = Utilities.formatDate(now, timeZone, "dd/MM/yyyy");
    var regTime = Utilities.formatDate(now, timeZone, "HH:mm:ss");

    // Append new registration record
    sheet.appendRow([
      registrationId,
      data.fullName   || "",
      data.email      || "",
      data.phone      || "",
      data.college    || "",
      data.department || "",
      data.year       || "",
      data.event      || "",
      data.category   || "",
      data.participationType || "individual",
      data.teamName    || "",
      data.teamLeader  || "",
      data.teamMember2 || "",
      data.teamMember3 || "",
      data.teamMember4 || "",
      regDate,
      regTime
    ]);

    lock.releaseLock();

    return corsResponse({
      success: true,
      registrationId: registrationId,
      registrationDate: regDate,
      registrationTime: regTime,
      sheetName: sheet.getName(),
      spreadsheetName: target.ss.getName(),
      spreadsheetId: target.ss.getId(),
      spreadsheetUrl: target.ss.getUrl(),
      totalRows: sheet.getLastRow(),
      message: "Registration successful"
    });

  } catch (err) {
    try { lock.releaseLock(); } catch (e2) {}
    return corsResponse({
      success: false,
      message: "Registration failed: " + err.toString()
    });
  }
}

// ─── GET Handler (Health Check & Diagnostics) ────────────────────────────────

function doGet(e) {
  // Support fallback registration via GET parameters if needed
  if (e && e.parameter && e.parameter.fullName && e.parameter.email) {
    return doPost(e);
  }

  // Diagnostic check to report live spreadsheet status
  var statusInfo = {
    connected: false,
    spreadsheetName: null,
    spreadsheetId: null,
    spreadsheetUrl: null,
    sheetName: null,
    totalRows: 0,
    headersInitialized: false,
    error: null
  };

  try {
    var target = getTargetSheet();
    statusInfo.connected = true;
    statusInfo.spreadsheetName = target.ss.getName();
    statusInfo.spreadsheetId = target.ss.getId();
    statusInfo.spreadsheetUrl = target.ss.getUrl();
    statusInfo.sheetName = target.sheet.getName();
    statusInfo.totalRows = target.sheet.getLastRow();
    statusInfo.headersInitialized = target.sheet.getLastRow() >= 1;
  } catch (err) {
    statusInfo.error = err.message;
  }

  return corsResponse({
    success: true,
    status: "CIVISTA 2026 Google Apps Script backend is running successfully.",
    spreadsheet: statusInfo,
    serverTime: new Date().toISOString(),
    version: "2.1.0"
  });
}
