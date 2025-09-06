const mongoose = require("mongoose");

const DeliveryChargeSchema = new mongoose.Schema({
  states: { type: String, unique: true }, // comma-separated states string
  charge: { type: Number, required: true },
});

const DefaultDeliveryChargeSchema = new mongoose.Schema({
  defaultCharge: { type: Number, default: 0 },
});

const DeliveryCharge = mongoose.model("DeliveryCharge", DeliveryChargeSchema);
const DefaultDeliveryCharge = mongoose.model("DefaultDeliveryCharge", DefaultDeliveryChargeSchema);

module.exports = { DeliveryCharge, DefaultDeliveryCharge };
