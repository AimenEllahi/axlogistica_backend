import express from "express";
import { getRecordById } from "../controller/client.js";

const router = express.Router();

router.get("/:operationNo", getRecordById);

export default router;
