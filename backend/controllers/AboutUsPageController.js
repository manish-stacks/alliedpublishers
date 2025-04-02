const AboutUsPage = require('../models/AboutUsPage');

// Get About Us Page data
exports.getAboutUsPage = async (req, res) => {
  try {
    const aboutUsPageData = await AboutUsPage.findOne();
    if (!aboutUsPageData) {
      // Create default data if none exists
      const defaultData = new AboutUsPage({
        historyTitle: "History",
        historyContent: [
          "Established in 1934 by M. Graham Brash...",
          "Step by step, from humble beginnings..."
        ],
        objectiveTitle: "Objective",
        objectives: [
          "To provide all types of information published around the world...",
          "To publish and market quality academic books...",
          "Professionally equipped to service the ever-expanding needs..."
        ]
      });
      await defaultData.save();
      return res.json(defaultData);
    }
    res.json(aboutUsPageData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update About Us Page data
exports.updateAboutUsPage = async (req, res) => {
  try {
    const { historyTitle, historyContent, objectiveTitle, objectives } = req.body;

    let aboutUsPageData = await AboutUsPage.findOne();
    if (aboutUsPageData) {
      // Update existing data
      aboutUsPageData.historyTitle = historyTitle;
      aboutUsPageData.historyContent = historyContent;
      aboutUsPageData.objectiveTitle = objectiveTitle;
      aboutUsPageData.objectives = objectives;
    } else {
      // Create new data
      aboutUsPageData = new AboutUsPage({
        historyTitle,
        historyContent,
        objectiveTitle,
        objectives
      });
    }

    await aboutUsPageData.save();
    res.json({ message: "About Us Page data saved successfully", aboutUsPageData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};