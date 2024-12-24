import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [matchesPlayed, setMatchesPlayed] = useState(0);
  const [moneyEarned, setMoneyEarned] = useState(0);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
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
        setName(name);
        setEmail(email);
        setMatchesPlayed(matchesPlayed || 0);
        setMoneyEarned(moneyEarned || 0);
        setNewName(name);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err.response?.data || err.message);
        setError("Failed to load profile data");
        setLoading(false);
      }
    };

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

      const response = await axios.put(
        "http://localhost:5000/profile",
        { name: newName },
        config
      );
      const updatedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
      updatedUserInfo.name = response.data.user.name;
      localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
      window.dispatchEvent(new Event("profileUpdated"));
      setName(response.data.user.name);
      setError("");
      alert("Profile updated successfully");
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
                  value={email}
                  readOnly
                  className="profile-input read-only"
                />
              </label>
            </div>
            <div className="profile-field">
              <label>
                Name:
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
            <p>Matches Played: {matchesPlayed}</p>
            <p>Money Earned: ₹{moneyEarned}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
