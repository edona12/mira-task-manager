// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mira_task_manager',
  password: "postgres",
  port: 5432,
});

const JWT_SECRET = 'sekret_shume_i_fshet'; 

// REGISTER
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
      [name, email, hashedPassword]
    );
    const token = jwt.sign({ userId: result.rows[0].id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  }catch (err) {
  console.error("Gabim gjatë regjistrimit:", err); // 🟢 SHTO KËTË

  if (err.code === '23505') {
    res.status(400).json({ message: 'Email është tashmë i regjistruar' });
  } else {
    res.status(500).json({ message: 'Gabim në server' });
  }
}

});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Email nuk u gjet' });
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Fjalëkalimi është gabim' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      username: user.name 
    });

  } catch (err) {
    res.status(500).json({ message: 'Gabim në server' });
  }
});


module.exports = router;
