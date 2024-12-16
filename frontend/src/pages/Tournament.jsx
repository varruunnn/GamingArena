import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Tournament.css";

const Tournament = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("http://localhost:5000/tournaments");
        setGames(response.data);
      } catch (err) {
        console.error("Error fetching tournament data:", err);
        setError(err.message);
      }
    };
    fetchGames();
  }, []);

  if (error) {
    return <p>Error loading games: {error}</p>;
  }

  return (
    <section className="tournament">
      <div className="tournaments-container">
        <h1 className="tournaments-heading">The Games We Provide</h1>
        <p className="tournaments-subheading">Join the excitement and compete in our upcoming tournaments!</p>
        <div className="games-grid">
          <div className="game-card" onClick={() => handleCardClick1('BGMI')}>
            <div className="bgmi-container">
              <img src="/bgmi.jpg" alt="BGMI" className="game-image" />
            </div>
            <div className="game-card-back">
              <p>Battle it out in BGMI</p>
            </div>
          </div>
          <div className="game-card" onClick={() => handleCardClick('Valorant')}>
            <div className="game-card-inner">
              <img src="/valorant.png" alt="Valorant" className="game-image" />
            </div>
            <div className="game-card-back">
              <p>Show your skills in Valorant</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tournament;
