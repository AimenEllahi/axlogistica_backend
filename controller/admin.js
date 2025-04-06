import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// CREATE Admin Operation
export const createRecord = async (req, res) => {
  try {
    const data = req.body;

    if (!data || !data.operationNo) {
      return res.status(400).json({ error: "operationNo is required" });
    }

    const created = await prisma.adminOperation.create({ data });
    res.status(201).json(created);
  } catch (error) {
    console.error("Create Error:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to create admin operation" });
  }
};

// READ All Admin Operations
export const getAllRecords = async (req, res) => {
  try {
    const operations = await prisma.adminOperation.findMany();
    res.json(operations);
  } catch (error) {
    console.error("Fetch Error:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to fetch operations" });
  }
};

// READ One Admin Operation
export const getRecordById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "ID is required" });

    const operation = await prisma.adminOperation.findUnique({ where: { id } });

    if (!operation) return res.status(404).json({ error: "Not found" });

    res.json(operation);
  } catch (error) {
    console.error("Fetch by ID Error:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to fetch operation" });
  }
};

// UPDATE Admin Operation
export const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!id) return res.status(400).json({ error: "ID is required" });

    const updated = await prisma.adminOperation.update({
      where: { id },
      data,
    });

    res.json(updated);
  } catch (error) {
    console.error("Update Error:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to update operation" });
  }
};

// DELETE Admin Operation
export const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "ID is required" });

    await prisma.adminOperation.delete({ where: { id } });
    res.json({ message: "Operation deleted" });
  } catch (error) {
    console.error("Delete Error:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to delete operation" });
  }
};
