import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import boardRoutes from "./routes/boardroute.js";
import columnRoutes from "./routes/columnroute.js";
import taskRoutes from "./routes/taskroute.js";
import authRoutes from "./routes/authroutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection for Vercel/serverless
let dbConnected = false;

const ensureDB = async () => {
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }
};

// Connect to MongoDB before handling API requests
app.use(async (req, res, next) => {
  try {
    await ensureDB();
    next();
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(500).json({
      message: "Database connection failed",
      error: error.message,
    });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("CollabBoard API is running...");
});

// API routes
app.use("/api/boards", boardRoutes);
app.use("/api/columns", columnRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// Local development only
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export Express app for Vercel
export default app;
