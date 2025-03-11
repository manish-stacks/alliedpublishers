// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const authMiddleware = async (req, res, next) => {
//   const token = req.header("Authorization");

//   if (!token) return res.status(401).json({ message: "Access Denied! No token provided." });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-password");
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid Token" });
//   }
// };

// module.exports = authMiddleware;

// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, "secret_key"); // Verify the token
    req.userId = decoded.userId; // Attach the user ID to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};

module.exports = authenticateUser;
