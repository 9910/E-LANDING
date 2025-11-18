const express = require('express');
const Lead = require('../models/Lead');

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, phone, courseInterest, message } = req.body;

  if (!name || !email || !phone || !courseInterest) {
    return res.status(400).json({ message: 'Please provide name, email, phone, and course interest.' });
  }

  try {
    const lead = await Lead.create({ name, email, phone, courseInterest, message });
    return res.status(201).json({ message: 'Lead submitted successfully.', data: lead });
  } catch (error) {
    console.error('Lead submission error:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
