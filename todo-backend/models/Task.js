const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: { type: String, required: true },
  status: { type: String, default: "pending" },
  sharedWith: [{ type: String }],
});

module.exports = mongoose.model("Task", TaskSchema);
