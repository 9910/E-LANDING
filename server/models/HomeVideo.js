const mongoose = require('mongoose');

const HomeVideoSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('HomeVideo', HomeVideoSchema);
