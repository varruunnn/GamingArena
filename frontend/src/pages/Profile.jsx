import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    matchesPlayed: 0,
    moneyEarned: 0,
  });
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        "https://gamingarena-swet.onrender.com/profile",
        config
      );
      const { name, email, matchesPlayed, moneyEarned } = response.data;
      setProfileData({
        name,
        email,
        matchesPlayed: matchesPlayed || 0,
        moneyEarned: moneyEarned || 0,
      });
      setNewName(name);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching profile:", err.response?.data || err.message);
      setError("Failed to load profile data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!newName.trim()) {
      setError("Name cannot be empty");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      await axios.put(
        "https://gamingarena-swet.onrender.com/profile",
        { name: newName },
        config
      );
      await fetchProfile();
      setError("");
      alert("Profile updated successfully Please Reload the page to see the changes");
    } catch (err) {
      console.error("Error updating profile:", err.response?.data || err.message);
      setError("Failed to update profile");
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-heading">My Account</h2>
      {loading ? (
        <p className="profile-loading">Loading user data...</p>
      ) : error ? (
        <p className="profile-error">{error}</p>
      ) : (
        <>
          <form onSubmit={handleUpdate}>
            <div className="profile-field">
              <label>
                Email (read-only):
                <input
                  type="text"
                  value={profileData.email}
                  readOnly
                  className="profile-input read-only"
                />
              </label>
            </div>
            <div className="profile-field">
              <label>
                Wanna update Name:
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="profile-input"
                />
              </label>
            </div>
            <button type="submit" className="profile-button">
              Update Name
            </button>
          </form>
          <div className="player-card">
            <h3>Player Card</h3>
            <p>Matches Played: {profileData.matchesPlayed}</p>
            <p>Money Earned: ₹{profileData.moneyEarned}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
