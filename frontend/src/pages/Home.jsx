import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <video autoPlay loop muted className="background-video">
        <source src="/background1.mp4" type="video/mp4" />
        <source src="/background2.mp4" type="video/mp4" />
        <source src="/background3.mp4" type="video/mp4" />
      </video>
      <h1 className="home-heading">Welcome to Gaming Arena</h1>
    </div>
  );
};

export default Home;
