import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import contactRouter from "./api/contact.js";
import authRouter from "./api/auth.js";
import connectToDatabase from "./api/db.js";

const app = express();

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://gkwebtech.cloud",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
app.use(express.json());
app.use(cookieParser());

// Mount router
app.use("/api/admin", authRouter);
app.use("/api/contact", contactRouter);
app.use("/contact", contactRouter); // Legacy fallback

// Health check
app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend is running" });
});

async function startServer() {
  await connectToDatabase();

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
}

startServer();
