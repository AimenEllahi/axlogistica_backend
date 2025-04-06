import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import ShipmentRoutes from "./routes/shipment.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


// Route for admin panel
app.use("/shipment", ShipmentRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("🚀 Logistics backend is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
