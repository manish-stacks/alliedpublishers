const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  screenshotUrl: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Order Approved", "Order Dispatched", "Delivered"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", PaymentSchema);
