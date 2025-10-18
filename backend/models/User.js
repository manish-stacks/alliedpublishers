
// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   resetToken: { type: String, default: null },
//   resetTokenExpiry: { type: Date, default: null },
//   address: {
//     street: String,
//     city: String,
//     state: String,
//     zipCode: String,
//   },
//   orders: [
//     {
//       tempOrderId: { type: String, unique: true },
//       orderId: { type: String, unique: true, sparse: true },
//       cart: [
//         {
//           itemId: { type: mongoose.Schema.Types.ObjectId, ref: "General" },
//           name: String,
//           price: Number,
//           quantity: Number,
//         },
//       ],
//       payment: {
//         screenshot: String,
//         invoice: { type: String, default: "" },
//         tracking: { type: String, default: "" },
//         createdAt: { type: Date, default: Date.now, index: true }, // Added index for sorting
//         status: {
//           type: String,
//           enum: ["Pending", "Approved", "Dispatched", "Delivered", "Cancelled"],
//           default: "Pending",
//         },
//         deliveryCharges: { type: Number, default: 0 },
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
  role: { type: String, enum: ["user", "admin"], default: "user" }, // Added role field
  resetToken: { type: String, default: null },
  resetTokenExpiry: { type: Date, default: null },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  orders: [
    {
      default: [],
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      tempOrderId: { type: String, unique: true },
      orderId: { type: String, unique: true, sparse: true },
      address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
      },
      cart: [
        {
          itemId: { type: mongoose.Schema.Types.ObjectId, ref: "General" },
          name: String,
          price: Number,
          quantity: Number,
          currency: { type: String, default: 'INR' },
          isForeign: { type: Boolean, default: false },
          convertedPrice: { type: Number, default: 0 },
        },
      ],
      payment: {
        screenshot: String,
        invoice: { type: String, default: "" },
        tracking: { type: String, default: "" },
        createdAt: { type: Date, default: Date.now, index: true },
        status: {
          type: String,
          enum: ["Pending", "Approved", "Dispatched", "Delivered", "Cancelled"],
          default: "Pending",
        },
        deliveryCharges: { type: Number, default: 0 },
      },
    },
  ],
}, { strict: true });

module.exports = mongoose.model("User", UserSchema);