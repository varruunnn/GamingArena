import React, { useEffect, useState } from "react";
import axios from "axios";

const Terms = () => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await axios.get("https://gamingarena-swet.onrender.com/terms");
        setHtmlContent(response.data);
      } catch (error) {
        console.error("Error fetching terms and conditions:", error);
      }
    };

    fetchTerms();
  }, []);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Poppins', sans-serif",
    background: "linear-gradient(120deg,rgb(0, 0, 0),rgb(58, 32, 13))",
    color: "#fff",
    minHeight: "100vh",
    padding: "50px",
    margin: 0,
  };

  const termsStyle = {
    maxWidth: "800px",
    maxHeight: "80vh",
    overflowY: "auto",
    borderRadius: "12px",
    margin: "50px auto",
    padding: "0px",
    boxShadow: "0 15px 25px rgba(214, 14, 14, 0.3)",
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    color: "white",
    lineHeight: "1.8",
    fontSize: "16px",
    textAlign: "justify",
    letterSpacing: "0.5px",
    scrollbarWidth: "thin",
  };

  const linkStyle = {
    color: "#ff7e5f",
    textDecoration: "none",
    transition: "color 0.3s ease, text-decoration 0.3s ease",
  };

  return (
    <div style={containerStyle}>
      <div style={termsStyle}>
        <div
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
};

export default Terms;
