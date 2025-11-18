const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const Program = require('../models/Program');
const Highlight = require('../models/Highlight');
const Stat = require('../models/Stat');
const Testimonial = require('../models/Testimonial');
const BlogPost = require('../models/BlogPost');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

const uploadsRoot = path.resolve(__dirname, '../uploads');
const programUploadsDir = path.join(uploadsRoot, 'programs');

if (!fs.existsSync(programUploadsDir)) {
  fs.mkdirSync(programUploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, programUploadsDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, '-').toLowerCase();
    cb(null, `${Date.now()}-${base}${ext}`);
  }
});

const upload = multer({ storage });

const collections = {
  programs: Program,
  highlights: Highlight,
  stats: Stat,
  testimonials: Testimonial,
  blogs: BlogPost
};

const getModel = (collection) => {
  const model = collections[collection];
  if (!model) {
    throw new Error('Invalid collection');
  }
  return model;
};

router.use(adminAuth);

router.post('/programs/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }
  const relativePath = `/uploads/programs/${req.file.filename}`;
  return res.json({ path: relativePath });
});

router.get('/:collection', async (req, res) => {
  try {
    const Model = getModel(req.params.collection);
    const records = await Model.find().sort({ createdAt: -1 });
    return res.json(records);
  } catch (error) {
    if (error.message === 'Invalid collection') {
      return res.status(400).json({ message: 'Unknown collection.' });
    }
    console.error('Admin fetch error:', error);
    return res.status(500).json({ message: 'Server error fetching data.' });
  }
});

router.post('/:collection', async (req, res) => {
  try {
    const Model = getModel(req.params.collection);
    const record = await Model.create(req.body);
    return res.status(201).json(record);
  } catch (error) {
    if (error.message === 'Invalid collection') {
      return res.status(400).json({ message: 'Unknown collection.' });
    }
    console.error('Admin create error:', error);
    return res.status(500).json({ message: 'Server error creating record.' });
  }
});

router.put('/:collection/:id', async (req, res) => {
  try {
    const Model = getModel(req.params.collection);
    const updated = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) {
      return res.status(404).json({ message: 'Record not found.' });
    }
    return res.json(updated);
  } catch (error) {
    if (error.message === 'Invalid collection') {
      return res.status(400).json({ message: 'Unknown collection.' });
    }
    console.error('Admin update error:', error);
    return res.status(500).json({ message: 'Server error updating record.' });
  }
});

router.delete('/:collection/:id', async (req, res) => {
  try {
    const Model = getModel(req.params.collection);
    const deleted = await Model.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Record not found.' });
    }
    return res.json({ message: 'Record deleted.' });
  } catch (error) {
    if (error.message === 'Invalid collection') {
      return res.status(400).json({ message: 'Unknown collection.' });
    }
    console.error('Admin delete error:', error);
    return res.status(500).json({ message: 'Server error deleting record.' });
  }
});

module.exports = router;
