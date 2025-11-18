const { Schema, model } = require('mongoose');

const statSchema = new Schema(
  {
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

module.exports = model('Stat', statSchema);
