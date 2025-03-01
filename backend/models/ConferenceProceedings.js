const mongoose = require("mongoose");

const ConferenceProceedingsSchema = new mongoose.Schema(
  {
    description: String,
    institutions: [String],
    services: [String],
    contact: {
      name: String,
      position: String,
      company: String,
      address: String,
      mobile: [String],
      email: [String],
    },
  },
  { collection: "conference_proceedings" } // Explicitly setting collection name
);

module.exports = mongoose.model("ConferenceProceedings", ConferenceProceedingsSchema);
