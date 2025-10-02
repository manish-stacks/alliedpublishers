const express = require("express");
const { getAboutUs, updateAboutUs } = require("../controllers/AboutusController");
const { getLocations, addLocation, deleteLocation } = require("../controllers/LocationController");
const { getBestsellers, addBestseller , deleteBestseller} = require("../controllers/BestsellerController");
const { getAuthors, addAuthor, deleteAuthor} = require("../controllers/AuthorController");
const { getConferenceProceedings,updateConferenceProceedings} = require("../controllers/ConferenceProceedingsController");
// const branchController = require("../controllers/ContactController");
const { getExportInfo, updateExportInfo} = require("../controllers/ExportInfoController");
const managementController = require("../controllers/ManagementController");
const { getPublishers, addPublisher, deletePublisher } = require("../controllers/PublisherController");
const specialAgencyController = require("../controllers/SagencyController");
const { getData, addData, deleteData } = require("../controllers/GeneralController");
const { getConferenceData, addConferenceData, deleteConferenceData } = require("../controllers/ConferenceController");
const { getForeignBooksData } = require("../controllers/ForeignBooksController");
const imageController = require("../controllers/ImageController");
const { getJournal, updateJournal } = require("../controllers/JournalController");
const branchController = require("../controllers/BranchController");
const { getLink, updateLink } = require("../controllers/LinkController");
const { uploadCatalogueGeneral, downloadCatalogueGeneral } = require("../controllers/CatalogueGeneralController");
const { uploadCatalogueConf, downloadCatalogueConf } = require("../controllers/CatalogueConfController");

const multer = require("multer");
const path = require("path");
// const { uploadCatalogueConf } = require("../controllers/CatalogueConfController");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/catalogues"); // ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, `catalogue-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });


const router = express.Router();


router.get("/locations", getLocations);
router.post("/admin/locations", addLocation);
router.delete("/admin/locations/:id", deleteLocation);

router.get("/bestsellers", getBestsellers);
router.post("/admin/bestsellers",addBestseller);
router.delete("/admin/bestsellers/:id", deleteBestseller);

router.get("/authors", getAuthors);
router.post("/admin/authors", addAuthor);
router.delete("/admin/authors/:id", deleteAuthor);

router.get("/publisher", getPublishers);
router.post("/admin/publisher", addPublisher);
router.delete("/admin/publisher/:id", deletePublisher);

router.get("/export-info", getExportInfo);
router.put("/admin/export-info", updateExportInfo);

router.get("/conference", getConferenceProceedings);
router.put("/admin/conference", updateConferenceProceedings);


router.get("/contact", branchController.getBranches);
router.post("/admin/contact", branchController.addBranch);
router.put("/admin/contact/:id", branchController.updateBranch);
router.delete("/admin/contact/:id", branchController.deleteBranch);

router.get("/about-us", getAboutUs);
router.post("/admin/about-us", updateAboutUs);

router.get("/management", managementController.getManagement);
router.post("/admin/management", managementController.addManagementMember);
router.delete("/admin/management/:section/:id", managementController.deleteManagementMember);

router.get("/special-agency", specialAgencyController.getSpecialAgencies);
router.post("/admin/special-agency", specialAgencyController.addSpecialAgency);
router.put("/admin/special-agency/:id", specialAgencyController.updateSpecialAgency);
router.delete("/admin/special-agency/:id", specialAgencyController.deleteSpecialAgency);

router.get("/general/:type", getData);
router.post("/admin/general", addData); // Correct
router.delete("/admin/general/:id", deleteData);


router.get("/conference/:type", getConferenceData);
router.post("/admin/conference", addConferenceData); // Correct
router.delete("/admin/conference/:id", deleteConferenceData);

router.get("/foreign/book", getForeignBooksData);


router.get("/images", imageController.getImages);
router.put("/admin/images", imageController.updateImages);

router.get("/journal", getJournal);
router.put("/admin/journal/:id", updateJournal);

// router.get("/eupheus-link", (req, res) => {
//   res.json({
//     link: "https://www.eupheus.in"
//   });
router.get("/eupheus-link", getLink);          
router.put("/admin/link", updateLink);
router.post("/admin/catalogue/general/upload", uploadCatalogueGeneral);

// User download (redirect to public URL)
router.get("/catalogue/general/download", downloadCatalogueGeneral);
router.post("/admin/catalogue/conf/upload", uploadCatalogueConf);

// User download (redirect to public URL)
router.get("/catalogue/conf/download", downloadCatalogueConf);

module.exports = router;
