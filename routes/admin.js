// routes/admin.js
import express from "express";
import {
  createRecord,
  getAllRecords,
  getRecordById,
  deleteRecord,
  updateRecord,
} from "../controller/admin.js";
import {
  createShipment,
  getAllShipments,
  getShipmentById,
  updateShipment,
  deleteShipment,
} from "../controller/shipment.js";

const router = express.Router();

// AdminOperation routes
router.post("/operations", createRecord); // Create
router.get("/operations", getAllRecords); // Read all
router.get("/operations/:id", getRecordById); // Read by ID
router.put("/operations/:id", updateRecord); // Update
router.delete("/operations/:id", deleteRecord); // Delete

// Shipment routes (admin-controlled)
router.post("/shipments", createShipment);
router.get("/shipments", getAllShipments);
router.get("/shipments/:id", getShipmentById);
router.put("/shipments/:id", updateShipment);
router.delete("/shipments/:id", deleteShipment);

export default router;
