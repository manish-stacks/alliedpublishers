// const mongoose = require("mongoose");

// const DeliveryChargeSchema = new mongoose.Schema({
//   pincode: { type: String, unique: true },
//   charge: Number,
// });

// module.exports = mongoose.model("DeliveryCharge", DeliveryChargeSchema);


const mongoose = require("mongoose");

const DeliveryChargeSchema = new mongoose.Schema({
  pincode: { type: String, unique: true },
  charge: { type: Number, required: true },
});

const DefaultDeliveryChargeSchema = new mongoose.Schema({
  defaultCharge: { type: Number, default: 0 }, // Default delivery charge
});

const DeliveryCharge = mongoose.model("DeliveryCharge", DeliveryChargeSchema);
const DefaultDeliveryCharge = mongoose.model("DefaultDeliveryCharge", DefaultDeliveryChargeSchema);

module.exports = { DeliveryCharge, DefaultDeliveryCharge };