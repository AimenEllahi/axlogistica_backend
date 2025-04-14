// routes/admin.js
import express from "express";
import {
  createShipment,
  getAllShipments,
  getShipmentById,
  updateShipment,
  deleteShipment,
  getShipmentForUser,
  getShipmentStats,
} from "../controller/shipment.js";

const router = express.Router();

// Shipment routes (admin-controlled)
router.post("/", createShipment);
router.get("/", getAllShipments);
router.get("/stats", getShipmentStats);
router.get("/user/:id", getShipmentForUser);
router.get("/:id", getShipmentById);
router.put("/:id", updateShipment);
router.delete("/:id", deleteShipment);

export default router;
