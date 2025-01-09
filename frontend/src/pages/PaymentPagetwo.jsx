import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentPage.css";

const PaymentPagetwo = () => {
  const [paymentDone, setPaymentDone] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [upiId, setUpiId] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate(); 

  const handlePaymentConfirmation = (e) => {
    setPaymentDone(e.target.value === "yes");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://gamingarena-swet.onrender.com/tdm-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          upiId
        }),
      });

      if (response.ok) { 
        alert('Data submitted successfully we will contact you in 2hr :) !');
        navigate('/'); 
      } else {
        throw new Error('Failed to submit data');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error submitting payment details. Please try again.');
    }
  };

  return (
    <div className="payment-page">
      <h1>Payment Page</h1>
      <div className="form-section">
        <label htmlFor="name">Team Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your Team name"
          required
        />
        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
          required
        />
      </div>
      <div className="payment-info">
        <h3>Make Your Payment</h3>
        <h5>Valorant~Single Player Fee - 80/ Team Fee - 400/-<br />BGMI~Single Player Fee - 50/ Team Fee - 200/</h5>
        <img
          src="/qr.png"
          alt="QR Code"
          className="qr-code"
        />
        <p><strong>UPI ID:</strong> biggamewars@ibl</p>
        <p>Copy the UPI ID and pay using any UPI app.</p>
      </div>
      <div className="confirmation-section">
        <p>Have you completed the payment?</p>
        <button
          className="yes"
          type="radio"
          name="paymentConfirmation"
          value="yes"
          onClick={handlePaymentConfirmation}
        >YES</button>
        <button
          className="no"
          type="radio"
          name="paymentConfirmation"
          value="no"
          onClick={handlePaymentConfirmation}
        >NO</button>
      </div>
      
      {paymentDone && (
        <div className="upi-details">
          <h3>Enter Your UPI ID</h3>
          <input
            type="text"
            placeholder="Enter your UPI ID"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            required
          />
          <button onClick={handleSubmit}>Submit Payment Details</button>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default PaymentPagetwo;
