const express = require("express");
const Tournament = require("../models/Tournament");
const router = express.Router();

// Fetch all tournaments
router.get("/", async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.json(tournaments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tournaments" });
  }
});

// Register a team for a tournament
router.post("/register", async (req, res) => {
  try {
    const { teamName, tournamentId } = req.body;

    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }

    tournament.teams.push(teamName);
    await tournament.save();

    res.status(201).json({ message: "Team registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to register team" });
  }
});

module.exports = router;
