const express = require("express");
const cors = require("cors");  // Already installed
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Routes Import
const homeRoutes = require("./routes/homeRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express App
const app = express();

// CORS middleware setup - allow frontend to access the backend
app.use(cors({
  origin: "http://localhost:3000", // Allow requests from your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],        // Allow these HTTP methods
  credentials: true                // Allow cookies if required
}));

app.use(express.json());

// Sample Route (Home)
app.get("/", (req, res) => {
  res.send("Backend is Running!");
});

// API Routes
app.use("/api/home", homeRoutes);
app.use("/api/auth", authRoutes);  // Home page routes for locations, books, and authors

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
