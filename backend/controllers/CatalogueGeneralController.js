const CatalogueGeneral = require("../models/CatalogueGeneral");

// Admin upload karega bas ek gdrive link
const uploadCatalogueGeneral = async (req, res) => {
  try {
    const { fileUrl } = req.body;

    if (!fileUrl) {
      return res.status(400).json({ message: "Please provide Google Drive link" });
    }

    const newCatalogue = new CatalogueGeneral({ fileUrl });
    await newCatalogue.save();

    res.status(201).json({
      message: "Catalogue link saved successfully",
      data: newCatalogue,
    });
  } catch (error) {
    res.status(500).json({ message: "Error saving link", error: error.message });
  }
};

// User download (redirect karega)
const downloadCatalogueGeneral = async (req, res) => {
  try {
    const catalogue = await CatalogueGeneral.findOne().sort({ createdAt: -1 }); // latest link

    if (!catalogue) {
      return res.status(404).json({ message: "No catalogue found" });
    }

    res.redirect(catalogue.fileUrl); // direct gdrive link
  } catch (error) {
    res.status(500).json({ message: "Error fetching catalogue", error: error.message });
  }
};

module.exports = { uploadCatalogueGeneral, downloadCatalogueGeneral };
