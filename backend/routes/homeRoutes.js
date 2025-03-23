const express = require("express");
const { getAboutUs, updateAboutUs } = require("../controllers/AboutusController");
const { getLocations, addLocation, deleteLocation } = require("../controllers/LocationController");
const { getBestsellers, addBestseller , deleteBestseller} = require("../controllers/BestsellerController");
const { getAuthors, addAuthor, deleteAuthor} = require("../controllers/AuthorController");
const { getConferenceProceedings,updateConferenceProceedings} = require("../controllers/ConferenceProceedingsController");
// const branchController = require("../controllers/ContactController");
const { getExportInfo, updateExportInfo} = require("../controllers/ExportInfoController");
const managementController = require("../controllers/ManagementController.js");
const { getPublishers, addPublisher, deletePublisher } = require("../controllers/PublisherController");
const specialAgencyController = require("../controllers/SagencyController");
const { getData, addData, deleteData } = require("../controllers/GeneralController");
const imageController = require("../controllers/ImageController");
const { getJournal, updateJournal } = require("../controllers/JournalController");
const branchController = require("../controllers/BranchController");




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

// router.get("/contact", branchController.getAllBranches);
// router.post("/admin/contact", branchController.addBranch);
// router.put("/admin/contact/:id", branchController.updateBranch);
// router.delete("/admin/contact/:id", branchController.deleteBranch);

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

// 📌 POST: Add new data
router.post("/admin/general", addData); // Correct


// 📌 DELETE: Delete data by ID
router.delete("/admin/general/:id", deleteData);


router.get("/images", imageController.getImages);
router.put("/admin/images", imageController.updateImages);

router.get("/journal", getJournal);
router.put("/admin/journal/:id", updateJournal);


module.exports = router;
