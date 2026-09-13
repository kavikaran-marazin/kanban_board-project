import Board from "../models/Board.js";
import Column from "../models/Column.js";
import Task from "../models/Task.js";

// CREATE BOARD
export const createBoard = async (req, res) => {
  try {
    const { title, subtitle, owner, members } = req.body;

    const board = await Board.create({
      title: title || "New Project Board",
      subtitle: subtitle || "",
      owner: owner || undefined,
      members: members || (owner ? [owner] : []),
    });

    // Create standard default columns for the new board
    await Column.create([
      { title: "TO DO", board: board._id, position: 0 },
      { title: "DOING", board: board._id, position: 1 },
      { title: "COMPLETED", board: board._id, position: 2 },
    ]);

    const createdBoard = await Board.findById(board._id)
      .populate("owner", "name email avatar")
      .populate("members", "name email avatar");

    res.status(201).json(createdBoard || board);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL BOARDS
export const getBoards = async (req, res) => {
  try {
    const boards = await Board.find()
      .populate("owner", "name email avatar")
      .populate("members", "name email avatar");

    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ONE BOARD
export const getBoardById = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id)
      .populate("owner", "name email avatar")
      .populate("members", "name email avatar");

    if (!board) {
      return res.status(404).json({
        message: "Board not found",
      });
    }

    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE BOARD
export const updateBoard = async (req, res) => {
  try {
    const { title, subtitle, members } = req.body;

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (subtitle !== undefined) updateData.subtitle = subtitle;
    if (members !== undefined) updateData.members = members;

    const board = await Board.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      },
    )
      .populate("owner", "name email avatar")
      .populate("members", "name email avatar");

    if (!board) {
      return res.status(404).json({
        message: "Board not found",
      });
    }

    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE BOARD
export const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findByIdAndDelete(req.params.id);

    if (!board) {
      return res.status(404).json({
        message: "Board not found",
      });
    }

    await Column.deleteMany({ board: req.params.id });
    await Task.deleteMany({ board: req.params.id });

    res.status(200).json({
      message: "Board deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
