import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route ,useNavigate, Link ,useLocation } from "react-router-dom";
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
import Terms from "./pages/Terms"
import Profile from "./pages/Profile";
import ReactGA from "react-ga4";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const videos = ['/background1.mp4', '/background2.mp4', '/background3.mp4'];
  const [acceptedTerms,setAcceptedTerms] = useState(false);
  const [showTermsPopup, setShowTermsPopup] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [matches, setMatches] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const middleSectionRef = useRef(null);
  const greenOverlayRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const videoRef = useRef(null);

  const initializeAnalytics = () => {
    const measurementId = "G-WMWWB5NCJC";
    ReactGA.initialize(measurementId);
  }; 
  useEffect(() => {
    initializeAnalytics();
  }, []);

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);

  const handleAcceptTerms = async () => {
    try {
      const response = await fetch("https://gamingarena-swet.onrender.com/accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accepted: true }),
      });
      if (response.ok) {
        setAcceptedTerms(true);
        setShowTermsPopup(false);
      } else {
        alert("Failed to accept terms. Try again.");
      }
    } catch (error) {
      console.error("Error accepting terms:", error);
    }
  };

  const handleRejectTerms = () => {
    setAcceptedTerms(false);
    setShowTermsPopup(false);
  };

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  const handleVideoEnd = () => {
    setCurrentVideo((prevVideo) => (prevVideo + 1) % videos.length);
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.play().catch((err) => {
        console.error("Error playing the video:", err);
      });
    }
  };
  const handleReadFullTerms = () => {
    setShowTermsPopup(false);
    navigate("/terms"); 
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
        const response = await fetch("https://gamingarena-swet.onrender.com/matches");
        const data = await response.json();
        setMatches(data);
        if (data.length > 0) {
          initializeTimer(); 
        }
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, []);

  const initializeTimer = () => {
    const matchStartTime = new Date(Date.now() + 13 * 60 * 60 * 1000);

    const updateTimer = () => {
      const now = new Date();
      const diff = matchStartTime - now;

      if (diff <= 0) {
        setTimeLeft("Match Started");
        clearInterval(timerInterval);
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    };
    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
    return () => clearInterval(timerInterval); 
  };


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
  }, [currentVideo]);

  const currentMatch = matches[currentIndex] || { team1: "Loading", team2: "Loading", status: "Loading..." };

  return (
      <div className="app">
        <Navbar />
        {showTermsPopup && (
          <div className="terms-popup">
            <div className="terms-content">
              <h2>Terms and Conditions</h2>
              <div
                className={`terms-text ${isExpanded ? "expanded" : ""}`}
                onScroll={(e) => e.stopPropagation()} 
              >
                Welcome to BigGameWars! By using our platform and participating
                in the tournaments hosted on our website, you agree to abide by
                the following terms and conditions. These terms are designed to
                ensure a fair and secure experience for all participants. If
                you do not agree with these terms, please refrain from using
                our services.
                <br />
                <br />
                  <span
                  className="read-full-link"
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={handleReadFullTerms}
                >
                  Read Full Terms and Conditions
                </span>
                <br />
                <br />
                By registering or participating in any tournament on
                BigGameWars, you acknowledge that you have read, understood,
                and agreed to these terms and conditions.
                <br />
              </div>
              <button onClick={toggleExpand}>
                {isExpanded ? "Read Less" : "Read More"}
              </button>
              <div className="terms-buttons">
                <button onClick={handleAcceptTerms}>Accept</button>
                <button onClick={handleRejectTerms} className="reject-button" >Reject</button>
              </div>
            </div>
          </div>
        )}
        <Routes>
          <Route path="/info" element={<Info />} />
          <Route path="/tournament" element={<Tournament />} />
          <Route path="/leaderboard/Valorant" element={<Leaderboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/terms" element={<Terms />} />
          <Route
            path="/register/bgmi"
            element={
              <BGMIRegistration acceptedTerms={acceptedTerms} />
            }
          />
          <Route
            path="/register/valorant"
            element={
              <ValorantRegistration acceptedTerms={acceptedTerms} />
            }
          />
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
                    <h1 className="glitch">Gamer's Haven</h1>
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
                    style={{ opacity: 1, transition: "opacity 0.5s" }}
                  >
                    <source src="/middle.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="overlay"></div>
                  <div className="Neon">
                    <h2>Welcome to BigGameWars!</h2>
                    <p>
                      Are you ready to unleash your inner champion? At <strong>BigGameWars</strong>, we bring the most
                      intense online tournaments for <span style={{ color: "#FF4655" }}>Valorant</span> and{" "}
                      <span style={{ color: "#00A896" }}>BGMI</span> players who are hungry for victory.
                      <strong>
                        {" "}
                        Secure your spot, sharpen your skills, and get ready to dominate—because at BigGameWars, every
                        match could makse you a legend.
                      </strong>
                    </p>
                  </div>
                </section>
                <section id="third-section" className="third-section">
                  <div className="match">
                    <h2>
                      {currentMatch.team1} vs {currentMatch.team2}
                    </h2>
                    <p>Status: {currentMatch.status}</p>
                    <p>Time until match starts: {timeLeft}</p>
                </div>
                </section>
                <section id="fourth-section" className="fourth-section">
                  <ContactForm />
                </section>
                <section className="footer">
                      <h3><Link className="linkhu" to="/terms">Terms & Conditions</Link></h3>
                      <ul className="footer-links">
                        <a href="https://biggamewars-eligibility.vercel.app/">Eligibility</a>
                        <a href="https://biggamewars.github.io/refunds-payments/">Payments & Refunds</a>
                        <a href="https://biggamewars-prizepolicy.vercel.app">Prize Policiy</a>
                        <a href="https://biggamewars.github.io/privacy-policy/">Privacy Policy</a>
                      </ul>
                </section>
              </>
            }
          />
        </Routes>
      </div>
  );
};

export default App;
