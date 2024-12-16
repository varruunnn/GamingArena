import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, logout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(
    "https://ideascdn.lego.com/media/generate/entity/lego_ci/project/8c353ed9-db1e-4ec5-ad2e-4c7344fbc1ad/7/resize:1600:900/legacy"
  );

  const profilePictureOptions = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgtpi4kv6_bkj_88xTTaE-DtzDO8ynWTYf1A&s",
    "https://cdn-icons-png.flaticon.com/512/3665/3665917.png",
    "https://cdn-icons-png.flaticon.com/512/3600/3600912.png",
  ];

  const getRandomPictures = () => {
    const shuffled = [...profilePictureOptions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const [randomPictures, setRandomPictures] = useState(getRandomPictures());

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleProfileMenu = () => {
    setRandomPictures(getRandomPictures()); 
    setProfileMenuOpen((prev) => !prev);
  };

  const changeProfilePicture = (newPicture) => {
    setProfilePicture(newPicture);
    setProfileMenuOpen(false);
  };

  const handleMenuLinkClick = () => {
    setIsMenuOpen(false); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/"><img className="logo" src="/logo.png" alt="logo" /></Link>
      </div>
      <button className={`menu-button ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </button>
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={handleMenuLinkClick}>Home</Link></li>
        <li><Link to="/info" onClick={handleMenuLinkClick}>Info</Link></li>
        <li><Link to="/tournament" onClick={handleMenuLinkClick}>Tournament</Link></li>
        <li><Link to="/leaderboard" onClick={handleMenuLinkClick}>Leaderboard</Link></li>
      </ul>
      <div className="nav-profile">
        {user ? (
          <>
            <span className="nav-username">{user}</span>
            <div className="profile-icon-container" onClick={toggleProfileMenu}>
              <img
                src={profilePicture}
                alt="Profile"
                className="profile-icon"
              />
            </div>
            {profileMenuOpen && (
              <div className="profile-menu">
                <p>Select Your Avatar:</p>
                <div className="profile-options">
                  {randomPictures.map((pic, index) => (
                    <img
                      key={index}
                      src={pic}
                      alt={`Avatar ${index + 1}`}
                      className="profile-option"
                      onClick={() => changeProfilePicture(pic)}
                    />
                  ))}
                </div>
              </div>
            )}
            <button onClick={logout} className="logout-button">Logout</button>
          </>
        ) : (
          <Link to="/profile" className="profile-icon-link">
            <img
              src="https://img.freepik.com/premium-vector/logo-kid-gamer_573604-742.jpg"
              alt="Login"
              className="profile-icon"
            />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
