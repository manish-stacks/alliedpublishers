const mongoose = require("mongoose");

const PublisherSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  publishers: [{
    type: String,
    required: true
  }]
});

const Publisher = mongoose.model("Publisher", PublisherSchema);

module.exports = Publisher;
