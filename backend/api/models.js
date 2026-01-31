import mongoose from "mongoose";

// Lead Schema (Contact Form)
const LeadSchema = new mongoose.Schema({
  // ---- Client Info ----
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String },
  country: { type: String },

  // ---- Language & Locale ----
  language: { type: String, enum: ['en', 'nl', 'de'], default: 'en' },

  // ---- Lead Type ----
  type: {
    type: String,
    enum: ['landing', 'pricing-prebuilt', 'pricing-custom'],
    default: 'landing'
  },

  // ---- Source ----
  source: {
    type: String,
    enum: ['contact_form', 'pricing_page', 'brochure_request'],
    required: true
  },

  originSite: { 
    type: String, 
    default: "gkwebtech" 
  },

  // ---- Landing Form Fields ----
  serviceInterested: { type: String },
  projectDetails: { type: String },

  // ---- Pricing Page (Prebuilt) ----
  selectedCategory: { type: String },
  selectedPlan: { type: String },
  duration: { type: String },
  currency: { type: String },
  priceShown: { type: String },

  // ---- Custom Builder / Advanced Pricing ----
  planType: { 
    type: String, 
    enum: ['prebuilt', 'custom', 'landing'], 
    default: 'landing' 
  },
  basePlan: {
    id: String,
    name: String,
    price: Number
  },
  includedServices: [{ type: String }],
  selectedAddons: [{
    id: String,
    name: String,
    price: Number,
    category: String
  }],
  addonsSubtotal: { type: Number },
  totalPrice: { type: Number },
  pricingFormulaString: { type: String },

  // ---- Custom Builder Legacy ----
  basePackage: { type: String },
  selectedServices: [{ type: String }],
  serviceConfigs: { type: mongoose.Schema.Types.Mixed },

  // ---- Add-ons & Notes ----
  addons: [{ type: String }],
  notes: { type: String },
  brochureRequested: { type: String },

  // ---- Sales Pipeline ----
  status: {
    type: String,
    enum: ['new', 'contacted', 'proposal-sent', 'closed'],
    default: 'new'
  },

  // ---- Email Tracking (future) ----
  proposalEmailSent: { type: Boolean, default: false },
  internalEmailSent: { type: Boolean, default: false },

  // ---- Meta ----
  page: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Brochure Schema
const BrochureSchema = new mongoose.Schema({
  serviceId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  filePath: { type: String, required: true }
});

// Project Schema
const ProjectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Slug ID for URL
  title: String,
  location: String,
  category: String,
  description: String,
  image: String,
  tags: [String],
  mediaStats: { 
    photos: Number, 
    videos: Number 
  },
  client: String,
  duration: String,
  challenge: String,
  solution: String,
  results: [String],
  testimonial: {
    text: String,
    author: String,
    role: String
  },
  gallery: [String],
  videos: [String]
});

// Team Member Schema
const TeamSchema = new mongoose.Schema({
  name: String,
  role: String,
  image: String,
  linkedin: String,
  github: String
});

// Testimonial Schema
const TestimonialSchema = new mongoose.Schema({
  text: String,
  name: String,
  role: String,
  rating: Number,
  image: String
});

// Prevent OverwriteModelError
const Lead = mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
const Brochure = mongoose.models.Brochure || mongoose.model('Brochure', BrochureSchema);
const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', TeamSchema);
const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);

export { Lead, Brochure, Project, TeamMember, Testimonial };
