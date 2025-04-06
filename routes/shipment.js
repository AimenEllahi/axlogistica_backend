// routes/admin.js
import express from "express";
import {
  createShipment,
  getAllShipments,
  getShipmentById,
  updateShipment,
  deleteShipment,
  getShipmentForUser,
} from "../controller/shipment.js";

const router = express.Router();

// Shipment routes (admin-controlled)
router.post("/shipments", createShipment);
router.get("/shipments", getAllShipments);
router.get("/shipments/:id", getShipmentById);
router.put("/shipments/:id", updateShipment);
router.delete("/shipments/:id", deleteShipment);
router.get("/shipments/user/:id", getShipmentForUser);

export default router;
