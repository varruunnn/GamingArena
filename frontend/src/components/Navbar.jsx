import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(
    "https://ideascdn.lego.com/media/generate/entity/lego_ci/project/8c353ed9-db1e-4ec5-ad2e-4c7344fbc1ad/7/resize:1600:900/legacy"
  );
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      setUser(userInfo.name); 
    }
    const handleUserLogin = () => {
      const updatedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (updatedUserInfo) {
        setUser(updatedUserInfo.name); 
      }
    };
    const handleProfileUpdated = () => {
      const updatedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (updatedUserInfo) {
        setUser(updatedUserInfo.name); 
      }
    }
  
    window.addEventListener('userLogin', handleUserLogin);
    window.addEventListener("profileUpdated", handleProfileUpdated);
  
    return () => {
      window.removeEventListener('userLogin', handleUserLogin);
      window.removeEventListener("profileUpdated", handleProfileUpdated);
    };
  }, []);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const toggleProfileMenu = () => {
    setProfileMenuOpen((prev) => !prev);
  };
  const handleUserLogin = () => {
    const updatedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (updatedUserInfo) {
      setUser(updatedUserInfo.name); 
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('userInfo'); 
    setUser(null); 
    navigate('/login'); 
  };
  const navigateToAccount = () => {
    navigate('/profile');
    setProfileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
      <Link to="/"><img className="logo" src="/logo.png" alt="logo" /></Link>  
        <Link to="/"><img className="logo2" src="/logo2.png" alt="logo" /></Link>
      </div>
      <button className={`menu-button ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </button>
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
        <li><Link to="/info" onClick={() => setIsMenuOpen(false)}>Info</Link></li>
        <li><Link to="/tournament" onClick={() => setIsMenuOpen(false)}>Tournament</Link></li>
        <li><Link to="/leaderboard/Valorant" onClick={() => setIsMenuOpen(false)}>Leaderboard</Link></li>
      </ul>
      <div className="nav-profile">
        {user ? (
          <>
            <span className="nav-username">{user}</span>
            <div className="profile-icon-container" onClick={toggleProfileMenu}>
              <img src={profilePicture} alt="Profile" className="profile-icon" />
            </div>
            {profileMenuOpen && (
              <div className="profile-menu cyberpunk-theme">
                <button onClick={navigateToAccount} className="profile-menu-option">My Account</button>
                <button onClick={handleLogout} className="profile-menu-option">Logout</button>
              </div>
            )}
          </>
        ) : (
          <Link to="/login" className="profile-icon-link">
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