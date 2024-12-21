import { useState } from 'react';
import './Contactform.css'
import axios from 'axios';
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://gamingarena-swet.onrender.com/send-email', formData)
      .then((response) => {
        console.log('Email sent successfully:', response.data);
        alert('Email sent successfully!');
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: ''
        });
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        alert('Failed to send email. Please try again.');
      });
  };

  return (
    <div className="contact-form-container">
      <div className="instagram-link">
        <a href="https://www.instagram.com/biggamewars/" target="_blank" rel="noopener noreferrer">
          <img width="96" height="96" src="https://img.icons8.com/windows/96/FFFFFF/instagram-new.png" alt="Follow us on Instagram" className="insta-image" />
        </a>
      </div>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            placeholder="Describe your issue or question"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;
