const Team = require("../models/team");

// Create a new team
exports.createTeam = async (req, res, next) => {
  try {
    const { name, moderator, members } = req.body;
    const team = new Team({
      name,
      createdBy: req.user._id,
      moderator,
      members,
    });
    const savedTeam = await team.save();
    res.status(201).json(savedTeam);
  } catch (err) {
    next(err);
  }
};

// Get all teams
exports.getTeams = async (req, res, next) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (err) {
    next(err);
  }
};

// Get a team by ID
exports.getTeamById = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.json(team);
  } catch (err) {
    next(err);
  }
};

// Update a team
exports.updateTeam = async (req, res, next) => {
  try {
    const { name, moderator, members } = req.body;
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      {
        name,
        moderator,
        members,
      },
      { new: true }
    );
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.json(team);
  } catch (err) {
    next(err);
  }
};

// Delete a team
exports.deleteTeam = async (req, res, next) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.json({ message: "Team deleted" });
  } catch (err) {
    next(err);
  }
};
