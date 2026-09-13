import express from "express";

import {
  createBoard,
  getBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
} from "../controllers/boardcontroller.js";

const router = express.Router();

router.post("/", createBoard);

router.get("/", getBoards);

router.get("/:id", getBoardById);

router.put("/:id", updateBoard);

router.delete("/:id", deleteBoard);

export default router;
