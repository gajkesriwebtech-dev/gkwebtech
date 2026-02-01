import express from "express";
import bcrypt from "bcryptjs";
import connectToDatabase from "./db.js";
import { Lead } from "./models.js";
import { sendInternalLeadMail, sendClientConfirmationMail, transporter } from "./email.js";
import { calculatePricing } from "./pricing-calculator.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import rateLimit from "../middleware/rateLimiter.js";

const router = express.Router();

// GET /api/contact - Retrieve all leads (Admin usage)
router.get("/", protect, admin, async (req, res) => {
  try {
    await connectToDatabase();
    const leads = await Lead.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch leads",
      error: error.message
    });
  }
});

// DELETE /api/contact/:id - Delete a specific lead (Admin usage)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    await connectToDatabase();
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found"
      });
    }

    await lead.deleteOne();

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
      id: req.params.id
    });
  } catch (error) {
    console.error("Error deleting lead:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete lead",
      error: error.message
    });
  }
});

// POST /api/contact/send-otp - Send OTP for bulk delete (Admin usage)
router.post("/send-otp", protect, admin, rateLimit({ windowMs: 15 * 60 * 1000, max: 3 }), async (req, res) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Hash OTP before storing
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(otp, salt);

    // Store OTP hash in a temporary way
    global.deleteOtp = {
      hash: hash,
      expires: Date.now() + 5 * 60 * 1000 // 5 minutes
    };

    console.log(`AUDIT: OTP generated for admin deletion - IP: ${req.ip}`);

    // Send email with OTP
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL, // Send to configured admin email
      subject: "🚨 Urgent: Delete All Leads OTP",
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Admin Action Verification</h2>
          <p>You have requested to <strong>DELETE ALL LEADS</strong>.</p>
          <p>This action cannot be undone.</p>
          <p>Your OTP is:</p>
          <h1 style="background: #eee; padding: 10px; display: inline-block; letter-spacing: 5px;">${otp}</h1>
          <p>This OTP is valid for 5 minutes.</p>
        </div>
      `
    });

    res.status(200).json({
      success: true,
      message: "OTP sent to admin email"
    });

  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
      error: error.message
    });
  }
});

// DELETE /api/contact/delete-all - Delete all leads with OTP (Admin usage)
router.delete("/delete-all", protect, admin, async (req, res) => {
  try {
    const { otp } = req.body;

    if (!otp) {
      return res.status(400).json({ success: false, message: "OTP is required" });
    }

    // Check if OTP exists and is valid
    if (!global.deleteOtp) {
        return res.status(400).json({ success: false, message: "OTP not requested or expired" });
    }

    if (Date.now() > global.deleteOtp.expires) {
      delete global.deleteOtp;
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    // Verify OTP hash
    const isMatch = bcrypt.compareSync(otp, global.deleteOtp.hash);
    if (!isMatch) {
        console.warn(`AUDIT: Invalid OTP attempt for delete-all - IP: ${req.ip}`);
        return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // OTP is valid, proceed with deletion
    console.log(`AUDIT: Executing DELETE ALL LEADS - IP: ${req.ip}`);
    
    // Ensure DB connection
    const db = await connectToDatabase();
    
    // Use try-catch specifically for DB operation
    try {
        const result = await Lead.deleteMany({});
        
        // Clear OTP
        delete global.deleteOtp;

        console.log(`AUDIT: SUCCESS DELETE ALL LEADS - Count: ${result.deletedCount}`);

        res.status(200).json({
          success: true,
          message: "All leads deleted successfully",
          count: result.deletedCount
        });
    } catch (dbError) {
        console.error("Database error during delete-all:", dbError);
        // Do not re-throw, handle here to avoid generic 500 without details
        return res.status(500).json({
          success: false,
          message: "Database error during deletion",
          error: dbError.message
        });
    }

  } catch (error) {
    console.error("Error deleting all leads:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete leads",
      error: error.message
    });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log("📩 Incoming lead data:", req.body);
    await connectToDatabase();

    // Calculate Server-Side Pricing
    const pricingDetails = calculatePricing(req.body);
    console.log("💰 Calculated Pricing:", JSON.stringify(pricingDetails, null, 2));

    const { 
      name, 
      email, 
      phone, 
      company, 
      country, 
      language, 

      type, 
      source, 
      originSite,

      serviceInterested, 
      projectDetails, 
      service, // backward compatibility
      details, // backward compatibility

      selectedCategory, 
      selectedPlan, 
      duration, 
      currency, 
      priceShown, 

      basePackage, 
      selectedServices, 
      serviceConfigs, 
      addons, 
      notes, 

      page 
    } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and phone are required",
      });
    }

    const validSources = ['contact_form', 'pricing_page', 'brochure_request'];
    const sanitizedSource = validSources.includes(source) ? source : 'contact_form';
    console.log(`Source sanitized: '${source}' -> '${sanitizedSource}'`);

    const newLead = new Lead({
      name,
      email,
      phone,
      company,
      country,
      language: language || 'en',

      type: type || 'landing',
      source: sanitizedSource,
      originSite: originSite || "gkwebtech",

      serviceInterested: serviceInterested || service || null,
      projectDetails: projectDetails || details || null,

      selectedCategory,
      selectedPlan,
      duration,
      currency: pricingDetails.currency, // Ensure currency matches calc
      priceShown: (pricingDetails.planType === 'custom' || !priceShown) 
        ? `${pricingDetails.currency === 'EUR' ? '€' : pricingDetails.currency === 'USD' ? '$' : '₹'}${pricingDetails.totalPrice}` 
        : priceShown,

      // ---- New Pricing Fields ----
      planType: pricingDetails.planType,
      basePlan: pricingDetails.basePlan,
      includedServices: pricingDetails.includedServices,
      selectedAddons: pricingDetails.selectedAddons,
      addonsSubtotal: pricingDetails.addonsSubtotal,
      totalPrice: pricingDetails.totalPrice,
      pricingFormulaString: pricingDetails.pricingFormulaString,
      // ----------------------------

      basePackage,
      selectedServices,
      serviceConfigs,
      addons,
      notes,

      page,
      createdAt: new Date()
    });

    await newLead.save();

    let internalSent = false;
    let clientSent = false;

    try {
      await sendInternalLeadMail(newLead);
      internalSent = true;

      await sendClientConfirmationMail(newLead);
      clientSent = true;
    } catch (mailErr) {
      console.error("📧 Email sending failed:", mailErr.message);
    }

    await Lead.findByIdAndUpdate(newLead._id, {
      internalEmailSent: internalSent,
      proposalEmailSent: clientSent,
    });

    return res.status(200).json({
      success: true,
      message: "Lead captured successfully",
    });

  } catch (error) {
    console.error("🔥 Lead API Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while saving lead",
    });
  }
});

export default router;
