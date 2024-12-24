import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
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
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        if (!token) return;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.get('https://gamingarena-swet.onrender.com/profile', config);
        setUser(data.name);
        setProfilePicture(data.profilePicture || profilePicture); // Update profile picture if available
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
        setUser(null); // Handle error, log out user if token is invalid
      }
    };

    fetchUserProfile();

    const handleUserLogin = () => {
      fetchUserProfile();
    };

    window.addEventListener('userLogin', handleUserLogin);

    return () => {
      window.removeEventListener('userLogin', handleUserLogin);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo'); // Clear userInfo
    localStorage.removeItem('token'); // Clear token
    setUser(null); // Reset user state
    navigate('/login'); // Navigate to login page
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
      <button
        className={`menu-button ${isMenuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      >
        <i className="fas fa-bars"></i>
        <i className="fas fa-times"></i>
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
