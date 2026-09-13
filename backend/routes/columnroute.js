import express from "express";

import {
  createColumn,
  getColumnsByBoard,
  updateColumn,
  deleteColumn,
} from "../controllers/columncontroller.js";

const router = express.Router();

// Create a column
router.post("/", createColumn);

// Get all columns for a board
router.get("/board/:boardId", getColumnsByBoard);

// Update a column
router.put("/:id", updateColumn);

// Delete a column
router.delete("/:id", deleteColumn);

export default router;
