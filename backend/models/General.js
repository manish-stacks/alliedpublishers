// const mongoose = require("mongoose");

// const generalSchema = new mongoose.Schema({
//   type: String, // Identifies type (e.g., locations, bestsellers, authors, etc.)
//   title: String,
//   author: String,
//   category: String,
//   price: Number,
//   stock: Number,
//   isbn: String, // ✅ ISBN number
//   coverImage: String, // ✅ Front cover image
//   backImage: String, // ✅ Back cover image
//   discount: Number, // ✅ Discount in percentage
//   coverType: String, // ✅ Cover Type (Hardback or Paperback)
// });

// const General = mongoose.model("General", generalSchema);

// module.exports = General;


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
