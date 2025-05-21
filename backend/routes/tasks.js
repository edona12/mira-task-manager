const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // lidhja me PostgreSQL
const { authenticateToken } = require('../middleware/auth'); // kontrolli i tokenit

// 📥 Merr të gjitha detyrat për user-in e kyçur
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    console.log("🔐 req.user.id nga token:", userId);

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

// ➕ Shto një detyrë të re
router.post('/', authenticateToken, async (req, res) => {
  const { title, description, priority, due_date } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description, status, priority, assigned_to, due_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, description, 'pending', priority, userId, due_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Gabim gjatë INSERT:", err);
    res.status(500).json({ message: 'Gabim gjatë shtimit të detyrës' });
  }
});

// 🗑️ Fshi një detyrë sipas ID-së
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND assigned_to = $2 RETURNING *',
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Detyra nuk u gjet ose nuk lejohet' });
    }

    res.json({ message: 'Detyra u fshi me sukses' });
  } catch (err) {
    console.error("❌ Gabim gjatë fshirjes:", err);
    res.status(500).json({ message: 'Gabim në server' });
  }
});

// 🔁 Përditëso një detyrë
router.put('/:id', authenticateToken, async (req, res) => {
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
      return res.status(404).json({ message: 'Detyra nuk u gjet ose nuk lejohet për update' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Gabim gjatë përditësimit:", err);
    res.status(500).json({ message: 'Gabim në server' });
  }
});

module.exports = router;
