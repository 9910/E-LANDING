const express = require('express');
const { blogs } = require('../data/staticContent');

const router = express.Router();

router.get('/seed', (_req, res) => res.json({ message: 'Blog collection is hardcoded; no seeding required.' }));

router.get('/', (_req, res) => {
  const sorted = blogs.slice().sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  return res.json(sorted);
});

router.get('/:id', (req, res) => {
  const blog = blogs.find((item) => item._id === req.params.id);
  if (!blog) {
    return res.status(404).json({ message: 'Blog not found.' });
  }
  return res.json(blog);
});

module.exports = router;
