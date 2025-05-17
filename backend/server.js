const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const authRoutes = require('./routes/authRoutes'); // importimi në fillim

const app = express(); // krijohet app
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes); // përdorimi i app tani është i sigurt

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mira_task_manager",
  password: "postgres", // ndrysho nëse ke fjalëkalim tjetër
  port: 5432,
});

// Test endpoint
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.send(result.rows[0]);
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
