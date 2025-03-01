// const mongoose = require("mongoose");

// const BestsellerSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   image: { type: String, required: true },
// });

// module.exports = mongoose.model("Bestseller", BestsellerSchema);


const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, // URL or file path of the book cover
});

module.exports = mongoose.model("Book", BookSchema);
