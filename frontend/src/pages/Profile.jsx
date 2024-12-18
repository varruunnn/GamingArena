import React, { useState, useEffect } from 'react';
import axios from 'axios';
const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [pic, setPic] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
        axios.get('http://localhost:5000/profile', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const fetchProfile = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        };
        const { data } = await axios.get('/profile', config);
        setUser(data);
        setName(data.name);
        setPic(data.pic);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token"); 
    
    if (!token) {
      console.log("No token found");
      return;
    }
  
    try {
      const response = await axios.put(
        "http://localhost:5000/profile",
        {
          userId: user.id,
          name: newName,
          email: newEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.header}>Welcome, {user.name}</h2>
        <form onSubmit={handleUpdate} style={styles.form}>
          <label style={styles.label}>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Password (leave blank to keep current password):
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </label>
          <button type="submit" style={styles.button}>
            Update Name
          </button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)',
    color: '#fff',
  },
  card: {
    background: '#2c3e50',
    borderRadius: '10px',
    padding: '20px',
    width: '400px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  header: {
    margin: '10px 0',
  },
  image: {
    borderRadius: '50%',
    width: '150px',
    height: '150px',
    marginBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  label: {
    textAlign: 'left',
    marginBottom: '5px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    width: '100%',
  },
  button: {
    padding: '10px 20px',
    background: '#fdbb2d',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '10px',
    color: '#4caf50',
  },
};

export default ProfilePage;
