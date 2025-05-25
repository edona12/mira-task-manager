const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const { authenticateToken } = require('../middleware/auth');

// Merr të gjitha njoftimet e ruajtura
router.get('/', authenticateToken, async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    console.error("❌ Gabim gjatë marrjes së njoftimeve:", err);
    res.status(500).json({ message: 'Gabim gjatë marrjes së njoftimeve' });
  }
});

module.exports = router;
