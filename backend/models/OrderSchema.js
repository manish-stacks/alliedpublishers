const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true },
  email: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);