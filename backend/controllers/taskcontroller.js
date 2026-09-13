import Task from "../models/Task.js";

// CREATE TASK
export const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, board, column, assignees } =
      req.body;

    let task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      board,
      column,
      assignees,
    });

    task = await Task.findById(task._id)
      .populate("column", "title position")
      .populate("assignees", "name email avatar");

    res.status(201).json(task);
  } catch (error) {
    console.error("CREATE TASK ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL TASKS FOR A BOARD
export const getTasksByBoard = async (req, res) => {
  try {
    const tasks = await Task.find({
      board: req.params.boardId,
    })
      .populate("column", "title position")
      .populate("assignees", "name email avatar");

    res.status(200).json(tasks);
  } catch (error) {
    console.error("GET TASKS ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET TASKS FOR ONE COLUMN
export const getTasksByColumn = async (req, res) => {
  try {
    const tasks = await Task.find({
      column: req.params.columnId,
    })
      .populate("column", "title position")
      .populate("assignees", "name email avatar");

    res.status(200).json(tasks);
  } catch (error) {
    console.error("GET COLUMN TASKS ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE TASK
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("column", "title position")
      .populate("assignees", "name email avatar");

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("UPDATE TASK ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE TASK
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("DELETE TASK ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};
