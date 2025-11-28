import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;


// Allow requests from Vite frontend
app.use(
  cors({
    origin: ["http://localhost:5173", "https://skill-serve-frontend.vercel.app"]

  })
);

app.use(express.json());

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
