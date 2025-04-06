import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Route for client panel
app.use("/client", clientRoutes);
app.use("/admin", adminRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("🚀 Logistics backend is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
