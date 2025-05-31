const pool = require('../config/db'); // lidhu me databazën PostgreSQL

// Merr të gjithë stafin
const getAllStaff = async () => {
  const result = await pool.query('SELECT * FROM staff ORDER BY id ASC');
  return result.rows;
};

// Shto staf të ri
const createStaff = async ({ name, email, position }) => {
  const result = await pool.query(
    'INSERT INTO staff (name, email, position) VALUES ($1, $2, $3) RETURNING *',
    [name, email, position]
  );
  return result.rows[0];
};

// Përditëso staf
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

module.exports = {
  getAllStaff,
  createStaff,
  updateStaff,
  deleteStaff,
};
