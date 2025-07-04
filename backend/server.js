require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/tasks');
const notificationRoutes = require('./routes/notifications');
const usersRoutes = require('./routes/users'); 
const staffRoutes = require('./routes/staffRoutes');



// Lidhja me MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB u lidh me sukses"))
  .catch((err) => console.error("❌ Gabim në lidhje me MongoDB:", err));

// Inicializo Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Lidhja e rrugeve (routes)
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/staff', staffRoutes); 

// Lidhja me PostgreSQL
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


// Startimi i serverit
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
