const mongoose = require("mongoose");

const foreignBookSchema = new mongoose.Schema({
  bookcode: String,
  titleName: String,
  authorName: String,
  publishYear: Number,
  curr: String,
  price: Number,
  qty: Number
});

const ForeignBook = mongoose.model("ForeignBook", foreignBookSchema);

module.exports = ForeignBook;
