// const Bestseller = require("../models/Bestseller");


// // Get all bestsellers
// exports.getBestsellers = async (req, res) => {
//   try {
//     const bestseller = await Bestseller.find();
//     res.json(bestseller);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Add a new bestseller
// exports.addBestseller = async (req, res) => {
//   try {
//     const { name, image } = req.body;
//     if (!name || !image) {
//       return res.status(400).json({ message: "Name and image are required" });
//     }

//     const newBestseller = new Bestseller({ name, image });
//     await newBestseller.save();
//     res.status(201).json({ message: "Bestseller added successfully!" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Delete a bestseller
// exports.deleteBestseller = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedBook = await Bestseller.findByIdAndDelete(id);

//     if (!deletedBook) {
//       return res.status(404).json({ message: "Book not found" });
//     }

//     res.json({ message: "Bestseller deleted successfully!" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


const Book = require("../models/Book");

// Get all bestsellers
exports.getBestsellers = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new bestseller
exports.addBestseller = async (req, res) => {
  try {
    const { name, image } = req.body;
    if (!name || !image) {
      return res.status(400).json({ message: "Name and image are required" });
    }

    const newBook = new Book({ name, image });
    await newBook.save();
    res.status(201).json({ message: "Bestseller added successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a bestseller
exports.deleteBestseller = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Bestseller deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
