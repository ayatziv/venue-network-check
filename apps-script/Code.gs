// Google Apps Script web app that emails the venue network report.
// Deploy: script.google.com > New project > paste this > Deploy > New deployment
//   Type: Web app | Execute as: Me | Who has access: Anyone
// Copy the /exec URL into REPORT_URL in index.html.

const REPORT_EMAIL = "ayatziv@gmail.com";

function doPost(e) {
  const r = JSON.parse(e.postData.contents);

  const lines = [
    "Time: " + r.time,
    "Public IP: " + r.publicIp,
    "",
    "Download: " + r.download + " Mbps",
    "Upload: " + r.upload + " Mbps",
    "Ping: " + r.ping + " ms",
    "",
    "Services:",
  ];
  r.services.forEach(function (s) {
    lines.push("  " + s.name + " - " + s.status + " (" + s.ms + " ms)");
  });

  MailApp.sendEmail(REPORT_EMAIL, "Venue network check: " + r.download + " Mbps down", lines.join("\n"));
  return ContentService.createTextOutput("ok");
}
