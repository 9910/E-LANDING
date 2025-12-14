const express = require('express');

const router = express.Router();

const capturedLeads = [];

router.post('/', (req, res) => {
  const { name, email, phone, courseInterest, message } = req.body;

  if (!name || !email || !phone || !courseInterest) {
    return res.status(400).json({ message: 'Please provide name, email, phone, and course interest.' });
  }

  const lead = {
    _id: `lead-${Date.now()}`,
    name,
    email,
    phone,
    courseInterest,
    message,
    receivedAt: new Date().toISOString()
  };

  capturedLeads.push(lead);
  return res.status(201).json({ message: 'Lead submitted successfully.', data: lead });
});

module.exports = router;
