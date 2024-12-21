import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Info.css";

const Info = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    axios.get("https://gamingarena-swet.onrender.com/info")
      .then((response) => {
        setInfo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching info data:", error);
      });
  }, []);

  if (!info) return <p>Loading...</p>;
  return (
    <div className="mainsection">
      <div className="info-container">
        <h1 className="neon-title">{info.title}</h1>
        <p>Welcome to BigGameWars! We’re thrilled to host exciting competitive tournaments where players can showcase their skills, compete with the best, and win big—all for a minimal entry fee! Our tournaments offer significant rewards to winning teams, making it a perfect opportunity for players to turn their talent into cash prizes.</p>

        <div className="section">
          <h2 className="neon-subtitle">Tournament Types and Entry Fees</h2>
          <p>BigGameWars offers two types of matches: <strong>Standard</strong> and <strong>Classic</strong>. Each is designed to provide a thrilling, competitive experience, with entry fees set to be accessible for everyone. Choose the format that fits your playstyle and budget, and dive into the action!</p>
        </div>

        <div className="section">
          <h2 className="neon-subtitle">Standard Match</h2>
          <ul className="cont1">
            <li className="cont2"><strong>Single Player Entry Fee:</strong> ₹80</li>
            <li className="cont2"><strong>Team Entry Fee (5 Players):</strong> ₹400 (₹80 per player)</li>
            <li className="cont2"><strong>Winning Prize:</strong> ₹1400 for the top team</li>
          </ul>
          <p>In the Standard Match, individual players or teams compete for a prize that’s over three times the team entry cost. It’s a fantastic way to enjoy competitive gaming with a high reward for your efforts!</p>
        </div>

        <div className="section">
          <h2 className="neon-subtitle">Classic Match</h2>
          <ul className="cont1">
            <li className="cont2" ><strong>Single Player Entry Fee:</strong> ₹100</li>
            <li className="cont2"><strong>Team Entry Fee (5 Players):</strong> ₹500 (₹100 per player)</li>
            <li className="cont2"><strong>Winning Prize:</strong> ₹1800 for the top team</li>
          </ul>
          <p>The Classic Match ups the stakes with a slightly higher entry fee, providing an even larger prize pool. Perfect for seasoned players ready to compete at a higher level with an exciting reward!</p>
        </div>
 
        <div className="section">
          <h2 className="neon-subtitle">Why Compete in BigGameWars Tournaments?</h2>
          <ul className="cont1">
            <li className="cont2" ><strong>Affordable Entry Fees:</strong> Pay less and compete for substantial rewards!</li>
            <li className="cont2" ><strong>High Prize Pools:</strong> Win up to ₹1800 in our tournaments, with the entry fee covered multiple times over.</li>
            <li className="cont2" ><strong>Fair Competition:</strong> Every player and team is given a fair chance to prove their skills.</li>
            <li className="cont2" ><strong>Community of Gamers:</strong> Join a community of passionate gamers who share the thrill of competition.</li>
          </ul>
        </div>
        <p className="register-callout">Ready to get started? Register now and secure your spot in the next tournament!</p>
      </div>
    </div>
  );
};

export default Info;
