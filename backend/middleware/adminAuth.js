const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const decoded = jwt.verify(token, "secret_key");
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = adminAuth;