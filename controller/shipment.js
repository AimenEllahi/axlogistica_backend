// controllers/shipment.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CREATE Shipment
export const createShipment = async (req, res) => {
  try {
    const data = req.body;
    console.log(data, "Creating shipment...");
    if (
      !data.operationNo ||
      !data.status ||
      !data.shipper ||
      !data.clientEmail ||
      !data.cnee ||
      !data.shipmentNumber ||
      !data.notify ||
      !data.terms ||
      !data.origin ||
      !data.destination ||
      !data.etd ||
      !data.eta ||
      !data.mode ||
      !data.type ||
      !data.operation ||
      !data.cargo
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const created = await prisma.shipment.create({
      data: {
        operationNo: data.operationNo,
        status: data.status,
        shipper: data.shipper,
        clientEmail: data.clientEmail,
        cnee: data.cnee,
        shipmentNumber: data.shipmentNumber,
        notify: data.notify,
        terms: data.terms,
        origin: data.origin,
        destination: data.destination,
        etd: data.etd,
        eta: data.eta,
        mode: data.mode,
        type: data.type,
        operation: data.operation,
        cargo: data.cargo,
        comments: data.comments,

        // Advanced
        weight: data.weight,
        dimensions: data.dimensions,
        declaredValue: data.declaredValue,
        carrier: data.carrier,
        serviceProvider: data.serviceProvider,
        specialInstructions: data.specialInstructions,

        // Admin
        fecha: data.fecha,
        costoFlete: data.costoFlete,
        costoGastoLocal: data.costoGastoLocal,
        ventaFlete: data.ventaFlete,
        ventaGastosLocales: data.ventaGastosLocales,
        profit: data.profit,
        money: data.money,
        vendedor: data.vendedor,
        commission: data.commission,
        transactionCode: data.transactionCode,
        fechaPago: data.fechaPago,

        documents: data.documents,
      },
    });
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
    console.log("Fetching shipment by ID...");
    const { id } = req.params;
    const shipment = await prisma.shipment.findUnique({
      where: {
        operationNo: id,
      },
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
      where: {
        operationNo: id,
      },
    });

    if (!shipment) return res.status(404).json({ error: "Not found" });

    res.json(shipment);
  } catch (error) {
    console.error("Fetch User Shipments Error:", error);
    res.status(500).json({ error: "Failed to fetch shipments" });
  }
};

// GET Shipment Stats
export const getShipmentStats = async (req, res) => {
  try {
    console.log("Fetching shipment stats...");

    // Total shipments
    const totalShipments = await prisma.shipment.count();

    // Active shipments (adjust 'active' according to your actual active status value)
    const totalActiveShipments = await prisma.shipment.count({
      where: {
        status: {
          not: "delivered", //  excludes delivered
        },
      },
    });

    // Previous 5 shipments (latest first)
    const recentShipments = await prisma.shipment.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        status: true,
        operationNo: true,
        createdAt: true,
      },
    });

    res.json({
      totalShipments,
      totalActiveShipments,
      recentShipments,
    });
  } catch (error) {
    console.error("Fetch Shipment Stats Error:", error);
    res.status(500).json({ error: "Failed to fetch shipment stats" });
  }
};
