const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    // Verify the token using JWT_SECRET from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user ID to the request object for access in routes
    req.user = { id: decoded.id };

    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    console.error("JWT verification failed:", error); // Log the error for debugging
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
