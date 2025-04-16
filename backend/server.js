
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const xlsx = require('xlsx');

// Routes Import
const homeRoutes = require("./routes/homeRoutes");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const authenticateUser = require("./middleware/authMiddleware");
const conferenceCategoryRoutes = require("./routes/ConferenceCategoryRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const aboutUsPageRoutes=require("./routes/aboutUsPageRoutes");

 
const User = require("./models/User");
const { DeliveryCharge, DefaultDeliveryCharge } = require("./models/DeliveryCharge");
const multer = require('multer');
const path = require("path");



dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express App
const app = express();

app.use(cors({
  origin: [
    process.env.FRONTEND_URL, 
     process.env.DEPLOYED_URL
  ], // ✅ Allow both local and deployed frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow cookies if required
  allowedHeaders: ["Content-Type", "Authorization"] // ✅ Add common headers
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



const sendEmail = (to, subject, text, attachments = []) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
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



const fs = require('fs');



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// app.post("/api/admin/update-status", upload.single('invoice'), async (req, res) => {
//   try {
//     const { userId, orderIndex, status, tracking } = req.body;
//     const invoiceFile = req.file;

//     console.log("Received request:", { userId, orderIndex, status, tracking, invoiceFile });

//     // Find user and validate
//     const user = await User.findById(userId);
//     if (!user) {
//       console.error("User not found:", userId);
//       return res.status(404).send("User not found");
//     }

//     // Validate order index
//     if (orderIndex < 0 || orderIndex >= user.orders.length) {
//       console.error("Order not found at index:", orderIndex);
//       return res.status(404).send("Order not found");
//     }

//     // Create update object
//     const updateObj = {};
//     const orderPath = `orders.${orderIndex}`;

//     // Generate order ID if needed
//     if (status === "Approved" && !user.orders[orderIndex].orderId) {
//       updateObj[`${orderPath}.orderId`] = `ORD${Date.now()}`;
//     }

//     // Handle Dispatch status requirements
//     if (status === "Dispatched") {
//       if (!invoiceFile || !tracking) {
//         console.error("Missing invoice or tracking details for dispatch.");
//         return res.status(400).json({ message: "Invoice and tracking details are required for dispatch" });
//       }

//       updateObj[`${orderPath}.payment.invoice`] = `/uploads/${invoiceFile.filename}`;
//       updateObj[`${orderPath}.payment.tracking`] = tracking;
//     }

//     // Always update status and timestamp
//     updateObj[`${orderPath}.payment.status`] = status;
//     updateObj[`${orderPath}.payment.updatedAt`] = new Date();

//     // Use findOneAndUpdate to ensure atomic update
//     const updatedUser = await User.findOneAndUpdate(
//       { _id: userId },
//       { $set: updateObj },
//       { new: true, runValidators: true }
//     ).populate({
//       path: "orders.cart.itemId",
//       model: "General"
//     });

//     if (!updatedUser) {
//       return res.status(404).send("User not found after update");
//     }

//     const updatedOrder = updatedUser.orders[orderIndex];

//     // Prepare email content
//     let subject = "";
//     let message = "";
//     let attachments = [];

//     const cartDetails = updatedOrder.cart.map(item => 
//       `${item.name} - ₹${item.price} x ${item.quantity}`
//     ).join('\n');

//     const totalAmount = updatedOrder.cart.reduce((total, item) => total + item.price * item.quantity, 0);

//     switch (status) {
//       case "Approved":
//         subject = "Your Order Has Been Approved";
//         message = `Your order has been approved successfully. Your Order ID is ${updatedOrder.orderId}.\n\n`;
//         message += `Cart Details:\n${cartDetails}\n\n`;
//         message += `Total Amount: ₹${totalAmount}`;
//         break;
//       case "Dispatched":
//         subject = "Your Order Has Been Dispatched";
//         message = `Your order has been dispatched successfully. Your Order ID is ${updatedOrder.orderId}.\n\n`;
//         message += `Cart Details:\n${cartDetails}\n\n`;
//         message += `Total Amount: ₹${totalAmount}\n\n`;
//         message += `Tracking Details: ${tracking}`;

//         if (invoiceFile) {
//           attachments.push({
//             filename: invoiceFile.originalname,
//             path: path.join(__dirname, '../uploads', invoiceFile.filename),
//           });
//         }
//         break;
//       case "Delivered":
//         subject = "Your Order Has Been Delivered";
//         message = `Your order has been delivered successfully. Your Order ID is ${updatedOrder.orderId}.\n\n`;
//         message += `Cart Details:\n${cartDetails}\n\n`;
//         message += `Total Amount: ₹${totalAmount}`;
//         break;
//       case "Cancelled":
//         subject = "Your Order Has Been Cancelled";
//         message = `Your order has been cancelled. We hope to serve you better in the future. Order ID: ${updatedOrder.orderId}.\n\n`;
//         message += `Cart Details:\n${cartDetails}\n\n`;
//         message += `Total Amount: ₹${totalAmount}`;
//         break;
//       default:
//         return res.status(400).send("Invalid status");
//     }

//     // Send email notification
//     await sendEmail(updatedUser.email, subject, message, attachments);

//     console.log(`Order status updated to ${status} for order ID: ${updatedOrder.orderId}`);

//     res.status(200).json({ 
//       message: `Order status updated to ${status}`,
//       updatedOrder
//     });

//   } catch (error) {
//     console.error("Error updating status:", error);
//     res.status(500).send("Internal server error");
//   }
// });

app.post("/api/admin/update-status", upload.single('invoice'), async (req, res) => {
  try {
    // Accept orderId (the MongoDB subdocument _id) instead of orderIndex
    const { userId, orderId, status, tracking } = req.body;
    const invoiceFile = req.file;

    // Find the user
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    // Find the order by its _id
    const order = user.orders.id(orderId);
    if (!order) return res.status(404).send("Order not found");

    // Generate orderId if status is Approved and not already set
    if (status === "Approved" && !order.orderId) {
      order.orderId = `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;
    }

    // Handle Dispatched status: require invoice and tracking
    if (status === "Dispatched") {
      if (!invoiceFile || !tracking) {
        return res.status(400).json({ message: "Invoice and tracking details are required for dispatch" });
      }
      order.payment.invoice = `/uploads/${invoiceFile.filename}`;
      order.payment.tracking = tracking;
    }

    // Always update status and updatedAt
    order.payment.status = status;
    order.payment.updatedAt = new Date();

    await user.save();

    // Prepare email content
    let subject = "";
    let message = "";
    let attachments = [];

    const cartDetails = order.cart.map(item =>
      `${item.name} - ₹${item.price} x ${item.quantity}`
    ).join('\n');

    const totalAmount = order.cart.reduce((total, item) => total + item.price * item.quantity, 0);

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
        if (invoiceFile) {
          attachments.push({
            filename: invoiceFile.originalname,
            path: path.join(__dirname, 'uploads', invoiceFile.filename),
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

    // Send email notification
    await sendEmail(user.email, subject, message, attachments);

    res.status(200).json({
      message: `Order status updated to ${status}`,
      updatedOrder: order
    });

  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).send("Internal server error");
  }
});


app.get("/api/admin/orders", async (req, res) => {
  try {
    const users = await User.find({ "orders.payment.screenshot": { $exists: true, $ne: "" } })
      .select("name email address orders")
      .populate({
        path: "orders.cart.itemId",
        model: "General",
      })
      .lean();

    const processedUsers = users.map(user => {
      const sortedOrders = [...user.orders].sort((a, b) => {
        return new Date(b.payment?.createdAt || 0) - new Date(a.payment?.createdAt || 0);
      });
      
      return {
        ...user,
        orders: sortedOrders.map(order => ({
          ...order,
          orderId: order.orderId || order.tempOrderId || null
        }))
      };
    });

    processedUsers.sort((a, b) => {
      const aLatest = a.orders[0]?.payment?.createdAt || 0;
      const bLatest = b.orders[0]?.payment?.createdAt || 0;
      return new Date(bLatest) - new Date(aLatest);
    });

    res.json(processedUsers);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send("Server error");
  }
});

// app.get("/api/admin/orders", async (req, res) => {
//   try {
//     const users = await User.find({ "orders.payment.screenshot": { $exists: true, $ne: "" } })
//       .select("name email address orders")
//       .populate({
//         path: "orders.cart.itemId",
//         model: "General",
//       })
//       .lean();

//     const processedUsers = users.map(user => {
//       const sortedOrders = [...user.orders].sort((a, b) => {
//         return new Date(b.payment?.createdAt || 0) - new Date(a.payment?.createdAt || 0);
//       });
      
//       return {
//         ...user,
//         orders: sortedOrders.map(order => ({
//           ...order,
//           orderId: order.orderId || order.tempOrderId || null,
//           createdAt: order.payment?.createdAt || new Date(0) // Add createdAt to each order
//         }))
//       };
//     });

//     processedUsers.sort((a, b) => {
//       const aLatest = a.orders[0]?.createdAt || 0;
//       const bLatest = b.orders[0]?.createdAt || 0;
//       return new Date(bLatest) - new Date(aLatest);
//     });

//     res.json(processedUsers);
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     res.status(500).send("Server error");
//   }
// });



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

const General = require("./models/General");
const Conference = require("./models/Conference");

app.post("/admin/general/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // 1. Read Excel File
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    let sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (sheetData.length === 0) {
      return res.status(400).json({ error: "Empty sheet" });
    }

    // 2. Normalize Excel Data (Match Schema Fields)
    const normalizedData = sheetData.map((row) => {
      return {
        type: row.type || row.Type || "", // Handle different Excel column cases
        title: row.title || row.Title || "",
        author: row.author || row.Author || "",
        category: row.category || row.Category || "",
        price: Number(row.price || row.Price || 0),
        stock: Number(row.stock || row.Stock || 0),
        isbn: row.isbn || row.ISBN || "",
        coverImage: row.coverImage || row["Cover Image"] || "",
        backImage: row.backImage || row["Back Image"] || "",
        discount: Number(row.discount || row.Discount || 0),
        coverType: row.coverType || row["Cover Type"] || "",
      };
    });

    // 3. Filter Valid Data (Ensure Required Fields Exist)
    const validData = normalizedData.filter(
      (item) => item.title && item.type // Example: Require 'title' and 'type'
    );

    if (validData.length === 0) {
      return res.status(400).json({ error: "No valid data found (missing required fields)" });
    }

    // 4. Bulk Insert/Update (Upsert)
    const bulkOps = validData.map((item) => ({
      updateOne: {
        filter: { title: item.title }, // Use 'title' as the unique key
        update: { $set: item },
        upsert: true, // Insert if not found, else update
      },
    }));

    // 5. Execute Database Operations
    const result = await General.bulkWrite(bulkOps);
    console.log("Database update result:", result);

    // 6. Cleanup: Delete the uploaded file
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      message: "Data processed successfully!",
      inserted: result.upsertedCount,
      updated: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error processing file:", error);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path); // Cleanup on error
    }
    res.status(500).json({ error: "Failed to process file" });
  }
});


// Get all books
app.get("/admin/general/books", async (req, res) => {
  try {
    const books = await General.find({});
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// Get single book
app.get("/admin/general/books/:id", async (req, res) => {
  try {
    const book = await General.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.status(200).json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ error: "Failed to fetch book" });
  }
});

// Update book
app.put("/admin/general/books/:id", async (req, res) => {
  try {
    const updatedBook = await General.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBook) return res.status(404).json({ error: "Book not found" });
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ error: "Failed to update book" });
  }
});

// Delete book
app.delete("/admin/general/books/:id", async (req, res) => {
  try {
    const deletedBook = await General.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ error: "Book not found" });
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Failed to delete book" });
  }
});



app.post("/admin/conference/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // 1. Read Excel File
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    let sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (sheetData.length === 0) {
      return res.status(400).json({ error: "Empty sheet" });
    }

    // 2. Normalize Excel Data (Match Schema Fields)
    const normalizedData = sheetData.map((row) => {
      return {
        type: row.type || row.Type || "", // Handle different Excel column cases
        title: row.title || row.Title || "",
        author: row.author || row.Author || "",
        category: row.category || row.Category || "",
        price: Number(row.price || row.Price || 0),
        stock: Number(row.stock || row.Stock || 0),
        isbn: row.isbn || row.ISBN || "",
        coverImage: row.coverImage || row["Cover Image"] || "",
        backImage: row.backImage || row["Back Image"] || "",
        discount: Number(row.discount || row.Discount || 0),
        coverType: row.coverType || row["Cover Type"] || "",
      };
    });

    // 3. Filter Valid Data (Ensure Required Fields Exist)
    const validData = normalizedData.filter(
      (item) => item.title && item.type // Example: Require 'title' and 'type'
    );

    if (validData.length === 0) {
      return res.status(400).json({ error: "No valid data found (missing required fields)" });
    }

    // 4. Bulk Insert/Update (Upsert)
    const bulkOps = validData.map((item) => ({
      updateOne: {
        filter: { title: item.title }, // Use 'title' as the unique key
        update: { $set: item },
        upsert: true, // Insert if not found, else update
      },
    }));

    // 5. Execute Database Operations
    const result = await Conference.bulkWrite(bulkOps);
    console.log("Database update result:", result);

    // 6. Cleanup: Delete the uploaded file
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      message: "Data processed successfully!",
      inserted: result.upsertedCount,
      updated: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error processing file:", error);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path); // Cleanup on error
    }
    res.status(500).json({ error: "Failed to process file" });
  }
});


app.get("/admin/conference/books", async (req, res) => {
  try {
    const books = await Conference.find({});
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching conference books:", error);
    res.status(500).json({ error: "Failed to fetch conference books" });
  }
});

// Get single conference book
app.get("/admin/conference/books/:id", async (req, res) => {
  try {
    const book = await Conference.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Conference book not found" });
    res.status(200).json(book);
  } catch (error) {
    console.error("Error fetching conference book:", error);
    res.status(500).json({ error: "Failed to fetch conference book" });
  }
});

// Update conference book
app.put("/admin/conference/books/:id", async (req, res) => {
  try {
    const updatedBook = await Conference.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBook) return res.status(404).json({ error: "Conference book not found" });
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Error updating conference book:", error);
    res.status(500).json({ error: "Failed to update conference book" });
  }
});

// Delete conference book
app.delete("/admin/conference/books/:id", async (req, res) => {
  try {
    const deletedBook = await Conference.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ error: "Conference book not found" });
    res.status(200).json({ message: "Conference book deleted successfully" });
  } catch (error) {
    console.error("Error deleting conference book:", error);
    res.status(500).json({ error: "Failed to delete conference book" });
  }
});


app.use(express.static(path.join(__dirname, 'public')));
/// API Routes
app.use("/api/home", homeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", conferenceCategoryRoutes);
app.use("/api", paymentRoutes);
app.use("/api", aboutUsPageRoutes);

app.get('*', (req, res) => {
  // If the request starts with /api or /uploads, skip to next middleware/route
  if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
    return res.status(404).send("Not found");
  }
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));





