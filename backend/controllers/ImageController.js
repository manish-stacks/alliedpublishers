const Image = require("../models/Image");

// Get Images
exports.getImages = async (req, res) => {
  try {
    const images = await Image.findOne(); // Fetches the first document with images
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Images
exports.updateImages = async (req, res) => {
  try {
    const { image1, image2, image3 ,image4} = req.body;
    
    const updatedImages = await Image.findOneAndUpdate(
      {},
      { image1, image2, image3 ,image4},
      { new: true, upsert: true } // Creates a new entry if none exists
    );

    res.json(updatedImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
