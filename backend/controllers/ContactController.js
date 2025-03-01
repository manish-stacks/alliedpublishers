const Branch = require("../models/Branch");

// ✅ Fetch all branches
exports.getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find();
    res.json({ branches });
  } catch (error) {
    console.error("Error fetching branch data:", error);
    res.status(500).json({ message: "Error fetching branch data" });
  }
};

// ✅ Add new branch
exports.addBranch = async (req, res) => {
  try {
    const { city, address, phone, email } = req.body;
    const newBranch = new Branch({ city, address, phone, email });
    await newBranch.save();
    res.status(201).json({ branch: newBranch, message: "Branch added successfully!" });
  } catch (error) {
    console.error("Error adding branch:", error);
    res.status(500).json({ message: "Error adding branch" });
  }
};

// ✅ Update existing branch
exports.updateBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBranch = await Branch.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ branch: updatedBranch, message: "Branch updated successfully!" });
  } catch (error) {
    console.error("Error updating branch:", error);
    res.status(500).json({ message: "Error updating branch" });
  }
};

// ✅ Delete branch
exports.deleteBranch = async (req, res) => {
  try {
    const { id } = req.params;
    await Branch.findByIdAndDelete(id);
    res.json({ message: "Branch deleted successfully!" });
  } catch (error) {
    console.error("Error deleting branch:", error);
    res.status(500).json({ message: "Error deleting branch" });
  }
};
