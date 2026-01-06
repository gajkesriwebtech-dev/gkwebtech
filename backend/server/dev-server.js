import dotenv from "dotenv";
dotenv.config({ path: "../.env.local" });

// @ts-ignore
import express from "express";
import cors from "cors";

import contactRouter from "../api/contact.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", contactRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`✅ Dev backend running at http://localhost:${PORT}`);
});
