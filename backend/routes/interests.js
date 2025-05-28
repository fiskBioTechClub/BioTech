const express = require('express');
const router = express.Router();
const Interest = require('../models/Interest');

router.post('/', async (req, res) => {
  try {
    const newInterest = new Interest(req.body);
    await newInterest.save();
    res.status(201).json(newInterest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
