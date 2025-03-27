
const mongoose = require('mongoose');
const express = require("express");
const ConferenceCategory = require("../models/ConferenceCategory");
const router = express.Router();

// Create category
router.post("/admin/conference-categories", async (req, res) => {
  try {
    const { name, subcategories } = req.body;

    const existingCategory = await ConferenceCategory.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = new ConferenceCategory({
      name,
      subcategories,
    });

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ message: "Failed to add category" });
  }
});

// In your categoryRoutes.js (backend)
router.get("/conference-categories", async (req, res) => {
  try {
    const categories = await ConferenceCategory.find({});
    res.status(200).json(categories); // This already returns an array
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});

// Update category
router.put("/admin/conference-categories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, subcategories } = req.body;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    // Check for duplicate name
    if (name) {
      const existingCategory = await ConferenceCategory.findOne({ 
        name, 
        _id: { $ne: id } 
      });
      if (existingCategory) {
        return res.status(400).json({ message: "Category name already exists" });
      }
    }

    const updatedCategory = await ConferenceCategory.findByIdAndUpdate(
      id,
      { name, subcategories },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Failed to update category" });
  }
});

// Delete category
router.delete("/admin/conference-categories/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const deletedCategory = await ConferenceCategory.findByIdAndDelete(id);
    
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Failed to delete category" });
  }
});

module.exports = router;