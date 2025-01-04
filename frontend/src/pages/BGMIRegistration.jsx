  import React, { useState, useEffect } from "react"; 
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
        description: "Experience the ultimate battle royale gameplay. 100 players drop in, and only one survives. Explore, loot, and survive!",
      },
      {
        title: "Arena Mode",
        image: "/bgmiii.jpg",
        description: "Fast-paced combat in a smaller area. Test your skills in intense battles where every second counts!",
      },
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
      if (selectSound) selectSound.play(); 
    };

    const handleRegister = async () => {
      try {
        const response = await axios.post("https://gamingarena-swet.onrender.com/register/bgmi", {
          username,
          email,
        });
        alert(response.data.message);
        navigate("/"); 
      } catch (err) {
        console.error("Error registering for BGMI:", err);
        alert("Error registering for BGMI");
      }
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
                <button className="bgmi-join-button" onClick={handleJoinClick}>
                  <a href="https://zerotize.in/paynow?i=QEJfsl32">JOIN NOW</a>
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
