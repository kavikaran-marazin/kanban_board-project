import express from "express";

import {
  createTask,
  getTasksByBoard,
  getTasksByColumn,
  updateTask,
  deleteTask,
} from "../controllers/taskcontroller.js";

const router = express.Router();

router.post("/", createTask);

router.get("/board/:boardId", getTasksByBoard);

router.get("/column/:columnId", getTasksByColumn);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

export default router;
