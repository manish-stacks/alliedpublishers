const mongoose = require("mongoose");

const conferencecategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  subcategories: [
    {
      type: String,
    },
  ],
});

const ConferenceCategory = mongoose.model("ConferenceCategory", conferencecategorySchema);

module.exports = ConferenceCategory;