const mongoose = require("mongoose");

const generalSchema = new mongoose.Schema({
  type: String,
  title: String,
  author: String,
  category: String,
  price: Number,
  stock: Number,
  isbn: String,
  coverImage: String,
  backImage: String,
  discount: Number,
  coverType: String,
  pages: Number, // Added pages field
});

const General = mongoose.model("General", generalSchema);

module.exports = General;
