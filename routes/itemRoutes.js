import express from "express";

import {
  getAllItems,
  createItem,
  getItemById,
  updateItem,
  deleteItem
} from "../controllers/itemControllers.js";

const router = express.Router();

router.get("/", getAllItems);
router.post("/", createItem);
router.get("/:id", getItemById);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;