const ForeignBook = require("../models/ForeignBooks");

const getForeignBooksData = async (req, res) => {
  try {
    const { title } = req.query;

    let query = {};
    if (title) {
      query.titleName = new RegExp(title, "i"); // Case-insensitive search
    }

    const data = await ForeignBook.find(query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getForeignBooksData };