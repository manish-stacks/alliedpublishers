const Author = require("../models/Author");

// Get all authors
exports.getAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new author
exports.addAuthor = async (req, res) => {
  try {
    const { name, image, description, notableWorks } = req.body;

    if (!name || !image || !description) {
      return res.status(400).json({ message: "Name, image, and description are required" });
    }

    const newAuthor = new Author({ name, image, description, notableWorks });
    await newAuthor.save();
    res.status(201).json({ message: "Author added successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an author
exports.deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findByIdAndDelete(id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.json({ message: "Author deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
