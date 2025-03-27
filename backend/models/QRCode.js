const mongoose = require("mongoose");

const qrCodeSchema = new mongoose.Schema({
  imagePath: {
    type: String,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure only one document can exist
qrCodeSchema.statics.getSingleton = async function() {
  let qr = await this.findOne();
  if (!qr) {
    qr = await this.create({});
  }
  return qr;
};

module.exports = mongoose.model("QRCode", qrCodeSchema);