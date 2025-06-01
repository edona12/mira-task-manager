const pool = require('../config/db');
const bcrypt = require('bcrypt');

const createStaff = async (req, res) => {
  try {
    const { name, email, position, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const staffResult = await pool.query(
      'INSERT INTO staff (name, email, position, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, position, hashedPassword]
    );

    await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)',
      [name, email, hashedPassword, 'staff']
    );

    res.status(201).json(staffResult.rows[0]);
  } catch (error) {
    console.error('Gabim gjatë shtimit të stafit:', error);

    res.status(500).json({ error: 'Gabim gjatë shtimit të stafit' });
  }
};

module.exports = {
  createStaff,
};
