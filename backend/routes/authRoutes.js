const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require("nodemailer");
require("dotenv").config();

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  tls: {
    rejectUnauthorized: false
  },
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

// Test email connection
transporter.verify((error, success) => {
  if (error) {
    console.log('Email config error:', error);
  } else {
    console.log('Email server ready');
  }
});

// Register Route - Updated to handle admin role
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    console.log("Registration request received:", { name, email });

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists:", email);
      return res.status(409).send("User already exists");
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

// Logout Route
router.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logout successful" });
});


router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    
    console.log("=== FORGOT PASSWORD DEBUG ===");
    console.log("1. Request received - Email:", email);
    console.log("2. Environment Check:");
    console.log("   - EMAIL_USER:", process.env.EMAIL_USER ? "✅ Set" : "❌ Not set");
    console.log("   - JWT_SECRET:", process.env.JWT_SECRET ? "✅ Set" : "❌ Not set");
    console.log("   - FRONTEND_URL:", process.env.FRONTEND_URL);

    if (!email) {
      console.log("❌ Email missing in request");
      return res.status(400).json({ message: "Email is required" });
    }

    console.log("3. Searching user in database...");
    const user = await User.findOne({ email });
    console.log("   - User found:", user ? `✅ ${user.email}` : "❌ Not found");
    
    if (!user) {
      return res.json({ message: "If email exists, reset link will be sent" });
    }

    console.log("4. Generating JWT token...");
    const resetToken = jwt.sign({ 
      id: user._id,
      type: 'password_reset'
    }, process.env.JWT_SECRET, { 
      expiresIn: "1h" 
    });
    console.log("   - Token generated successfully");

    console.log("5. Updating user with reset token...");
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000;
    await user.save();
    console.log("   - User updated successfully");

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    console.log("6. Reset URL:", resetUrl);

    console.log("7. Sending email...");
    console.log("   - From:", process.env.EMAIL_USER);
    console.log("   - To:", user.email);
    
    // Email configuration with better error handling
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { 
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS 
      }
    });

    await transporter.sendMail({
      from: `"Allied Publications" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset Request - Allied Publications",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Password Reset Request</h2>
          <p>Hello ${user.name},</p>
          <p>You requested to reset your password. Click the link below:</p>
          <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
          <p><small>This link will expire in 1 hour.</small></p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `,
    });

    console.log("✅ Email sent successfully!");
    console.log("=== PROCESS COMPLETED ===");
    
    res.json({ message: "Reset link sent to your email" });
    
  } catch (error) {
    console.error("❌ FORGOT PASSWORD ERROR:");
    console.error("   - Error name:", error.name);
    console.error("   - Error message:", error.message);
    console.error("   - Error code:", error.code);
    
    if (error.response) {
      console.error("   - Error response:", error.response);
    }

    // Specific error handling
    if (error.code === 'EAUTH') {
      return res.status(500).json({ message: "Email configuration error. Please contact support." });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(500).json({ message: "Token generation failed" });
    }

    res.status(500).json({ message: "Failed to send reset link. Please try again." });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    console.log("🔍 === RESET PASSWORD DEBUG ===");
    console.log("📨 Request received");
    console.log("   - Token:", token ? `${token.substring(0, 30)}...` : "No token");
    console.log("   - Password provided:", !!password);

    // Basic validation
    if (!token) {
      console.log("❌ No token provided");
      return res.status(400).json({ message: "Token is required" });
    }

    if (!password || password.length < 6) {
      console.log("❌ Invalid password");
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    console.log("🔄 Step 1: Verifying JWT token...");
    
    let decoded;
    try {
      // JWT token verify karo
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("✅ JWT Token Verified");
      console.log("   - User ID:", decoded.id);
      console.log("   - Token type:", decoded.type);
      if (decoded.exp) {
        console.log("   - Expires at:", new Date(decoded.exp * 1000).toLocaleString());
      }
    } catch (jwtError) {
      console.log("❌ JWT Verification Failed:");
      console.log("   - Error:", jwtError.message);
      console.log("   - Error name:", jwtError.name);
      
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(400).json({ message: "Reset link has expired. Please request a new one." });
      }
      if (jwtError.name === 'JsonWebTokenError') {
        return res.status(400).json({ message: "Invalid reset link. Please request a new one." });
      }
      return res.status(400).json({ message: "Invalid token" });
    }

    console.log("🔄 Step 2: Finding user in database...");
    
    // User find karo - multiple ways try karo
    let user = await User.findOne({
      _id: decoded.id,
      resetToken: token
    });

    if (!user) {
      console.log("⚠️  User not found with exact token match, trying without token check...");
      // Alternative: Sirf user ID se find karo
      user = await User.findById(decoded.id);
      
      if (!user) {
        console.log("❌ User not found with ID:", decoded.id);
        return res.status(400).json({ message: "User not found" });
      }
      
      console.log("✅ User found by ID:", user.email);
      console.log("   - Stored resetToken:", user.resetToken ? "Exists" : "None");
      console.log("   - Token match:", user.resetToken === token);
      
      if (user.resetTokenExpiry) {
        console.log("   - Token expiry:", new Date(user.resetTokenExpiry).toLocaleString());
        console.log("   - Is expired?", Date.now() > user.resetTokenExpiry);
      }
    } else {
      console.log("✅ User found with token match:", user.email);
    }

    // Check if token expired (additional safety)
    if (user.resetTokenExpiry && Date.now() > user.resetTokenExpiry) {
      console.log("❌ Token expired in database");
      return res.status(400).json({ message: "Reset link has expired" });
    }

    console.log("🔄 Step 3: Resetting password...");
    
    // Password reset karo
    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    
    await user.save();
    console.log("✅ Password reset successful for:", user.email);

    // New token generate karo for auto login
    const newToken = jwt.sign(
      { userId: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: "24h" }
    );

    console.log("🎉 Password reset completed successfully");

    res.json({ 
      message: "Password reset successful!",
      token: newToken,
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        role: user.role 
      }
    });
    
  } catch (error) {
    console.error("💥 UNEXPECTED ERROR IN RESET PASSWORD:");
    console.error("   - Error:", error.message);
    console.error("   - Stack:", error.stack);
    
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

module.exports = router;