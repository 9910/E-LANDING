const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

connectDB();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadsPath));

app.use('/api/leads', require('./routes/leads'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/content', require('./routes/content'));
app.use('/api/admin', require('./routes/admin'));

if (process.env.NODE_ENV === 'production') {
  const clientPath = path.join(__dirname, '../client/dist');
  app.use(express.static(clientPath));

  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
