const Link = require("../models/LinkModel");

// Get Eupheus link
const getLink = async (req, res) => {
  try {
    const link = await Link.findOne(); // only one document
    if (!link) return res.status(404).json({ message: "Link not found" });
    res.json({ link: link.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Eupheus link (or create if not exist)
const updateLink = async (req, res) => {
  try {
    const { url } = req.body;
    let link = await Link.findOne();

    if (link) {
      link.url = url;
      await link.save();
    } else {
      link = await Link.create({ url });
    }

    res.json({ message: "Link updated successfully", link });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getLink, updateLink };
