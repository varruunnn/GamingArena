import React, { useEffect, useState } from "react";
import axios from "axios";

const Terms = () => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/terms");
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
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
    color: "#fff",
    minHeight: "100vh",
    padding: "80px",
    margin: 0,
  };

  const termsStyle = {
    maxWidth: "900px",
    maxHeight: "100vh",
    overflowY: "auto",
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#1c1f2e",
    color: "#e6e6e6",
    lineHeight: "1.8",
    fontSize: "18px",
    textAlign: "justify",
  };

  const listStyle = {
    margin: "20px 0",
    paddingLeft: "20px",
    color: "#cfd8dc",
  };

  const listItemStyle = {
    marginBottom: "10px",
    lineHeight: "1.6",
  };

  const linkStyle = {
    color: "#4db8ff",
    textDecoration: "none",
    transition: "color 0.3s ease, text-decoration 0.3s ease",
  };

  const linkHoverStyle = {
    color: "#80d4ff",
    textDecoration: "underline",
  };

  return (
    <div style={containerStyle}>
      <div
        style={termsStyle}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
};

export default Terms;
