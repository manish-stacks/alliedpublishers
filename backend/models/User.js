


// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   address: {
//     street: String,
//     city: String,
//     state: String,
//     zipCode: String,
//   },
//   orders: [
//     {
//       orderId: { type: String, unique: true },
//       cart: [
//         {
//           itemId: { type: mongoose.Schema.Types.ObjectId, ref: "General" },
//           name: String,      // Store item name
//           price: Number,     // Store item price
//           quantity: Number,  // Store item quantity
//         },
//       ],
//       payment: {
//         screenshot: String,
//         invoice: { type: String, default: "" },   // Field to store invoice information or file path
//         tracking: { type: String, default: "" },  // Field to store tracking details
//         createdAt: { type: Date, default: Date.now },
//         status: {
//           type: String,
//           enum: ["Pending", "Approved", "Dispatched", "Delivered", "Cancelled"],
//           default: "Pending",
//         },
//       },
//     },
//   ],
// });

// module.exports = mongoose.model("User", UserSchema);


// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   address: {
//     street: String,
//     city: String,
//     state: String,
//     zipCode: String,
//   },
//   orders: [
//     {
//       tempOrderId: { type: String, unique: true }, // Temporary order ID
//       orderId: { type: String, unique: true, sparse: true }, // Permanent order ID (optional)
//       cart: [
//         {
//           itemId: { type: mongoose.Schema.Types.ObjectId, ref: "General" },
//           name: String, // Store item name
//           price: Number, // Store item price
//           quantity: Number, // Store item quantity
//         },
//       ],
//       payment: {
//         screenshot: String,
//         invoice: { type: String, default: "" }, // Field to store invoice information or file path
//         tracking: { type: String, default: "" }, // Field to store tracking details
//         createdAt: { type: Date, default: Date.now },
//         status: {
//           type: String,
//           enum: ["Pending", "Approved", "Dispatched", "Delivered", "Cancelled"],
//           default: "Pending",
//         },
//       },
//     },
//   ],
// });

// module.exports = mongoose.model("User", UserSchema);


const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  orders: [
    {
      tempOrderId: { type: String, unique: true },
      orderId: { type: String, unique: true, sparse: true },
      cart: [
        {
          itemId: { type: mongoose.Schema.Types.ObjectId, ref: "General" },
          name: String,
          price: Number,
          quantity: Number,
        },
      ],
      payment: {
        screenshot: String,
        invoice: { type: String, default: "" },
        tracking: { type: String, default: "" },
        createdAt: { type: Date, default: Date.now },
        status: {
          type: String,
          enum: ["Pending", "Approved", "Dispatched", "Delivered", "Cancelled"],
          default: "Pending",
        },
        deliveryCharges: { type: Number, default: 0 }, // Add delivery charges
      },
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);