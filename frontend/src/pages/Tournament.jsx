import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaWhatsapp, FaDiscord } from "react-icons/fa"; // Import the WhatsApp and Discord icons
import "./Tournament.css";

const Tournament = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("https://gamingarena-swet.onrender.com/tournaments");
        setGames(response.data);
      } catch (err) {
        console.error("Error fetching tournament data:", err);
        setError(err.message);
      }
    };
    fetchGames();
  }, []);

  const handleRegisterBGMI = () => {
    navigate("/register/bgmi");
  };

  const handleRegisterValorant = () => {
    navigate("/register/valorant");
  };

  if (error) {
    return <p>Error loading games: {error}</p>;
  }

  return (
    <>
      <section className="tournament">
        <div className="tournaments-container">
          <h1 className="tournaments-heading">The Games We Provide</h1>
          <p className="tournaments-subheading">Join the excitement and compete in our upcoming tournaments!</p>
          <div className="games-grid">
            <div className="game-card" onClick={handleRegisterBGMI}>
              <div className="bgmi-container">
                <img src="/bgmi.jpg" alt="BGMI" className="game-image" />
              </div>
              <div className="game-card-back">
                <p>Battle it out in BGMI</p>
              </div>
            </div>
            <div className="game-card" onClick={handleRegisterValorant}>
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
      <footer className="footer">
        <h4>Join The Community</h4>
        <div className="social-icons">
          <a href="https://chat.whatsapp.com/HBLIZkvovNr9oPSPJyGFJD" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="social-icon" />
          </a>
          <a href="https://discord.gg/mM63cVCZ" target="_blank" rel="noopener noreferrer">
            <FaDiscord className="social-iconn"  />
          </a>
        </div>
      </footer>
    </>
  );
};

export default Tournament;
