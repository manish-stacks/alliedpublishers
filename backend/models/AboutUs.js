const mongoose = require('mongoose');

// Define the AboutUs Schema
const aboutUsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    image: {
      type: String,
      required: true,
    },
    description: {
      type: [String], // Array to hold multiple paragraphs of description
      required: true,
    },
  },
});

// Create and export the model for AboutUs
const AboutUs = mongoose.model('AboutUs', aboutUsSchema);

module.exports = AboutUs;

