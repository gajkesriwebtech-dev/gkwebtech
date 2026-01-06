import express from "express";
import cors from "cors";
import "dotenv/config";
import contactRouter from "./api/contact.js";
import connectToDatabase from "./api/db.js";

const app = express();

// Middleware first
app.use(cors());
app.use(express.json());

// Mount router correctly
app.use("/api/contact", contactRouter);

// Health check
app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend is running" });
});

// Start server inside async function
async function startServer() {
  try {
    await connectToDatabase();
    console.log("MongoDB connected ✔");
  } catch (err) {
    console.log("MongoDB connection failed:", err.message);
  }

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT} 🚀`);
  });
}

startServer();
