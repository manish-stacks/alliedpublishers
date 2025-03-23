const express = require("express");
const Category = require("../models/Category");
const router = express.Router();

// Add a new category
router.post("/categories", async (req, res) => {
  try {
    const { name, subcategories } = req.body;

    // Check if the category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    // Create a new category
    const newCategory = new Category({
      name,
      subcategories,
    });

    // Save the category to the database
    await newCategory.save();
    res.status(201).json({ message: "Category added successfully", category: newCategory });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ message: "Failed to add category" });
  }
});

// Fetch all categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find({});
    const formattedCategories = {};

    // Format the categories into the required structure
    categories.forEach((category) => {
      formattedCategories[category.name] = category.subcategories;
    });

    res.status(200).json(formattedCategories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});

module.exports = router;