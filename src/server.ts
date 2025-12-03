import express from "express";
import cors from "cors";
import { connect } from "bun";
import providerRoutes from './Routes/providerRoutes';
const app = express();
const PORT = process.env.PORT || 4000;
import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/skill-Serve-db")
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err);
  });

// Allow requests from Vite frontend
app.use(
  cors({
    origin: ["http://localhost:5173", "https://skill-serve-frontend.vercel.app"]

  })
);

app.use(express.json());
app.use("/api/providers", providerRoutes);

// Only ONE endpoint → matches frontend axios request
app.get("/api/hello", (req, res) => {
  res.json({
    message: "Backend connected successfully!"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
