import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getRecordById = async (req, res) => {
  try {
    const { operationNo } = req.params;

    if (!operationNo) {
      return res.status(400).json({ error: "Operation number is required" });
    }

    const operation = await prisma.clientOperation.findUnique({
      where: { operationNo },
    });

    if (!operation) {
      return res.status(404).json({ error: "Operation not found" });
    }

    res.json(operation);
  } catch (error) {
    console.error("Error fetching client operation:", error);
    res.status(500).json({ error: "Server error" });
  }
};
