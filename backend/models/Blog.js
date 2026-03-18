import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  slug: { type: String, required: true },
  language: { type: String, enum: ["en", "nl", "de"], required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  excerpt: { type: String, required: true },
  author: { type: String, required: true },
  readTime: { type: String, required: true },
  tags: { type: [String], default: [] },
  content: { type: String, required: true },
  metaTitle: { type: String },
  metaDescription: { type: String },
  primaryKeyword: { type: String }, // For internal linking matching
  createdAt: { type: Date, default: Date.now },
}, {
  timestamps: true,
  collection: 'blogs'
});

// Ensure slug + language combination is unique
blogSchema.index({ slug: 1, language: 1 }, { unique: true });

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
