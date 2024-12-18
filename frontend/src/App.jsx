import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import Info from "./pages/Info";
import Tournament from "./pages/Tournament";
import Leaderboard from "./pages/Leaderboard";
import ContactForm from './pages/Contactform';
import Login from "./components/Login";
import BGMIRegistration from "./pages/BGMIRegistration";
import ValorantRegistration from "./pages/ValorantRegistration";
import Signup from "./components/Signup";
import Profile from "./pages/Profile";

const App = () => {
  const videos = ['/background1.mp4', '/background2.mp4', '/background3.mp4'];
  const [currentVideo, setCurrentVideo] = useState(0);
  const [matches, setMatches] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const middleSectionRef = useRef(null);
  const greenOverlayRef = useRef(null);
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    setCurrentVideo((prevVideo) => (prevVideo + 1) % videos.length);
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.play().catch((err) => {
        console.error("Error playing the video:", err);
      });
    }
  };
  const handleLogin = (user) => {
    setUser(user);
  };
  const logout = () => {
    setUser(null);
  };
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch("http://localhost:5000/matches");
        const data = await response.json();
        setMatches(data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };
    fetchMatches();
  }, []);

  useEffect(() => {
    if (matches.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % matches.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [matches]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.muted = true;
      videoElement.play().catch((err) => {
        console.error("Error playing the video:", err);
      });
    }
    console.log("Current Video Path: ", videos[currentVideo]);
  }, [currentVideo]);

  const currentMatch = matches[currentIndex] || { team1: "Loading", team2: "Loading", status: "Loading..." };

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/info" element={<Info />} />
          <Route path="/tournament" element={<Tournament />} />
          <Route path="/leaderboard/Valorant" element={<Leaderboard />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register/bgmi" element={<BGMIRegistration />} />
          <Route path="/register/valorant" element={<ValorantRegistration />} />
          <Route
            path="/"
            element={
              <>
                <section id="home" className="home-section">
                  <video
                    className="videos"
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    loop={false}
                    id="background-video"
                    onEnded={handleVideoEnd}
                    key={currentVideo}
                  >
                    <source src={videos[currentVideo]} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="overlay"></div>
                  <div className="content">
                    <h1>Gamer's Haven</h1>
                    <p>"Enter the Realm of Champions!"</p> <br />
                    <p>
                      From tactical battles to heart-pounding action, this is your stage to shine.
                      The game is on—gear up and dominate!
                    </p>
                  </div>
                  <div id="scroll-indicator" className="scroll-indicator">
                    <span className="scroll-text">Scroll ↓</span>
                  </div>
                </section>
                <section id="middle-section" className="middle-section" ref={middleSectionRef}>
                  <div ref={greenOverlayRef} className="green-overlay"></div>
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    id="middle-video"
                    style={{ opacity: 1, transition: 'opacity 0.5s' }}
                  >
                    <source src="/middle.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="overlay"></div>
                  <div className="Neon">
                    <h2>Welcome to BigGameWars!</h2>
                    <p>
                      Are you ready to unleash your inner champion? At <strong>BigGameWars</strong>, we bring the most
                      intense online tournaments for <span style={{ color: "#FF4655" }}>Valorant</span> and{' '}
                      <span style={{ color: "#00A896" }}>BGMI</span> players who are hungry for victory.
                      <strong>
                        {' '}
                        Secure your spot, sharpen your skills, and get ready to dominate—because at BigGameWars, every
                        match could make you a legend.
                      </strong>
                    </p>
                  </div>
                </section>
                <section id="third-section" className="third-section">
                  <div className="match">
                    <h2>
                      {currentMatch.team1} vs {currentMatch.team2}
                    </h2>
                    <p>{currentMatch.status}</p>
                  </div>
                </section>
                <section id="fourth-section" className="fourth-section">
                  <ContactForm />
                </section>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
