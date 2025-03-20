import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // Logging

// Sample route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Define Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
