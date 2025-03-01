const AboutUs = require("../models/AboutUs");

// Get About Us data
exports.getAboutUs = async (req, res) => {
  try {
    const aboutUsData = await AboutUs.findOne();
    if (!aboutUsData) {
      return res.status(404).json({ message: "About Us data not found" });
    }
    res.json(aboutUsData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update or Create About Us data
exports.updateAboutUs = async (req, res) => {
  try {
    const { title, content } = req.body;

    let aboutUsData = await AboutUs.findOne();
    if (aboutUsData) {
      // Update existing data
      aboutUsData.title = title;
      aboutUsData.content = content;
    } else {
      // Create new data
      aboutUsData = new AboutUs({ title, content });
    }

    await aboutUsData.save();
    res.json({ message: "About Us data saved successfully", aboutUsData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
