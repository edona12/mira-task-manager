const pool = require('../config/db');
const bcrypt = require('bcrypt');

// Merr të gjithë stafin
const getAllStaff = async () => {
  const result = await pool.query('SELECT * FROM staff ORDER BY id ASC');
  return result.rows;
};

// Shto staf të ri me fjalëkalim të hash-uar
const createStaff = async ({ name, email, position, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO staff (name, email, position, password) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, position, hashedPassword]
  );
  return result.rows[0];
};

// Përditëso staf (pa ndryshuar fjalëkalimin)
const updateStaff = async (id, { name, email, position }) => {
  const result = await pool.query(
    'UPDATE staff SET name = $1, email = $2, position = $3 WHERE id = $4 RETURNING *',
    [name, email, position, id]
  );
  return result.rows[0];
};

// Fshij staf
const deleteStaff = async (id) => {
  await pool.query('DELETE FROM staff WHERE id = $1', [id]);
};

// Login staf me kontroll të fjalëkalimit hash
const loginStaff = async (email, password) => {
  const result = await pool.query('SELECT * FROM staff WHERE email = $1', [email]);

  if (result.rows.length === 0) return null;

  const staff = result.rows[0];
  const match = await bcrypt.compare(password, staff.password);

  if (!match) return null;

  return staff;
};

module.exports = {
  getAllStaff,
  createStaff,
  updateStaff,
  deleteStaff,
  loginStaff
};
