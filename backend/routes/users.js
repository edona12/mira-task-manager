const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { Parser } = require('json2csv');
const { authenticateToken } = require('../middleware/auth');

router.get('/export', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email FROM users');
    const users = result.rows;

    const fields = ['id', 'name', 'email'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(users);

    const bom = Buffer.from('\uFEFF', 'utf8');
    const csvBuffer = Buffer.concat([bom, Buffer.from(csv, 'utf8')]);

    res.header('Content-Type', 'text/csv');
    res.attachment('users_export.csv');
    res.send(csvBuffer);
  } catch (err) {
    console.error("❌ Gabim gjatë eksportimit të përdoruesve:", err);
    res.status(500).json({ error: 'Gabim gjatë eksportimit të përdoruesve' });
  }
});
const { requireAdmin } = require('../middleware/roleMiddleware');

// router.get('/only-users', requireAdmin, async (req, res) => {
//   try {
//     const result = await pool.query("SELECT id, name FROM users WHERE role = 'user'");
//     res.json(result.rows);
//   } catch (err) {
//     console.error("❌ Gabim gjatë marrjes së userëve:", err);
//     res.status(500).json({ message: 'Gabim gjatë marrjes së stafit' });
//   }
// });
// Merr të gjithë userat me rol 'staff'
router.get('/staff', async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, email FROM users WHERE role = 'staff' ORDER BY name ASC");
    res.json(result.rows);
  } catch (error) {
    console.error("Gabim gjatë marrjes së userave me rol staff:", error);
    res.status(500).json({ message: "Gabim në server." });
  }
});


module.exports = router;
