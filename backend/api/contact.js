import express from "express";
import connectToDatabase from "./db.js";
import { Lead } from "./models.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("📩 Incoming form data:", req.body);
    await connectToDatabase();

    const { name, email, phone, service, details } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and phone are required",
      });
    }

    const newLead = new Lead({
      name,
      email,
      phone,
      serviceInterested: service || null,
      projectDetails: details || null,
      source: "contact_form",
      createdAt: new Date(),
    });

    await newLead.save();

    return res.status(200).json({
      success: true,
      message: "Form submitted successfully!",
    });
  } catch (error) {
    console.error("🔥 Contact API Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while saving lead",
    });
  }
});

export default router;
