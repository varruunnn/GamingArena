import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };
  
      const response = await axios.post(
        "https://gamingarena-swet.onrender.com/login",
        { email, password },
        config
      );
      setName(response.data.name);
      // localStorage.setItem("userInfo",JSON.stringify(response.data));
      localStorage.setItem("token", response.data.token);
      window.dispatchEvent(new Event("userLogin"));
      navigate("/profile");
    } catch (err) {
      setError("Invalid email or password");
      console.error("Login error:", err.response?.data || err.message);
    }
  };


  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="auth-button">
          Login
        </button>
      </form>
      <p className="switch-auth">
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
