const Location = require("../models/Location");

// Get all locations
exports.getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new location
exports.addLocation = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Location name is required" });
    }

    const newLocation = new Location({ name });
    await newLocation.save();
    res.status(201).json(newLocation); // Return the new location
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete a location by ID
exports.deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if location exists
    const location = await Location.findById(id);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    await Location.findByIdAndDelete(id);
    res.status(200).json({ message: "Location deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
