import Column from "../models/Column.js";
import Task from "../models/Task.js";

// CREATE COLUMN
export const createColumn = async (req, res) => {
  try {
    const { title, board, position } = req.body;

    
const column = await Column.create({
  title,
  board,
  position
});

res.status(201).json(column);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL COLUMNS FOR A BOARD
export const getColumnsByBoard = async (req, res) => {
  try {
    let columns = await Column.find({
      board: req.params.boardId,
    }).sort({
      position: 1,
    });

    // If board has no columns yet, create real TO DO, DOING, COMPLETED columns
    if (!columns || columns.length === 0) {
      columns = await Column.create([
        { title: "TO DO", board: req.params.boardId, position: 0 },
        { title: "DOING", board: req.params.boardId, position: 1 },
        { title: "COMPLETED", board: req.params.boardId, position: 2 },
      ]);
    }

    res.status(200).json(columns);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE COLUMN
export const updateColumn = async (req, res) => {
  try {
    const { title, position } = req.body;


const column = await Column.findByIdAndUpdate(
  req.params.id,
  {
    title,
    position
  },
  {
    new: true
  }
);

if (!column) {
  return res.status(404).json({
    message: "Column not found"
  });
}

res.status(200).json(column);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE COLUMN
export const deleteColumn = async (req, res) => {
  try {
    const column = await Column.findByIdAndDelete(req.params.id);

    if (!column) {
      return res.status(404).json({
        message: "Column not found",
      });
    }

    await Task.deleteMany({ column: req.params.id });

    res.status(200).json({
      message: "Column deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
