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
router.post("/", createShipment);
router.get("/", getAllShipments);
router.get("/:id", getShipmentById);
router.put("/:id", updateShipment);
router.delete("/:id", deleteShipment);
router.get("/user/:id", getShipmentForUser);

export default router;
