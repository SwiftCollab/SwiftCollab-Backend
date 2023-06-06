const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    assignedToTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team"
    },
    status: {
      type: String,
      enum: ["in-progress", "completed"],
      default: "in-progress"
    },
    type: {
      type: String,
      enum: ["forecast", "real"],
      required: true
    }
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;