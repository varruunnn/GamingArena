import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Profile.css'

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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

        const response = await axios.get("https://gamingarena-swet.onrender.com/profile", config);
        setName(response.data.name);
        setEmail(response.data.email);
        setNewName(response.data.name);
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
        "https://gamingarena-swet.onrender.com/profile",
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
        </>
      )}
    </div>
  );  
};

export default Profile;
