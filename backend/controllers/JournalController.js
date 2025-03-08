const Journal = require("../models/Journal");

// Get Journal Data
exports.getJournal = async (req, res) => {
  try {
    const journal = await Journal.findOne();
    res.status(200).json(journal);
  } catch (error) {
    res.status(500).json({ message: "Error fetching journal data", error });
  }
};

// Update Journal Data (Admin)
exports.updateJournal = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedJournal = await Journal.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedJournal);
  } catch (error) {
    res.status(500).json({ message: "Error updating journal", error });
  }
};
