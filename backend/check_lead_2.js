import mongoose from "mongoose";
import { Lead } from "./api/models.js";
import connectToDatabase from "./api/db.js";

async function check() {
  try {
    await connectToDatabase();
    const lead = await Lead.findOne({ email: 'origin2@test.com' }).sort({ createdAt: -1 });
    console.log("Latest Lead:", JSON.stringify(lead, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}
check();