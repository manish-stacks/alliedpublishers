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

 
const User = require("./models/User");
const { DeliveryCharge, DefaultDeliveryCharge } = require("./models/DeliveryCharge");
const multer = require('multer');
const path = require("path");



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
app.use('/uploads', express.static('uploads'));

app.use(express.json({ limit: "50mb" })); // For JSON payloads
app.use(express.urlencoded({ limit: "50mb", extended: true })); // For URL-encoded payloads
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Sample Route (Home)
app.get("/", (req, res) => {
  res.send("Backend is Running!");
});


const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// const sendEmail = (to, subject, text, attachments = []) => {
//   const mailOptions = {
//     from: 'avant.publishing.services@gmail.com',
//     to,
//     subject,
//     text,
//     attachments, // Attach invoice PDF if provided
//   };

//   return transporter.sendMail(mailOptions)
//     .then(() => {
//       console.log('Email sent successfully!');
//     })
//     .catch((error) => {
//       console.error('Error sending email:', error);
//     });
// };

// module.exports = sendEmail;

const sendEmail = (to, subject, text, attachments = []) => {
  const mailOptions = {
    from: 'avant.publishing.services@gmail.com',
    to,
    subject,
    text,
    attachments, // Attach invoice PDF if provided
  };

  return transporter.sendMail(mailOptions)
    .then(() => {
      console.log('Email sent successfully!');
    })
    .catch((error) => {
      console.error('Error sending email:', error);
    });
};

module.exports = sendEmail;




// app.post("/api/cart/add-to-cart", authenticateUser, async (req, res) => {
//   const { itemId, name, price, quantity } = req.body;
//   const user = await User.findById(req.userId);
//   const itemIndex = user.orders.cart.findIndex((item) => item.itemId.equals(itemId));

//   if (itemIndex > -1) {
//     user.cart[itemIndex].quantity += quantity;
//   } else {
//     user.cart.push({ itemId, name, price, quantity });
//   }

//   await user.save();
//   res.send("Item added to cart");
// });

// app.post("/api/cart/add-to-cart", authenticateUser, async (req, res) => {
//   const { itemId, name, price, quantity } = req.body;
//   const user = await User.findById(req.userId);

//   if (!user) {
//     return res.status(404).send("User not found");
//   }

//   // Find or create an active order (e.g., with "Pending" status)
//   let activeOrder = user.orders.find(
//     (order) => order.payment.status === "Pending"
//   );

//   if (!activeOrder) {
//     // Create a new order if no active order exists
//     activeOrder = {
//       orderId: null, // Will be generated when the order is approved
//       cart: [],
//       payment: {
//         screenshot: "",
//         status: "Pending",
//         createdAt: new Date(),
//       },
//     };
//     user.orders.push(activeOrder);
//   }

//   // Find the item in the cart of the active order
//   const itemIndex = activeOrder.cart.findIndex((item) =>
//     item.itemId.equals(itemId)
//   );

//   if (itemIndex > -1) {
//     // If the item already exists in the cart, update the quantity
//     activeOrder.cart[itemIndex].quantity += quantity;
//   } else {
//     // If the item does not exist in the cart, add it
//     activeOrder.cart.push({ itemId, name, price, quantity });
//   }

//   await user.save();
//   res.send("Item added to cart");
// });

app.post("/api/cart/add-to-cart", authenticateUser, async (req, res) => {
  const { itemId, name, price, quantity } = req.body;

  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Initialize the `orders` array if it doesn't exist
    if (!user.orders) {
      user.orders = [];
    }

    // Find or create an active order (e.g., with "Pending" status)
    let activeOrder = user.orders.find(
      (order) => order.payment.status === "Pending"
    );

    if (!activeOrder) {
      // Create a new order if no active order exists
      activeOrder = {
        orderId: null, // Will be generated when the order is approved
        cart: [],
        payment: {
          screenshot: "",
          status: "Pending",
          createdAt: new Date(),
        },
      };
      user.orders.push(activeOrder);
    }

    // Find the item in the cart of the active order
    const itemIndex = activeOrder.cart.findIndex((item) =>
      item.itemId.equals(itemId)
    );

    if (itemIndex > -1) {
      // If the item already exists in the cart, update the quantity
      activeOrder.cart[itemIndex].quantity += quantity;
    } else {
      // If the item does not exist in the cart, add it
      activeOrder.cart.push({ itemId, name, price, quantity });
    }

    await user.save();
    res.send("Item added to cart");
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).send("Server error");
  }
});

// app.get("/api/cart", authenticateUser, async (req, res) => {
//   const user = await User.findById(req.userId).populate("cart.itemId");
//   if (!user) {
//     return res.status(404).send("User not found");
//   }
//   res.json(user.cart);
// });

app.get("/api/cart", authenticateUser, async (req, res) => {
  try {
    // Find the user and populate the cart items in the active order
    const user = await User.findById(req.userId)
      .populate({
        path: "orders.cart.itemId", // Populate the itemId in the cart of each order
        model: "General", // Reference to the General model
      });

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Find the active order (e.g., with "Pending" status)
    const activeOrder = user.orders.find(
      (order) => order.payment.status === "Pending"
    );

    if (!activeOrder) {
      return res.status(404).send("No active order found");
    }

    // Return the cart of the active order
    res.json(activeOrder.cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).send("Server error");
  }
});


// app.delete("/api/cart/:itemId", authenticateUser, async (req, res) => {
//   const { itemId } = req.params;
//   const user = await User.findById(req.userId);

//   if (!user) {
//     return res.status(404).send("User not found");
//   }

//   user.cart = user.orders.cart.filter((item) => item._id.toString() !== itemId);
//   await user.save();

//   res.send("Item removed from cart");
// });

app.delete("/api/cart/:itemId", authenticateUser, async (req, res) => {
  const { itemId } = req.params;

  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Find the active order (e.g., with "Pending" status)
    const activeOrder = user.orders.find(
      (order) => order.payment.status === "Pending"
    );

    if (!activeOrder) {
      return res.status(404).send("No active order found");
    }

    // Remove the item from the cart of the active order
    activeOrder.cart = activeOrder.cart.filter(
      (item) => item._id.toString() !== itemId
    );

    await user.save();
    res.send("Item removed from cart");
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).send("Server error");
  }
});




// app.put("/api/cart/:itemId", authenticateUser, async (req, res) => {
//   const { itemId } = req.params;
//   const { quantity } = req.body;
//   const user = await User.findById(req.userId);

//   if (!user) {
//     return res.status(404).send("User not found");
//   }

//   const cartItem = user.cart.find((item) => item._id.toString() === itemId);

//   if (!cartItem) {
//     return res.status(404).send("Item not found in cart");
//   }

//   cartItem.quantity = quantity;
//   await user.save();

//   res.send("Quantity updated");
// });

app.put("/api/cart/:itemId", authenticateUser, async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Find the active order (e.g., with "Pending" status)
    const activeOrder = user.orders.find(
      (order) => order.payment.status === "Pending"
    );

    if (!activeOrder) {
      return res.status(404).send("No active order found");
    }

    // Find the item in the cart of the active order
    const cartItem = activeOrder.cart.find((item) =>
      item._id.toString() === itemId
    );

    if (!cartItem) {
      return res.status(404).send("Item not found in cart");
    }

    // Update the quantity
    cartItem.quantity = quantity;
    await user.save();

    res.send("Quantity updated");
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    res.status(500).send("Server error");
  }
});


app.get("/api/user", authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("email address");
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Save or update address
app.post("/api/address", authenticateUser, async (req, res) => {
  try {
    const { street, city, state, zipCode } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).send("User not found");

    user.address = { street, city, state, zipCode };
    await user.save();
    res.send("Address saved successfully");
  } catch (error) {
    res.status(500).send("Server error");
  }
});


// const storage = multer.diskStorage({
//   destination: "./uploads/",
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({ storage });



app.post("/api/payment", authenticateUser, upload.single("screenshot"), async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Find the active order (e.g., with "Pending" status)
    const activeOrder = user.orders.find(
      (order) => order.payment.status === "Pending"
    );

    if (!activeOrder) {
      return res.status(404).send("No active order found");
    }

    // Update the payment details for the active order
    activeOrder.payment.screenshot = `/uploads/${req.file.filename}`;
    activeOrder.payment.createdAt = new Date();
    activeOrder.payment.status = "Pending";

    await user.save();

    res.json({ message: "Payment uploaded successfully", status: "Pending" });
  } catch (error) {
    console.error("Error uploading payment:", error);
    res.status(500).send("Server error");
  }
});

// app.post("/api/payment", authenticateUser, upload.single("screenshot"), async (req, res) => {
//   try {
//     const user = await User.findById(req.userId);
//     if (!user) {
//       return res.status(404).send("User not found");
//     }

//     // Generate a temporary order ID
//     const tempOrderId = `TEMP-${Date.now()}`;

//     // Create a new order with temporary ID
//     const newOrder = {
//       tempOrderId,
//       cart: user.cart, // Assuming the cart is stored in the user document
//       payment: {
//         screenshot: `/uploads/${req.file.filename}`,
//         status: "Pending",
//         createdAt: new Date(),
//       },
//     };

//     // Add the new order to the user's orders array
//     user.orders.push(newOrder);
//     await user.save();

//     res.json({
//       message: "Payment uploaded successfully",
//       tempOrderId,
//       status: "Pending",
//     });
//   } catch (error) {
//     console.error("Error uploading payment:", error);
//     res.status(500).send("Server error");
//   }
// });

app.get("/api/order/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find the user with the matching order ID (temporary or permanent)
    const user = await User.findOne({
      $or: [{ "orders.tempOrderId": orderId }, { "orders.orderId": orderId }],
    });

    if (!user) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Find the specific order
    const order = user.orders.find(
      (order) => order.tempOrderId === orderId || order.orderId === orderId
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/admin/orders", async (req, res) => {
  try {
    const users = await User.find({ "orders.payment.screenshot": { $exists: true, $ne: "" } })
      .select("name email address orders") // Include the orders array in the response
      .populate({
        path: "orders.cart.itemId", // Correct path for population
        model: "General", // The model to populate
      });

    res.json(users);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send("Server error");
  }
});


const fs = require('fs');



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.post("/api/admin/update-status", upload.single('invoice'), async (req, res) => {
  try {
    const { userId, orderIndex, status, tracking } = req.body;
    const invoiceFile = req.file; // Access the uploaded file

    console.log("Received request:", { userId, orderIndex, status, tracking, invoiceFile });

    const user = await User.findById(userId);
    if (!user) {
      console.error("User not found:", userId);
      return res.status(404).send("User not found");
    }

    const order = user.orders[orderIndex];
    if (!order) {
      console.error("Order not found at index:", orderIndex);
      return res.status(404).send("Order not found");
    }

    // Generate order ID if status is "Approved" and orderId is not already set
    if (status === "Approved" && !order.orderId) {
      order.orderId = `ORD${Date.now()}`; // Simple order ID generation
    }

    // Handle Dispatch status: Require invoice and tracking
    if (status === "Dispatched") {
      if (!invoiceFile || !tracking) {
        console.error("Missing invoice or tracking details for dispatch.");
        return res.status(400).json({ message: "Invoice and tracking details are required for dispatch" });
      }

      // Save the invoice file path and tracking details
      order.payment.invoice = `/uploads/${invoiceFile.filename}`; // Save the file path
      order.payment.tracking = tracking;
    }

    // Update the status
    order.payment.status = status;
    await user.save();

    let subject = "";
    let message = "";
    let attachments = [];

    // Generate cart details and total amount
    const cartDetails = order.cart.map((item) => {
      return `${item.name} - ₹${item.price} x ${item.quantity}`;
    }).join('\n');

    const totalAmount = order.cart.reduce((total, item) => total + item.price * item.quantity, 0);

    // Email messages for different statuses
    switch (status) {
      case "Approved":
        subject = "Your Order Has Been Approved";
        message = `Your order has been approved successfully. Your Order ID is ${order.orderId}.\n\n`;
        message += `Cart Details:\n${cartDetails}\n\n`;
        message += `Total Amount: ₹${totalAmount}`;
        break;
      case "Dispatched":
        subject = "Your Order Has Been Dispatched";
        message = `Your order has been dispatched successfully. Your Order ID is ${order.orderId}.\n\n`;
        message += `Cart Details:\n${cartDetails}\n\n`;
        message += `Total Amount: ₹${totalAmount}\n\n`;
        message += `Tracking Details: ${tracking}`;

        // Attach the invoice file to the email
        if (invoiceFile) {
          attachments.push({
            filename: invoiceFile.originalname, // Use the original filename
            path: path.join(__dirname, 'uploads', invoiceFile.filename), // Full path to the file
          });
        }
        break;
      case "Delivered":
        subject = "Your Order Has Been Delivered";
        message = `Your order has been delivered successfully. Your Order ID is ${order.orderId}.\n\n`;
        message += `Cart Details:\n${cartDetails}\n\n`;
        message += `Total Amount: ₹${totalAmount}`;
        break;
      case "Cancelled":
        subject = "Your Order Has Been Cancelled";
        message = `Your order has been cancelled. We hope to serve you better in the future. Order ID: ${order.orderId}.\n\n`;
        message += `Cart Details:\n${cartDetails}\n\n`;
        message += `Total Amount: ₹${totalAmount}`;
        break;
      default:
        return res.status(400).send("Invalid status");
    }

    // Send email notification with attachments
    await sendEmail(user.email, subject, message, attachments);

    console.log(`Order status updated to ${status} for order ID: ${order.orderId}`);

    // Respond back to the client
    res.status(200).json({ message: `Order status updated to ${status}` });

  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).send("Internal server error");
  }
});



// GET /api/cart/total
app.get("/api/cart/total", authenticateUser, async (req, res) => {
  try {
    // Fetch the user based on the authenticated userId
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Initialize cart total and delivery charges
    let cartTotal = 0;
    let deliveryCharges = 0;

    // Find the active order (e.g., with "Pending" status)
    const activeOrder = user.orders.find(
      (order) => order.payment.status === "Pending"
    );

    if (activeOrder) {
      // Calculate cart total
      activeOrder.cart.forEach((item) => {
        cartTotal += item.price * item.quantity;
      });

      // Get delivery charges from the active order's payment object
      deliveryCharges = activeOrder.payment.deliveryCharges || 0;
    }

    // Calculate total amount (cart total + delivery charges)
    const totalAmount = cartTotal + deliveryCharges;

    // Return the cart total, delivery charges, and total amount
    res.json({ cartTotal, deliveryCharges, totalAmount });
  } catch (error) {
    console.error("Error fetching cart total:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});



app.get("/api/delivery", async (req, res) => {
  try {
    const charges = await DeliveryCharge.find();
    res.json(charges);
  } catch (error) {
    console.error("Error fetching delivery charges:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST /api/admin/delivery
app.post("/api/admin/delivery", async (req, res) => {
  const { pincode, charge } = req.body;

  try {
    const newCharge = new DeliveryCharge({ pincode, charge });
    await newCharge.save();
    res.status(201).json(newCharge);
  } catch (error) {
    console.error("Error adding delivery charge:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/delivery/:pincode", async (req, res) => {
  const { pincode } = req.params;

  try {
    // Find the delivery charge for the specific pincode
    const deliveryCharge = await DeliveryCharge.findOne({ pincode });

    if (deliveryCharge) {
      // Return the specific delivery charge
      return res.json({ charge: deliveryCharge.charge });
    }

    // If pincode not found, return the default delivery charge
    const defaultCharge = await DefaultDeliveryCharge.findOne();
    res.json({ charge: defaultCharge?.defaultCharge || 0 });
  } catch (error) {
    console.error("Error fetching delivery charge:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT /api/admin/delivery/:pincode
app.put("/api/admin/delivery/:pincode", async (req, res) => {
  const { pincode } = req.params;
  const { charge } = req.body;

  try {
    const updatedCharge = await DeliveryCharge.findOneAndUpdate(
      { pincode },
      { charge },
      { new: true }
    );
    res.json(updatedCharge);
  } catch (error) {
    console.error("Error updating delivery charge:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE /api/admin/delivery/:pincode
app.delete("/api/admin/delivery/:pincode", async (req, res) => {
  const { pincode } = req.params;

  try {
    await DeliveryCharge.findOneAndDelete({ pincode });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting delivery charge:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// POST /api/admin/delivery/default
app.post("/api/admin/delivery/default", async (req, res) => {
  const { defaultCharge } = req.body;

  try {
    let defaultDeliveryCharge = await DefaultDeliveryCharge.findOne();
    if (!defaultDeliveryCharge) {
      defaultDeliveryCharge = new DefaultDeliveryCharge({ defaultCharge });
    } else {
      defaultDeliveryCharge.defaultCharge = defaultCharge;
    }
    await defaultDeliveryCharge.save();
    res.json(defaultDeliveryCharge);
  } catch (error) {
    console.error("Error setting default delivery charge:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/delivery/default", async (req, res) => {
  try {
    const defaultCharge = await DefaultDeliveryCharge.findOne();
    res.json({ defaultCharge: defaultCharge?.defaultCharge || 0 });
  } catch (error) {
    console.error("Error fetching default delivery charge:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT /api/admin/delivery/default
app.put("/api/admin/delivery/default", async (req, res) => {
  const { defaultCharge } = req.body;

  try {
    let defaultDeliveryCharge = await DefaultDeliveryCharge.findOne();
    if (!defaultDeliveryCharge) {
      defaultDeliveryCharge = new DefaultDeliveryCharge({ defaultCharge });
    } else {
      defaultDeliveryCharge.defaultCharge = defaultCharge;
    }
    await defaultDeliveryCharge.save();
    res.json(defaultDeliveryCharge);
  } catch (error) {
    console.error("Error updating default delivery charge:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



/// API Routes
app.use("/api/home", homeRoutes);
app.use("/api/auth", authRoutes);

// if(process.env.NODE_ENV === "production"){
//   const dirpath = path.resolve();
//   app.use(express.static("frontend/dist"));
//   app.get("*",(req,res) => {
//     res.sendFile(path.resolve(dirpath,"frontend","dist","index.html"));
//   })
// }

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));