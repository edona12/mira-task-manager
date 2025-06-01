
// const express = require('express');
// const router = express.Router();
// const staffModel = require('../models/staffModel');
// const { createStaff } = require('../controllers/staffController'); // importo controller-in e ri

// // GET - merr gjithë stafin
// router.get('/', async (req, res) => {
//   try {
//     const staff = await staffModel.getAllStaff();
//     res.json(staff);
//   } catch (error) {
//     res.status(500).json({ message: 'Gabim gjatë marrjes së stafit.' });
//   }
// });

// // POST - shto staf të ri (me ruajtje edhe në users)
// router.post('/', createStaff);

// // PUT - përditëso staf
// router.put('/:id', async (req, res) => {
//   try {
//     const { name, email, position } = req.body;
//     const updated = await staffModel.updateStaff(req.params.id, { name, email, position });
//     res.json(updated);
//   } catch (error) {
//     res.status(500).json({ message: 'Gabim gjatë përditësimit të stafit.' });
//   }
// });

// // DELETE - fshij staf
// router.delete('/:id', async (req, res) => {
//   try {
//     await staffModel.deleteStaff(req.params.id);
//     res.json({ message: 'Stafi u fshi me sukses.' });
//   } catch (error) {
//     res.status(500).json({ message: 'Gabim gjatë fshirjes së stafit.' });
//   }
// });

// // POST - login për staf
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const result = await staffModel.loginStaff(email, password);

//     if (!result) {
//       return res.status(401).json({ message: 'Email ose fjalëkalim i pasaktë' });
//     }

//     res.json({
//       token: 'fake-token-staff', // ndërron me JWT nëse do më vonë
//       name: result.name,
//       role: 'staff'
//     });
//   } catch (error) {
//     console.error('Gabim gjatë login:', error);
//     res.status(500).json({ message: 'Gabim i brendshëm në server' });
//   }
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const staffModel = require('../models/staffModel');
// const { createStaff } = require('../controllers/staffController');
// const verifyToken = require('../middleware/verifyToken');
// const pool = require('../config/db');

// // GET - merr gjithë stafin nga tabela staff
// router.get('/', verifyToken, async (req, res) => {
//   try {
//     const staff = await staffModel.getAllStaff();
//     res.json(staff);
//   } catch (error) {
//     console.error("❌ Gabim gjatë marrjes së stafit:", error);
//     res.status(500).json({ message: 'Gabim gjatë marrjes së stafit.' });
//   }
// });

// // POST - shton staf të ri (shton në 'staff' dhe në 'users')
// router.post('/', verifyToken, createStaff);

// // PUT - përditëso staf
// router.put('/:id', verifyToken, async (req, res) => {
//   try {
//     const { name, email, position } = req.body;
//     const updated = await staffModel.updateStaff(req.params.id, { name, email, position });
//     res.json(updated);
//   } catch (error) {
//     console.error("❌ Gabim gjatë përditësimit të stafit:", error);
//     res.status(500).json({ message: 'Gabim gjatë përditësimit të stafit.' });
//   }
// });

// // DELETE - fshij staf
// router.delete('/:id', verifyToken, async (req, res) => {
//   try {
//     await staffModel.deleteStaff(req.params.id);
//     res.json({ message: 'Stafi u fshi me sukses.' });
//   } catch (error) {
//     console.error("❌ Gabim gjatë fshirjes së stafit:", error);
//     res.status(500).json({ message: 'Gabim gjatë fshirjes së stafit.' });
//   }
// });

// // POST - login për staf
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const result = await staffModel.loginStaff(email, password);

//     if (!result) {
//       return res.status(401).json({ message: 'Email ose fjalëkalim i pasaktë' });
//     }

//     res.json({
//       token: 'fake-token-staff', // këtë zëvendëso me JWT nëse më vonë implementon
//       name: result.name,
//       role: 'staff'
//     });
//   } catch (error) {
//     console.error('❌ Gabim gjatë login:', error);
//     res.status(500).json({ message: 'Gabim i brendshëm në server' });
//   }
// });

// // GET /api/staff/users-only - merr vetëm userët me rol 'staff' nga tabela 'users'
// router.get('/users-only', verifyToken, async (req, res) => {
//   try {
//     const result = await pool.query("SELECT id, name FROM users WHERE role = 'staff'");
//     res.json(result.rows);
//   } catch (err) {
//     console.error("❌ Gabim gjatë marrjes së userëve staff:", err);
//     res.status(500).json({ message: 'Gabim gjatë marrjes së stafit nga users.' });
//   }
// });

// module.exports = router;




const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const staffModel = require('../models/staffModel');
const { createStaff } = require('../controllers/staffController');
const verifyToken = require('../middleware/verifyToken');
const pool = require('../config/db');

// GET - merr gjithë stafin nga tabela staff
router.get('/', verifyToken, async (req, res) => {
  try {
    const staff = await staffModel.getAllStaff();
    res.json(staff);
  } catch (error) {
    console.error("❌ Gabim gjatë marrjes së stafit:", error);
    res.status(500).json({ message: 'Gabim gjatë marrjes së stafit.' });
  }
});

// POST - shton staf të ri (shton në 'staff' dhe në 'users')
router.post('/', verifyToken, createStaff);

// PUT - përditëso staf
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { name, email, position } = req.body;
    const updated = await staffModel.updateStaff(req.params.id, { name, email, position });
    res.json(updated);
  } catch (error) {
    console.error("❌ Gabim gjatë përditësimit të stafit:", error);
    res.status(500).json({ message: 'Gabim gjatë përditësimit të stafit.' });
  }
});

// DELETE - fshij staf
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await staffModel.deleteStaff(req.params.id);
    res.json({ message: 'Stafi u fshi me sukses.' });
  } catch (error) {
    console.error("❌ Gabim gjatë fshirjes së stafit:", error);
    res.status(500).json({ message: 'Gabim gjatë fshirjes së stafit.' });
  }
});

// POST - login për staf me JWT
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await staffModel.loginStaff(email, password);

    if (!result) {
      return res.status(401).json({ message: 'Email ose fjalëkalim i pasaktë' });
    }

    const token = jwt.sign(
      { id: result.id, role: 'staff', name: result.name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      name: result.name,
      role: 'staff'
    });
  } catch (error) {
    console.error('❌ Gabim gjatë login:', error);
    res.status(500).json({ message: 'Gabim i brendshëm në server' });
  }
});

// GET /api/staff/users-only - merr vetëm userët me rol 'staff' nga tabela 'users'
router.get('/users-only', verifyToken, async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name FROM users WHERE role = 'staff'");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Gabim gjatë marrjes së userëve staff:", err);
    res.status(500).json({ message: 'Gabim gjatë marrjes së stafit nga users.' });
  }
});

module.exports = router;
