const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");

dotenv.config();

const app = express(); // ✅ Define app before using it

// Middleware
app.use(cors({
  origin: [
    "http://localhost:3000",                                // local dev
    "https://todo-project-tau-one.vercel.app"               // ✅ production frontend
  ],
  credentials: true
}));
app.use(express.json());
app.use(passport.initialize()); // ✅ Use passport middleware after app is defined

// MongoDB connection
console.log("🔍 MONGO_URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
