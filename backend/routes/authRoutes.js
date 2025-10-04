const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require("nodemailer");
require("dotenv").config();

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

// // Register Route
// router.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     console.log("Registration request received:", { name, email });

//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       console.log("User already exists:", email);
//       return res.status(400).send("User already exists");
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log("Password hashed successfully");

//     // Create a new user
//     const user = new User({ name, email, password: hashedPassword, cart: [] });
//     await user.save();
//     console.log("User registered successfully:", user);

//     res.status(201).send("User registered successfully");
//   } catch (err) {
//     console.error("Error registering user:", err);
//     res.status(500).send("Failed to register user");
//   }
// });

// // Login Route
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     console.log("Login request received:", { email });

//     // Check if the user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log("User not found:", email);
//       return res.status(400).send("Invalid credentials");
//     }

//     // Compare the password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       console.log("Invalid password for user:", email);
//       return res.status(400).send("Invalid credentials");
//     }

//     // Generate a JWT token
//     const token = jwt.sign({ userId: user._id }, "secret_key", { expiresIn: "1h" });
//     console.log("Login successful:", email);

//     res.json({ token, userId: user._id, name: user.name });
//   } catch (err) {
//     console.error("Error logging in:", err);
//     res.status(500).send("Failed to log in");
//   }
// });

// ... (previous imports remain the same)

// Register Route - Updated to handle admin role
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    console.log("Registration request received:", { name, email });

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists:", email);
      return res.status(400).send("User already exists");
    }

    // Set role based on email
    const role = email === process.env.ADMIN_EMAIL ? "admin" : "user";

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed successfully");

    // Create a new user with role
    const user = new User({ 
      name, 
      email, 
      password: hashedPassword, 
      role,  // Add role here
      cart: [] 
    });
    await user.save();
    console.log("User registered successfully:", user);

    res.status(201).send("User registered successfully");
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).send("Failed to register user");
  }
});

// Login Route - Updated to return role
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login request received:", { email });

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found:", email);
      return res.status(400).send("Invalid credentials");
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid password for user:", email);
      return res.status(400).send("Invalid credentials");
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, "secret_key", { expiresIn: "1h" });
    console.log("Login successful:", email);

    res.json({ 
      token, 
      userId: user._id, 
      name: user.name,
      role: user.role // Include role in response
    });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).send("Failed to log in");
  }
});

// ... rest of the routes remain the same

// Logout Route
router.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logout successful" });
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  const resetToken = generateToken(user._id); // Ensure this generates a valid token
  user.resetToken = resetToken;
  user.resetTokenExpiry = Date.now() + 3600000; // 1 hour expiry
  await user.save(); // Ensure this is awaited

  console.log("Reset Token:", resetToken);
  console.log("Reset Token Expiry:", new Date(user.resetTokenExpiry).toLocaleString());

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  await transporter.sendMail({
    to: user.email,
    subject: "Password Reset",
    html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
  });

  res.json({ message: "Reset link sent to your email." });
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  console.log("Token from URL:", token);
  console.log("Current Time:", new Date().toLocaleString());

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() }, // Check if the token is not expired
  });

  console.log("User found:", user);

  if (!user) return res.status(400).json({ message: "Invalid or expired token" });

  // Hash the new password
  user.password = await bcrypt.hash(password, 10);
  user.resetToken = undefined; // Clear the reset token
  user.resetTokenExpiry = undefined; // Clear the expiry time
  await user.save();

  // Generate a new JWT token for the user
  const newToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ message: "Password reset successful", token: newToken, user: { name: user.name, email: user.email } });
});

module.exports = router;