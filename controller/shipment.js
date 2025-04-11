// controllers/shipment.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CREATE Shipment
export const createShipment = async (req, res) => {
  try {
    const data = req.body;
    const created = await prisma.shipment.create({ data });
    res.status(201).json(created);
  } catch (error) {
    console.error("Create Shipment Error:", error);
    res.status(500).json({ error: "Failed to create shipment" });
  }
};

// READ All Shipments
export const getAllShipments = async (req, res) => {
  try {
    console.log("Fetching all shipments...");
    const shipments = await prisma.shipment.findMany();
    res.json(shipments);
  } catch (error) {
    console.error("Fetch All Shipments Error:", error);
    res.status(500).json({ error: "Failed to fetch shipments" });
  }
};

// READ One Shipment by ID
export const getShipmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const shipment = await prisma.shipment.findUnique({
      where: { id },
    });

    if (!shipment) return res.status(404).json({ error: "Not found" });

    res.json(shipment);
  } catch (error) {
    console.error("Fetch Shipment by ID Error:", error);
    res.status(500).json({ error: "Failed to fetch shipment" });
  }
};

// UPDATE Shipment
export const updateShipment = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updated = await prisma.shipment.update({
      where: { id },
      data,
    });

    res.json(updated);
  } catch (error) {
    console.error("Update Shipment Error:", error);
    res.status(500).json({ error: "Failed to update shipment" });
  }
};

// DELETE Shipment
export const deleteShipment = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.shipment.delete({ where: { id } });
    res.json({ message: "Shipment deleted" });
  } catch (error) {
    console.error("Delete Shipment Error:", error);
    res.status(500).json({ error: "Failed to delete shipment" });
  }
};

// Get Shipment for User
export const getShipmentForUser = async (req, res) => {
  try {
    console.log("Fetching user shipments...");
    const { id } = req.params;
    const shipment = await prisma.shipment.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!shipment) return res.status(404).json({ error: "Not found" });

    res.json(shipment);
  } catch (error) {
    console.error("Fetch User Shipments Error:", error);
    res.status(500).json({ error: "Failed to fetch shipments" });
  }
};
