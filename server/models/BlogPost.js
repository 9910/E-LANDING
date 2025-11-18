const { Schema, model } = require('mongoose');

const blogPostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    excerpt: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      default: 'Admin'
    },
    publishedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = model('BlogPost', blogPostSchema);
