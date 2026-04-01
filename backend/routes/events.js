const express = require('express');
const fs = require('fs');
const router = express.Router();
const events = require('../db/events.json');
const registrations = require('../db/registrations.json');
const auth = require('../middleware/authMiddleware');

// Get all events
router.get('/', (req, res) => {
  res.json(events);
});

// Register for event
router.post('/register', auth, (req, res) => {
  const { eventId } = req.body;

  const newReg = {
    id: Date.now(),
    userId: req.user.id,
    eventId
  };

  registrations.push(newReg);
  fs.writeFileSync('./db/registrations.json', JSON.stringify(registrations, null, 2));

  res.json({ message: "Registered successfully" });
});

// Admin: create event
router.post('/create', auth, (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Not allowed" });

  const { title, date, location, description } = req.body;

  const newEvent = {
    id: Date.now(),
    title,
    date,
    location,
    description
  };

  events.push(newEvent);
  fs.writeFileSync('./db/events.json', JSON.stringify(events, null, 2));

  res.json({ message: "Event created" });
});

router.get('/export', (req, res) => {
  const ws = XLSX.utils.json_to_sheet(events);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Events");

  const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  res.setHeader("Content-Disposition", "attachment; filename=events.xlsx");
  res.send(buffer);
});
router.post('/import', (req, res) => {
  const file = req.body.fileBase64;

  const buffer = Buffer.from(file, "base64");
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const imported = XLSX.utils.sheet_to_json(sheet);

  fs.writeFileSync('./db/events.json', JSON.stringify(imported, null, 2));

  res.json({ message: "Events imported successfully" });
});

module.exports = router;