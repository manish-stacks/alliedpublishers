const mongoose = require("mongoose");

const catalogueGeneralSchema = new mongoose.Schema({
  fileUrl: { type: String, required: true }, // Bas gdrive link
}, { timestamps: true });

module.exports = mongoose.model("CatalogueGeneral", catalogueGeneralSchema);
