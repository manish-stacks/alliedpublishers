// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   resetToken: String,
//   resetTokenExpiry: Date,
// });

// module.exports = mongoose.model("User", UserSchema);
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true }, // Ensure email is unique
  password: String,
  cart: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: "General" },
      quantity: Number,
    },
  ],
});

// Export the User model
module.exports = mongoose.model("User", UserSchema);