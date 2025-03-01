const ConferenceProceedings = require("../models/ConferenceProceedings");

// Get conference data
exports.getConferenceProceedings = async (req, res) => {
  try {
    const data = await ConferenceProceedings.findOne();
    if (!data) {
      return res.status(404).json({ message: "No data found" });
    }
    res.json(data);
  } catch (error) {
    console.error("Error fetching conference proceedings data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update conference data
exports.updateConferenceProceedings = async (req, res) => {
  try {
    const updatedData = await ConferenceProceedings.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true, // If no record exists, create a new one
    });

    res.status(200).json({ message: "Conference data updated successfully!", data: updatedData });
  } catch (error) {
    console.error("Error updating conference proceedings:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete conference data
