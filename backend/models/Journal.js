const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
  title: String,
  description: [String], // Multiple paragraphs
  services: [String],
  specialServices: [String],
  journalsAndMagazines: {
    overview: String,
    strategies: [String],
    authorizedProviders: [String],
  },
  branches: [
    {
      city: String,
      contactPerson: String,
      address: String,
      phone: [String],
      email: [String],
    },
  ],
});

const Journal = mongoose.model("Journal", journalSchema);
module.exports = Journal;
