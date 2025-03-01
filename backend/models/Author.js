const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  notableWorks: [String], // Array of book titles
});

module.exports = mongoose.model("Author", AuthorSchema);

