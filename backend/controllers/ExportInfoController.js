const ExportInfo = require("../models/ExportInfo");

// 📌 Get export info (Assuming one document exists)
exports.getExportInfo = async (req, res) => {
  try {
    const exportInfo = await ExportInfo.findOne();
    res.json(exportInfo);
  } catch (error) {
    console.error("Error fetching export info:", error);
    res.status(500).json({ message: "Error fetching export info" });
  }
};

// 📌 Update export info
exports.updateExportInfo = async (req, res) => {
  try {
    const { description, exports, coreAreas, customerCategories, contact } = req.body;

    const updatedExportInfo = await ExportInfo.findOneAndUpdate(
      {}, // Assuming there's only one document
      { description, exports, coreAreas, customerCategories, contact },
      { new: true, upsert: true } // Creates new if not exists
    );

    res.json(updatedExportInfo);
  } catch (error) {
    console.error("Error updating export info:", error);
    res.status(500).json({ message: "Error updating export info" });
  }
};
