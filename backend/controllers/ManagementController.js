const Management = require("../models/Management");

// ✅ GET Management Data
exports.getManagement = async (req, res) => {
  try {
    const managementData = await Management.findOne();
    if (!managementData) {
      return res.status(404).json({ message: "Management data not found" });
    }
    res.json(managementData);
  } catch (error) {
    console.error("Error fetching management data:", error);
    res.status(500).json({ message: "Error fetching management data" });
  }
};

// ✅ ADD a New Director or Branch Member
exports.addManagementMember = async (req, res) => {
  const { section, name, position, phone, city } = req.body;
  
  try {
    let managementData = await Management.findOne();
    if (!managementData) {
      managementData = new Management({ board_of_directors: [], branches: [] });
    }

    if (section === "board_of_directors") {
      managementData.board_of_directors.push({ name, position });
    } else if (section === "branches") {
      const branch = managementData.branches.find((b) => b.city === city);
      if (branch) {
        branch.members.push({ name, position, phone });
      } else {
        managementData.branches.push({ city, members: [{ name, position, phone }] });
      }
    }

    await managementData.save();
    res.status(201).json({ message: "Member added successfully", managementData });
  } catch (error) {
    console.error("Error adding management member:", error);
    res.status(500).json({ message: "Error adding member" });
  }
};

// ✅ DELETE a Director or Member by ID
exports.deleteManagementMember = async (req, res) => {
  const { section, id } = req.params;

  try {
    let managementData = await Management.findOne();
    if (!managementData) {
      return res.status(404).json({ message: "Management data not found" });
    }

    if (section === "board_of_directors") {
      managementData.board_of_directors = managementData.board_of_directors.filter(
        (d) => d._id.toString() !== id
      );
    } else if (section === "branches") {
      managementData.branches.forEach((branch) => {
        branch.members = branch.members.filter((member) => member._id.toString() !== id);
      });
    }

    await managementData.save();
    res.json({ message: "Member deleted successfully" });
  } catch (error) {
    console.error("Error deleting management member:", error);
    res.status(500).json({ message: "Error deleting member" });
  }
};
