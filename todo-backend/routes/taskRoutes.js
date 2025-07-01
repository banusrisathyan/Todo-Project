const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const verifyToken = require("../middleware/verifyToken");
const mongoose = require("mongoose");

router.get("/all", async (req, res) => {
  try {
    console.log("👉 Route hit: /api/tasks/all");
    const tasks = await Task.find();
    console.log("✅ Tasks found:", tasks);
    res.json(tasks);
  } catch (err) {
    console.error("❌ Error fetching tasks:", err.message, err.stack);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Get all tasks of logged-in user
router.get("/", verifyToken, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
});

// Create a new task
router.post("/", verifyToken, async (req, res) => {
  const newTask = await Task.create({
    userId: req.user.id,
    text: req.body.text,
    status: req.body.status || "pending",
    sharedWith: req.body.sharedWith || [],
  });
  res.json(newTask);
});

// Update a task
router.put("/:id", verifyToken, async (req, res) => {
  const updated = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(updated);
});

// Delete a task
router.delete("/:id", verifyToken, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ success: true });
});

module.exports = router;
