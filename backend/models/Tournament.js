const mongoose = require("mongoose");

const TournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  game: { type: String, required: true },
  date: { type: Date, required: true },
  teams: { type: [String], default: [] },
});

module.exports = mongoose.model("Tournament", TournamentSchema);
