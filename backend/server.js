import express from "express";
import cors from "cors";
import "dotenv/config";
import contactRouter from "./api/contact.js";
import connectToDatabase from "./api/db.js";

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  methods: ["GET", "POST", "OPTIONS"],
}));
app.use(express.json());

// Mount router
app.use("/api/contact", contactRouter);
app.use("/contact", contactRouter);

// Health check
app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend is running" });
});

async function startServer() {
  await connectToDatabase();

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
}

startServer();
