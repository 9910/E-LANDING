const { Schema, model } = require('mongoose');

const programSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, trim: true }
  },
  { timestamps: true }
);

module.exports = model('Program', programSchema);
