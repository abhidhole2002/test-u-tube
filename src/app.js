const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running and DB is connected!");
});

module.exports = app;
