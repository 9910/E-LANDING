const mongoose = require('mongoose');

const HomeContentSchema = new mongoose.Schema(
  {
    headline: { type: String, required: true },
    subheadline: { type: String, required: true },
    primaryCtaLabel: { type: String, required: true },
    secondaryCtaLabel: { type: String, required: true },
    heroImage: { type: String, required: false },
    heroImages: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('HomeContent', HomeContentSchema);
