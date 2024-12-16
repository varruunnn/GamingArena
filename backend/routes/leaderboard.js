const express = require("express");
const Leaderboard = require("../models/Leaderboard");
const router = express.Router();

// Fetch leaderboard
router.get("/", async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ score: -1 });
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

// Add or update player/team score
router.post("/update", async (req, res) => {
  try {
    const { teamName, score } = req.body;

    let team = await Leaderboard.findOne({ teamName });
    if (team) {
      team.score += score;
    } else {
      team = new Leaderboard({ teamName, score });
    }

    await team.save();
    res.status(201).json({ message: "Score updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update leaderboard" });
  }
});

module.exports = router;
