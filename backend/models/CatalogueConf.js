const mongoose = require("mongoose");

const catalogueConfSchema = new mongoose.Schema({
  fileUrl: { type: String, required: true }, // Bas gdrive link
}, { timestamps: true });

module.exports = mongoose.model("CatalogueConf", catalogueConfSchema);
