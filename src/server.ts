import express from "express";
import cors from "cors";
import providerRoutes from "./Routes/providerRoutes";
const app = express();
// Port configurable via environment, falling back to 4000 for local development
const PORT = process.env.PORT || 4000;
import mongoose from "mongoose";

// Connect to local MongoDB. In production, consider using a connection
// string from environment variables and adding retry/backoff logic.
mongoose
  .connect("mongodb://localhost:27017/Skill-Serve-db")
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err);
  });

// Configure CORS to allow requests from the frontend origins used
// during development and from the deployed frontend.
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://skill-serve-frontend.vercel.app",
    ],
  })
);

// Built-in body parser for JSON requests
app.use(express.json());

// Mount provider routes under `/api/providers`.
// Example: POST /api/providers/ will create a provider.
app.use("/api/providers", providerRoutes);

// Simple health / connectivity endpoint used by the frontend to verify
// the backend is reachable. Keep lightweight and stable.
app.get("/api/hello", (req, res) => {
  res.json({
    message: "Backend connected successfully!",
  });
});

// Start the HTTP server and listen on configured port.
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
