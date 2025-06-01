const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { authenticateToken } = require('../middleware/auth');
const { requireAdmin } = require('../middleware/roleMiddleware');
const Notification = require('../models/Notification');
const { Parser } = require('json2csv');

// ===========================
// ADMIN ROUTES
// ===========================

// Merr të gjitha detyrat (admin only)
router.get('/', requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        tasks.*, 
        users.name AS assigned_name
      FROM tasks
      LEFT JOIN users ON tasks.assigned_to = users.id
      ORDER BY tasks.id ASC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gabim gjatë marrjes së detyrave' });
  }
});

// Krijo një detyrë të re (admin only)
router.post('/', requireAdmin, async (req, res) => {
  const { title, description, priority, assigned_to, due_date } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description, priority, assigned_to, due_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, priority, assigned_to, due_date]
    );

    await Notification.create({ message: `Detyra "${title}" u krijua nga admini.` });

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Gabim gjatë shtimit:", err);
    res.status(500).json({ message: 'Gabim gjatë krijimit të detyrës' });
  }
});

// Përditëso një detyrë (admin only)
router.put('/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, due_date, assigned_to } = req.body;

  try {
    const result = await pool.query(
      `UPDATE tasks 
       SET title = $1, description = $2, priority = $3, due_date = $4, assigned_to = $5
       WHERE id = $6 RETURNING *`,
      [title, description, priority, due_date, assigned_to, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Detyra nuk u gjet' });
    }

    await Notification.create({ message: `Detyra "${title}" u përditësua nga admini.` });

    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Gabim gjatë përditësimit:", err);
    res.status(500).json({ message: 'Gabim në server' });
  }
});

// Fshi një detyrë (admin only)
router.delete('/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Detyra nuk u gjet' });
    }

    await Notification.create({ message: `Detyra u fshi nga admini.` });

    res.json({ message: 'Detyra u fshi me sukses' });
  } catch (err) {
    console.error("❌ Gabim gjatë fshirjes:", err);
    res.status(500).json({ message: 'Gabim në server' });
  }
});


// USER ROUTES

// Merr detyrat e userit të kyçur
router.get('/mytasks', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'SELECT * FROM tasks WHERE assigned_to = $1',
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gabim gjatë marrjes së detyrave' });
  }
});

// Përditëso një detyrë të vetën
router.put('/mytasks/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, due_date } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `UPDATE tasks 
       SET title = $1, description = $2, priority = $3, due_date = $4
       WHERE id = $5 AND assigned_to = $6 
       RETURNING *`,
      [title, description, priority, due_date, id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Nuk ke të drejtë ta përditësosh këtë detyrë' });
    }

    await Notification.create({ message: `Detyra "${title}" u përditësua nga user-i.` });

    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Gabim gjatë përditësimit:", err);
    res.status(500).json({ message: 'Gabim në server' });
  }
});

// Fshi një detyrë të vetën
router.delete('/mytasks/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND assigned_to = $2 RETURNING *',
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Detyra nuk u gjet ose nuk të përket ty' });
    }

    await Notification.create({ message: `Detyra u fshi nga user-i.` });

    res.json({ message: 'Detyra u fshi me sukses' });
  } catch (err) {
    console.error("❌ Gabim gjatë fshirjes:", err);
    res.status(500).json({ message: 'Gabim në server' });
  }
});

// Eksporto detyrat e userit në CSV
router.get('/export', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      'SELECT title, description, priority, due_date FROM tasks WHERE assigned_to = $1',
      [userId]
    );
    const tasks = result.rows;

    const fields = ['title', 'description', 'priority', 'due_date'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(tasks);

    res.header('Content-Type', 'text/csv');
    res.attachment('tasks_export.csv');

    return res.send('\uFEFF' + csv);
  } catch (err) {
    console.error("❌ Gabim gjatë eksportimit:", err);
    res.status(500).json({ error: 'Gabim gjatë eksportimit të detyrave' });
  }
});

module.exports = router;
