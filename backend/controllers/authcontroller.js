import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Board from "../models/Board.js";
import Column from "../models/Column.js";
import Task from "../models/Task.js";

const JWT_SECRET = process.env.JWT_SECRET || "collabboard-secret-key";

// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    try {
      // Create initial board with columns & welcome tasks for the new user
      const defaultBoard = await Board.create({
        title: "Project Alpha",
        subtitle: "Sprint Planning & Execution",
        owner: user._id,
        members: [user._id],
      });

      const colTodo = await Column.create({ title: "TO DO", board: defaultBoard._id, position: 0 });
      const colDoing = await Column.create({ title: "DOING", board: defaultBoard._id, position: 1 });
      const colDone = await Column.create({ title: "COMPLETED", board: defaultBoard._id, position: 2 });

      await Task.create([
        {
          title: "Setup frontend & backend integration",
          description: "Connect React frontend with Express MongoDB REST API",
          priority: "high",
          dueDate: new Date(Date.now() + 86400000 * 2),
          board: defaultBoard._id,
          column: colDoing._id,
          assignees: [user._id],
          completed: false,
        },
        {
          title: "Review Kanban board layout",
          description: "Verify responsiveness, task editing, and status flow",
          priority: "medium",
          dueDate: new Date(Date.now() + 86400000 * 4),
          board: defaultBoard._id,
          column: colTodo._id,
          assignees: [user._id],
          completed: false,
        },
        {
          title: "Initialize workspace environment",
          description: "Configure MongoDB models, Express routes, and Vite client",
          priority: "low",
          dueDate: new Date(),
          board: defaultBoard._id,
          column: colDone._id,
          assignees: [user._id],
          completed: true,
        },
      ]);
    } catch (seedError) {
      console.warn("Notice: Initial board seed skipped:", seedError.message);
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};
