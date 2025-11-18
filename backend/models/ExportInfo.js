const mongoose = require("mongoose");

const exportInfoSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    exports: [String], // Array of export categories
    coreAreas: [String], // Array of core areas
    customerCategories: [String], // Array of customer categories
    contact: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      mobile: { type: String, required: true },
      phone: [String], // Array of phone numbers
      email: [String], // Array of emails
      note: { type: String, required: true } // Legal dispute information
    }
  },
  { collection: "ExportInfo" } // Explicitly mention the collection name
);

const ExportInfo = mongoose.model("ExportInfo", exportInfoSchema);

module.exports = ExportInfo;
