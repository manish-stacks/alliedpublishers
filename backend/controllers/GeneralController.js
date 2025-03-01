// const General = require("../models/General");

// // 📌 GET: Fetch data by type (e.g., locations, bestsellers, authors, etc.)
// const getData = async (req, res) => {
//   try {
//     const type = req.params.type;
//     const data = await General.find({ type });  // 👈 Type ke basis pe fetch ho raha hai
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };


// const addData = async (req, res) => {
//   try {
//     const { type, title, author, category, price, stock, description, coverImage } = req.body;
    
//     const newEntry = new General({ type, title, author, category, price, stock, description, coverImage });
//     await newEntry.save();
    
//     res.status(201).json({ message: "Data added successfully", entry: newEntry });
//   } catch (error) {
//     res.status(400).json({ message: "Error adding data", error });
//   }
// };

// const deleteData = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await General.findByIdAndDelete(id);
//     res.json({ message: "Data deleted successfully" });
//   } catch (error) {
//     res.status(400).json({ message: "Error deleting data", error });
//   }
// };

// module.exports = { getData, addData, deleteData };


const General = require("../models/General");

// 📌 GET: Fetch data by type (e.g., locations, bestsellers, authors, etc.)
const getData = async (req, res) => {
  try {
    const type = req.params.type;
    const data = await General.find({ type }); // Fetch based on type
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



// 📌 POST: Add new book entry
const addData = async (req, res) => {
  try {
    const { type, title, author, category, price, stock, isbn, coverImage, backImage, discount, coverType } = req.body;

    const newEntry = new General({ 
      type, 
      title, 
      author, 
      category, 
      price, 
      stock, 
      isbn, 
      coverImage, 
      backImage, 
      discount, 
      coverType 
    });

    await newEntry.save();
    res.status(201).json({ message: "Data added successfully", entry: newEntry });

  } catch (error) {
    res.status(400).json({ message: "Error adding data", error });
  }
};

// 📌 DELETE: Remove entry by ID
const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    await General.findByIdAndDelete(id);
    res.json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting data", error });
  }
};

const searchBooks = async (req, res) => {
  try {
    const query = req.query.query || "";
    // Searching for books that match the title or author or category
    const books = await General.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    });

    if (books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getData, addData, deleteData ,searchBooks};
