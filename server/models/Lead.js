const { Schema, model } = require('mongoose');

const leadSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    courseInterest: {
      type: String,
      required: true
    },
    message: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = model('Lead', leadSchema);
