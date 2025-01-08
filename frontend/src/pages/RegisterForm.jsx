import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState('');
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('');
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [player3, setPlayer3] = useState('');
  const [player4, setPlayer4] = useState('');
  const [player5, setPlayer5] = useState('');
  const [teamName, setTeamName] = useState('');

  const [index, setIndex] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1])); 
      setName(decoded.name);
    }
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 4000);

    return () => clearInterval(slideInterval); 
  }, []);

  useEffect(() => {
    const particleInterval = setInterval(() => {
      createParticle();
    }, 400);

    return () => clearInterval(particleInterval); 
  }, []);

  const handleInputChange = (e, player) => {
    const value = e.target.value;
    if (player === 'player1') setPlayer1(value);
    if (player === 'player2') setPlayer2(value);
    if (player === 'player3') setPlayer3(value);
    if (player === 'player4') setPlayer4(value);
    if (player === 'teamName') setTeamName(value);
    if (player === 'name') setName(value);
    if (player === 'email') setEmail(value);
    if (player === 'phone') setPhone(value);
    if (player === 'player5') setPlayer5(value);
  };

  const createParticle = () => {
    const body = document.querySelector('body');
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 50}vh`;
    particle.style.animationDuration = `${Math.random() * 12 + 8}s`;
    particle.style.opacity = `${Math.random() * 0.7 + 0.3}`;
    body.appendChild(particle);
    setTimeout(() => {
      particle.remove();
    }, 15000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('https://gamingarena-swet.onrender.com/submit-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          player1,
          player2,
          player3,
          player4,
          player5,
          teamName,
        }),
      });
      alert('Data submitted successfully!');
      navigate('/payment');
    } catch (err) {
      console.error('Error:', err);
      setError('Error registering. Please try again.');
    }
  };

  return (
    <>
      <div className="page-title">
        <h1>
          BIGGAMEWARS <span>(Valorant)</span>
        </h1>
      </div>
      <div className="main-container">
        <div className="slider">
          <div className="slides" style={{ transform: `translateX(-${index * 100}%)` }}>
            <img src="/h.jpeg" alt="Futuristic Image 1" />
            <img src="/k.png" alt="Futuristic Image 2" />
            <img src="/p.png" alt="Futuristic Image 3" />
          </div>
        </div>
        <div className="registration-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => handleInputChange(e, 'name')}
                    required
                    placeholder="Enter Your Name"
                    style={{
                        backgroundColor: name ? 'white' : '#282c34',
                        color:name?'black':'black'
                    }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => handleInputChange(e, 'email')}
                    required
                    placeholder="Enter Your email"
                    style={{
                        backgroundColor: email ? 'white' : '#282c34',
                        color:email?'black':'black'
                    }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone/WhatsApp Number *</label>
              <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => handleInputChange(e, 'phone')}
                    required
                    placeholder="Enter Your phone"
                    style={{
                        backgroundColor: phone ? 'white' : '#282c34',
                        color:phone?'black':'black'
                    }}
              />
            </div>
            <div>
                <div className="form-group">
                    <label htmlFor="player1">Player 1 Name</label>
                    <input
                    type="text"
                    id="player1"
                    name="player1"
                    value={player1}
                    onChange={(e) => handleInputChange(e, 'player1')}
                    required
                    placeholder="Player 1 Name"
                    style={{
                        backgroundColor: player1 ? 'white' : '#282c34',
                        color:player1?'black':'black'
                    }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="player2">Player 2 Name</label>
                    <input
                    type="text"
                    id="player2"
                    name="player2"
                    value={player2}
                    onChange={(e) => handleInputChange(e, 'player2')}
                    placeholder="Player 2 Name"
                    style={{
                        backgroundColor: player1 ? 'white' : '#282c34',
                        color:player1?'black':'black'
                    }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="player3">Player 3 Name</label>
                    <input
                    type="text"
                    id="player3"
                    name="player3"
                    value={player3}
                    onChange={(e) => handleInputChange(e, 'player3')}
                    placeholder="Player 3 Name"
                    style={{
                        backgroundColor: player1 ? 'white' : '#282c34',
                        color:player1?'black':'black'
                    }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="player4">Player 4 Name</label>
                    <input
                    type="text"
                    id="player4"
                    name="player4"
                    value={player4}
                    onChange={(e) => handleInputChange(e, 'player4')}
                    placeholder="Player 4 Name"
                    style={{
                        backgroundColor: player1 ? 'white' : '#282c34',
                        color:player1?'black':'black'
                    }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="player5">Player 5 Name</label>
                    <input
                    type="text"
                    id="player5"
                    name="player5"
                    value={player5}
                    onChange={(e) => handleInputChange(e, 'player5')}
                    placeholder="Player 5 Name"
                    style={{
                        backgroundColor: player1 ? 'white' : '#282c34',
                        color:player1?'black':'black'
                    }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="team-name">Your Team Name</label>
                    <input
                    type="text"
                    id="team-name"
                    name="team-name"
                    value={teamName}
                    onChange={(e) => handleInputChange(e, 'teamName')}
                    placeholder="Enter your team name"
                    style={{
                      backgroundColor: player1 ? 'white' : '#282c34',
                      color:player1?'black':'black'
                    }}
                    />
                </div>
            </div>
            <button type="submit">Pay Now</button>
          </form>
          <div>
            <p className="note">
              For updates about your match and tournament, please join the{' '}
              <a href="https://chat.whatsapp.com/HBLIZkvovNr9oPSPJyGFJD" target="_blank" rel="noopener noreferrer">
                WhatsApp Community
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
