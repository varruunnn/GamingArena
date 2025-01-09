import React, { useState, useEffect } from "react"; 
import { GoTrophy } from "react-icons/go";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./BGMIRegistration.css";

const BGMIRegistration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const [changeSound, setChangeSound] = useState(null);
  const [selectSound, setSelectSound] = useState(null);


  const slides = [
    {
      title: "Classic Mode",
      image: "/bgmii.jpg",
      description: "Battle Out in BGMI",
      entryFee: '₹80 Team Entry Fee (4 Players): ₹320   ',
      prize:':₹4000 Runner-up: ₹2000 3rd Place: ₹1000',
    },
    {
      "title": "Arena Mode",
      "image": "/bgmiii.jpg",
      "description": "Fast-paced combat in a smaller area.Test your skills in intense battles where every second counts!",
      "entryFee": "₹50 Team Entry Fee (4 Players): ₹200",
      "prize": "₹400"
    }
    
  ];

  const showSlide = (index) => {
    if (changeSound) changeSound.play(); 
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    const newIndex = (currentSlide + 1) % slides.length;
    showSlide(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(newIndex);
  };

  const handleJoinClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to log in to join this event!");
      navigate("/login")
      return;
    }
    navigate("/registerForms"); 
  };


  return (
    <section className="bgmi-slider">
      <div className="bgmi-slider-container">
        <h2 className="bgmi-slide-title">Game Modes</h2>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`bgmi-slide ${index === currentSlide ? "active" : ""}`}
          >
            <div className="bgmi-slide-image-container">
              <img
                src={slide.image}
                alt={`BGMI ${slide.title}`}
                className="bgmi-slide-image"
              />
            </div>
            <div className="bgmi-slide-content">
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
              <br />
              <p><strong>Entry Fee:</strong> {slide.entryFee}</p>
              <br />
              <p><strong>Prize:</strong> <strong className="yellow" >Winner</strong> <GoTrophy /> {slide.prize}</p>
              <button className="bgmi-join-button" onClick={handleJoinClick}>
                JOIN NOW
              </button>
            </div>
          </div>
        ))}
        <div className="bgmi-slider-nav">
          <button id="prevBtn" className="bgmi-slider-button" onClick={prevSlide}>
            Previous
          </button>
          <button id="nextBtn" className="bgmi-slider-button" onClick={nextSlide}>
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default BGMIRegistration;