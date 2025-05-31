const express = require('express');
const router = express.Router();
const staffModel = require('../models/staffModel');

// GET - merr gjithë stafin
router.get('/', async (req, res) => {
  try {
    const staff = await staffModel.getAllStaff();
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Gabim gjatë marrjes së stafit.' });
  }
});

// POST - shto staf të ri
router.post('/', async (req, res) => {
  try {
    const { name, email, position } = req.body;
    const newStaff = await staffModel.createStaff({ name, email, position });
    res.status(201).json(newStaff);
  } catch (error) {
    res.status(500).json({ message: 'Gabim gjatë shtimit të stafit.' });
  }
});

// PUT - përditëso staf
router.put('/:id', async (req, res) => {
  try {
    const { name, email, position } = req.body;
    const updated = await staffModel.updateStaff(req.params.id, { name, email, position });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Gabim gjatë përditësimit të stafit.' });
  }
});

// DELETE - fshij staf
router.delete('/:id', async (req, res) => {
  try {
    await staffModel.deleteStaff(req.params.id);
    res.json({ message: 'Stafi u fshi me sukses.' });
  } catch (error) {
    res.status(500).json({ message: 'Gabim gjatë fshirjes së stafit.' });
  }
});

module.exports = router;
