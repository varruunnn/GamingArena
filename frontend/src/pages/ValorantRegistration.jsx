import React, { useState,useEffect } from "react";
import axios from "axios";
import "./ValorantRegistration.css";
import { useNavigate } from "react-router-dom";

const ValorantRegistration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesData = [
    {
      title: 'Classic Mode',
      description: 'Experience balanced gameplay and fair competition.',
      entryFee: '₹100/player • ₹500/team',
      prize: '₹1800 for winning team',
      image: '/valoclas.jpg'
    },
    {
      title: 'TDM Mode',
      description: 'Step up for high-stakes challenges and competitive gameplay.',
      entryFee: '₹80/player • ₹400/team',
      prize: '₹1400 for winning team',
      image: '/valotdm.jpg' 
    }
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesData.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length);
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };
  const handlesubmit = () => {
    window.location.href = '/profile';
  };

  useEffect(() => {
    const slideInterval = setInterval(handleNextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  const handleRegister = async () => {
    try {
      const response = await axios.post("https://gamingarena-swet.onrender.com/register/valorant", {
        username,
        email,
      });
      alert(response.data.message);
      navigate("/"); 
    } catch (err) {
      console.error("Error registering for Valorant:", err);
      alert("Error registering for Valorant");
    }
  };

  return (
    <section className="slider-container">
      <h1 className="slider-heading">Choose Your Game Mode</h1>
      <div className="slider-content">
        <div className="slider-images">
          {slidesData.map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt={slide.title}
              className={`slide-image ${index === currentSlide ? 'active' : ''}`}
            />
          ))}
        </div>
        <div className="slider-text">
          <div className="slide active">
            <h2>{slidesData[currentSlide].title}</h2>
            <p>{slidesData[currentSlide].description}</p>
            <p><strong>Entry Fee:</strong> {slidesData[currentSlide].entryFee}</p>
            <p><strong>Prize:</strong> {slidesData[currentSlide].prize}</p>
            <button className="join-button" onClick={handlesubmit}>JOIN NOW</button>
          </div>
        </div>
      </div>
      <div className="slider-navigation">
        <button onClick={handlePrevSlide} className="nav-button">❮</button>
        <button onClick={handleNextSlide} className="nav-button">❯</button>
      </div>
      <div className="slider-dots">
        {slidesData.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default ValorantRegistration;
