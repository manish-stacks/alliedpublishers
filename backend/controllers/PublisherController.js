const Publisher = require("../models/Publisher");

// ✅ Fetch all publishers
const getPublishers = async (req, res) => {
  try {
    const publishers = await Publisher.find();
    res.json(publishers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Add a new publisher
const addPublisher = async (req, res) => {
    try {
        const { category, publisherName } = req.body;
    
        if (!category || !publisherName) {
          return res.status(400).json({ error: "Category and Publisher Name are required" });
        }
    
        let publisher = await Publisher.findOne({ category });
    
        if (publisher) {
          // Check if the publisher already exists in the category
          if (publisher.publishers.includes(publisherName)) {
            return res.status(400).json({ error: "Publisher already exists in this category" });
          }
          publisher.publishers.push(publisherName);
          await publisher.save();
        } else {
          // If the category doesn't exist, create a new one
          publisher = new Publisher({ category, publishers: [publisherName] });
          await publisher.save();
        }
    
        res.status(201).json({ message: "Publisher added successfully", publisher });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };
    


// ✅ Delete a Single Publisher from a Category
const deletePublisher = async (req, res) => {
  try {
    const { category, publisherName } = req.params;

    let publisher = await Publisher.findOne({ category });

    if (!publisher) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Remove specific publisher
    publisher.publishers = publisher.publishers.filter(name => name !== publisherName);

    if (publisher.publishers.length === 0) {
      // If no publishers left, remove the entire category
      await Publisher.findOneAndDelete({ category });
    } else {
      await publisher.save();
    }

    res.json({ message: "Publisher deleted successfully", publisher });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getPublishers, addPublisher, deletePublisher };
