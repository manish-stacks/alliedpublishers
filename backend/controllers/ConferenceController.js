const Conference = require("../models/Conference");

const getConferenceData = async (req, res) => {
  try {
    const { type } = req.params;
    const { title } = req.query;

    let query = { type };
    if (title) {
      query.title = new RegExp(title, "i"); // Case-insensitive search
    }

    const data = await Conference.find(query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};





// 📌 POST: Add new book entry
const addConferenceData = async (req, res) => {
  try {
    const { type, title, author, category, price, stock, isbn, coverImage, backImage, discount, coverType } = req.body;

    const newEntry = new Conference({ 
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
const deleteConferenceData = async (req, res) => {
  try {
    const { id } = req.params;
    await Conference.findByIdAndDelete(id);
    res.json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting data", error });
  }
};


module.exports = { getConferenceData, addConferenceData, deleteConferenceData };
