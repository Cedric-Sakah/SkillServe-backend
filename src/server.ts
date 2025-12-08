import express from "express";
import cors from "cors";
import providerRoutes from "./Routes/providerRoutes";
const app = express();

const PORT = process.env.PORT || 4000;
import mongoose from "mongoose";



mongoose
  .connect("mongodb://localhost:27017/Skill-Serve-db")
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err);
  });


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
app.use("/api/providers", providerRoutes);


app.get("/api/hello", (req, res) => {
  res.json({
    message: "Backend connected successfully!",
  });
});


app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
