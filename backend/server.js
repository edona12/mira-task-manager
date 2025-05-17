require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes'); // shtohet edhe kjo

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes); // lidhja e taskRoutes

// Lidhja me databazën duke përdorur .env
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Endpoint për test
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Gabim në lidhjen me databazën" });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
