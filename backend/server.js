// const express = require("express");
// const cors = require("cors");  // Already installed
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");


// // Routes Import
// const homeRoutes = require("./routes/homeRoutes");
// const authRoutes = require("./routes/authRoutes");

// dotenv.config();

// // Connect to MongoDB
// connectDB();

// // Initialize Express App
// const app = express();

// // CORS middleware setup - allow frontend to access the backend
// app.use(cors({
//   origin: "http://localhost:3000", // Allow requests from your frontend
//   methods: ["GET", "POST", "PUT", "DELETE"],        // Allow these HTTP methods
//   credentials: true                // Allow cookies if required
// }));

// app.use(express.json());

// // Sample Route (Home)
// app.get("/", (req, res) => {
//   res.send("Backend is Running!");
// });

// // API Routes
// app.use("/api/home", homeRoutes);
// app.use("/api/auth", authRoutes); 



// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));




// const express = require("express");
// const cors = require("cors");  // Already installed
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");
// const bodyParser = require("body-parser");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");



// // Routes Import
// const homeRoutes = require("./routes/homeRoutes");
// const authRoutes = require("./routes/authRoutes");
// const authenticateUser = require("./middleware/authMiddleware");

// dotenv.config();

// // Connect to MongoDB
// connectDB();

// // Initialize Express App
// const app = express();

// // CORS middleware setup - allow frontend to access the backend
// app.use(cors({
//   origin: "http://localhost:3000", // Allow requests from your frontend
//   methods: ["GET", "POST", "PUT", "DELETE"],        // Allow these HTTP methods
//   credentials: true                // Allow cookies if required
// }));

// app.use(express.json());

// // Sample Route (Home)
// app.get("/", (req, res) => {
//   res.send("Backend is Running!");
// });
// app.post("/add-to-cart", authenticateUser, async (req, res) => {
//   const { itemId, quantity } = req.body;
//   const user = await User.findById(req.userId);
//   const itemIndex = user.cart.findIndex((item) => item.itemId.equals(itemId));

//   if (itemIndex > -1) {
//     user.cart[itemIndex].quantity += quantity;
//   } else {
//     user.cart.push({ itemId, quantity });
//   }

//   await user.save();
//   res.send("Item added to cart");
// });

// // Fetch Cart Route
// app.get("/cart", authenticateUser, async (req, res) => {
//   const user = await User.findById(req.userId).populate("cart.itemId");
//   if (!user) {
//     return res.status(404).send("User not found");
//   }
//   console.log(user.cart); // Log the cart data
//   res.json(user.cart);
// });
// // Remove item from cart
// app.delete("/cart/:itemId", authenticateUser, async (req, res) => {
//   const { itemId } = req.params;
//   const user = await User.findById(req.userId);

//   if (!user) {
//     return res.status(404).send("User not found");
//   }

//   // Remove the item from the cart
//   user.cart = user.cart.filter((item) => item._id.toString() !== itemId);
//   await user.save();

//   res.send("Item removed from cart");
// });


// // API Routes
// app.use("/api/home", homeRoutes);
// app.use("/api/auth", authRoutes); 



// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");
// const bodyParser = require("body-parser");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

// // Routes Import
// const homeRoutes = require("./routes/homeRoutes");
// const authRoutes = require("./routes/authRoutes");
// const authenticateUser = require("./middleware/authMiddleware");

// // Import the User model
// const User = require("./models/User");

// dotenv.config();

// // Connect to MongoDB
// connectDB();

// // Initialize Express App
// const app = express();

// // CORS middleware setup - allow frontend to access the backend
// app.use(cors({
//   origin: "http://localhost:3000", // Allow requests from your frontend
//   methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
//   credentials: true // Allow cookies if required
// }));

// app.use(express.json());

// // Sample Route (Home)
// app.get("/", (req, res) => {
//   res.send("Backend is Running!");
// });

// // Cart Routes
// app.post("/api/cart/add-to-cart", authenticateUser, async (req, res) => {
//   const { itemId, quantity } = req.body;
//   const user = await User.findById(req.userId);
//   const itemIndex = user.cart.findIndex((item) => item.itemId.equals(itemId));

//   if (itemIndex > -1) {
//     user.cart[itemIndex].quantity += quantity;
//   } else {
//     user.cart.push({ itemId, quantity });
//   }

//   await user.save();
//   res.send("Item added to cart");
// });

// app.get("/api/cart", authenticateUser, async (req, res) => {
//   const user = await User.findById(req.userId).populate("cart.itemId");
//   if (!user) {
//     return res.status(404).send("User not found");
//   }
//   console.log(user.cart); // Log the cart data
//   res.json(user.cart);
// });

// app.delete("/api/cart/:itemId", authenticateUser, async (req, res) => {
//   const { itemId } = req.params;
//   // const { quantity } = req.body;
//   const user = await User.findById(req.userId);

//   if (!user) {
//     return res.status(404).send("User not found");
//   }

//   // Remove the item from the cart
//   user.cart = user.cart.filter((item) => item._id.toString() !== itemId);
//   await user.save();

//   res.send("Item removed from cart");
// });

// // API Routes
// app.use("/api/home", homeRoutes);
// app.use("/api/auth", authRoutes);

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Routes Import
const homeRoutes = require("./routes/homeRoutes");
const authRoutes = require("./routes/authRoutes");
const authenticateUser = require("./middleware/authMiddleware");

// Import the User model
const User = require("./models/User");

dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express App
const app = express();

// CORS middleware setup - allow frontend to access the backend
app.use(cors({
  origin: "http://localhost:3000", // Allow requests from your frontend
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
  credentials: true // Allow cookies if required
}));

app.use(express.json());

// Sample Route (Home)
app.get("/", (req, res) => {
  res.send("Backend is Running!");
});

// Cart Routes
app.post("/api/cart/add-to-cart", authenticateUser, async (req, res) => {
  const { itemId, quantity } = req.body;
  const user = await User.findById(req.userId);
  const itemIndex = user.cart.findIndex((item) => item.itemId.equals(itemId));

  if (itemIndex > -1) {
    user.cart[itemIndex].quantity += quantity;
  } else {
    user.cart.push({ itemId, quantity });
  }

  await user.save();
  res.send("Item added to cart");
});

app.get("/api/cart", authenticateUser, async (req, res) => {
  const user = await User.findById(req.userId).populate("cart.itemId");
  if (!user) {
    return res.status(404).send("User not found");
  }
  console.log(user.cart); // Log the cart data
  res.json(user.cart);
});

app.delete("/api/cart/:itemId", authenticateUser, async (req, res) => {
  const { itemId } = req.params;
  const user = await User.findById(req.userId);

  if (!user) {
    return res.status(404).send("User not found");
  }

  // Remove the item from the cart
  user.cart = user.cart.filter((item) => item._id.toString() !== itemId);
  await user.save();

  res.send("Item removed from cart");
});

// Update item quantity in cart
app.put("/api/cart/:itemId", authenticateUser, async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;
  const user = await User.findById(req.userId);

  if (!user) {
    return res.status(404).send("User not found");
  }

  // Find the item in the cart
  const cartItem = user.cart.find((item) => item._id.toString() === itemId);

  if (!cartItem) {
    return res.status(404).send("Item not found in cart");
  }

  // Update the quantity
  cartItem.quantity = quantity;
  await user.save();

  res.send("Quantity updated");
});

// API Routes
app.use("/api/home", homeRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));