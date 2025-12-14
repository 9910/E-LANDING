const express = require('express');
const { programs, highlights, testimonials, homeContent, homeVideo } = require('../data/staticContent');

const router = express.Router();

const parsePositiveInt = (value) => {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed < 0) {
    return null;
  }
  return parsed;
};

router.get('/programs', (req, res) => {
  const limit = parsePositiveInt(req.query.limit);
  const skip = parsePositiveInt(req.query.skip) || 0;

  let data = programs.slice(skip);
  if (limit) {
    data = data.slice(0, limit);
  }

  return res.json(data);
});

router.get('/programs/:id', (req, res) => {
  const program = programs.find((item) => item._id === req.params.id);
  if (!program) {
    return res.status(404).json({ message: 'Program not found.' });
  }
  return res.json(program);
});

router.get('/highlights', (_req, res) => res.json(highlights));
router.get('/testimonials', (_req, res) => res.json(testimonials));
router.get('/home', (_req, res) => res.json(homeContent));
router.get('/home-video', (_req, res) => res.json(homeVideo));

module.exports = router;
