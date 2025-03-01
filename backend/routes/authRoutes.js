const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
require("dotenv").config();

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

// Register
router.post("/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if user exists
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: "User already exists" });
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Save user
      user = new User({ name, email, password: hashedPassword });
      await user.save();
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Login User
  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) return res.status(400).json({ message: "Invalid credentials" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      // Generate JWT Token
      const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      // Return user details along with token
      res.json({
        token,
        user: {
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  

// Forgot Password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  const resetToken = generateToken(user._id);
  user.resetToken = resetToken;
  user.resetTokenExpiry = Date.now() + 3600000; // 1 hour expiry
  await user.save();

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  await transporter.sendMail({
    to: user.email,
    subject: "Password Reset",
    html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
  });

  res.json({ message: "Reset link sent to your email." });
});

// Reset Password
router.post("/reset-password/:token", async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
  
    const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });
  
    if (!user) return res.status(400).json({ message: "Invalid or expired token" });
  
    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();
  
    // ✅ Generate a new token after password reset
    const newToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
    res.json({ message: "Password reset successful", token: newToken, user: { name: user.name, email: user.email } });
  });

  router.post("/logout", (req, res) => {
    res.json({ message: "Logout successful" });
  });
  
  

module.exports = router;
