const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const adminAuth = require('../middleware/adminAuth');
const { programs, highlights, testimonials, blogs, homeContent, homeVideo } = require('../data/staticContent');

const router = express.Router();

const uploadsRoot = path.resolve(__dirname, '../uploads');
const programUploadsDir = path.join(uploadsRoot, 'programs');
const homeUploadsDir = path.join(uploadsRoot, 'home');

[programUploadsDir, homeUploadsDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

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

const homeStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, homeUploadsDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, '-').toLowerCase();
    cb(null, `${Date.now()}-${base}${ext}`);
  }
});

const uploadHome = multer({ storage: homeStorage });

const collections = {
  programs,
  highlights,
  testimonials,
  blogs,
  home: [homeContent],
  homeVideo: [homeVideo]
};

router.use(adminAuth);

router.post('/programs/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }
  const relativePath = `/uploads/programs/${req.file.filename}`;
  return res.json({ path: relativePath });
});

router.post('/home/upload', uploadHome.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }
  const relativePath = `/uploads/home/${req.file.filename}`;
  return res.json({ path: relativePath });
});

router.get('/:collection', (req, res) => {
  const data = collections[req.params.collection];
  if (!data) {
    return res.status(400).json({ message: 'Unknown collection.' });
  }
  return res.json(data);
});

router.post('/:collection', (_req, res) =>
  res.status(405).json({ message: 'Static content mode. Create operation is disabled.' })
);

router.put('/:collection/:id', (_req, res) =>
  res.status(405).json({ message: 'Static content mode. Update operation is disabled.' })
);

router.delete('/:collection/:id', (_req, res) =>
  res.status(405).json({ message: 'Static content mode. Delete operation is disabled.' })
);

module.exports = router;
