const { Schema, model } = require('mongoose');

const highlightSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    icon: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

module.exports = model('Highlight', highlightSchema);
