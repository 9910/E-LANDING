const { Schema, model } = require('mongoose');

const testimonialSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    quote: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = model('Testimonial', testimonialSchema);
