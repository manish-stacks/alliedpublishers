const Branch = require("../models/Branch");

// Get all branches
exports.getBranches = async (req, res) => {
  try {
    const branches = await Branch.find();
    res.json(branches);
  } catch (error) {
    res.status(500).json({ message: "Error fetching branches", error });
  }
};

// Add new branch
exports.addBranch = async (req, res) => {
  try {
    const newBranch = new Branch(req.body);
    await newBranch.save();
    res.status(201).json({ message: "Branch added successfully", branch: newBranch });
  } catch (error) {
    res.status(500).json({ message: "Error adding branch", error });
  }
};

// Update a branch
exports.updateBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBranch = await Branch.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: "Branch updated successfully", branch: updatedBranch });
  } catch (error) {
    res.status(500).json({ message: "Error updating branch", error });
  }
};

// Delete a branch
exports.deleteBranch = async (req, res) => {
  try {
    const { id } = req.params;
    await Branch.findByIdAndDelete(id);
    res.json({ message: "Branch deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting branch", error });
  }
};
