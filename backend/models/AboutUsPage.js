const mongoose = require('mongoose');

const aboutUsPageSchema = new mongoose.Schema({
  historyTitle: {
    type: String,
    required: true,
    default: "History"
  },
  historyContent: {
    type: [String],
    required: true
  },
  objectiveTitle: {
    type: String,
    required: true,
    default: "Objective"
  },
  objectives: {
    type: [String],
    required: true
  }
});

const AboutUsPage = mongoose.model('AboutUsPage', aboutUsPageSchema);

module.exports = AboutUsPage;