import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [game, setGame] = useState("Valorant");
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`https://gamingarena-swet.onrender.com/leaderboard/${game}`);
        setPlayers(response.data);
      } catch (err) {
        console.error("Error fetching leaderboard data:", err);
        setError(err.message);
      }
    };
    fetchLeaderboard();
  }, [game]);

  const handleSwap = () => {
    setGame((prevGame) => (prevGame === "Valorant" ? "BGMI" : "Valorant"));
  };

  if (error) {
    return <p>Error loading leaderboard: {error}</p>;
  }

  return (
    <div className="leaderboard-container">
      <h1>{game} Leaderboard</h1>
      <button className="swap-button" onClick={handleSwap}>
        Swap to {game === "Valorant" ? "BGMI" : "Valorant"}
      </button>
      {players.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.rank}>
                <td>{player.rank}</td>
                <td>{player.name}</td>
                <td>{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
