import { Router } from "express";
import { getAboutUs, updateAboutUs } from "../controllers/AboutusController";
import { getLocations, addLocation, deleteLocation } from "../controllers/LocationController";
import { getBestsellers, addBestseller, deleteBestseller } from "../controllers/BestsellerController";
import { getAuthors, addAuthor, deleteAuthor } from "../controllers/AuthorController";
import { getConferenceProceedings, updateConferenceProceedings } from "../controllers/ConferenceProceedingsController";
// const branchController = require("../controllers/ContactController");
import { getExportInfo, updateExportInfo } from "../controllers/ExportInfoController";
import { getManagement, addManagementMember, deleteManagementMember } from "../controllers/ManagementController.js";
import { getPublishers, addPublisher, deletePublisher } from "../controllers/PublisherController";
import { getSpecialAgencies, addSpecialAgency, updateSpecialAgency, deleteSpecialAgency } from "../controllers/SagencyController";
import { getData, addData, deleteData } from "../controllers/GeneralController";
import { getImages, updateImages } from "../controllers/ImageController";
import { getJournal, updateJournal } from "../controllers/JournalController";
import { getBranches, addBranch, updateBranch, deleteBranch } from "../controllers/BranchController";




const router = Router();


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

router.get("/contact", getBranches);
router.post("/admin/contact", addBranch);
router.put("/admin/contact/:id", updateBranch);
router.delete("/admin/contact/:id", deleteBranch);

router.get("/about-us", getAboutUs);
router.post("/admin/about-us", updateAboutUs);

router.get("/management", getManagement);
router.post("/admin/management", addManagementMember);
router.delete("/admin/management/:section/:id", deleteManagementMember);

router.get("/special-agency", getSpecialAgencies);
router.post("/admin/special-agency", addSpecialAgency);
router.put("/admin/special-agency/:id", updateSpecialAgency);
router.delete("/admin/special-agency/:id", deleteSpecialAgency);

router.get("/general/:type", getData);

// 📌 POST: Add new data
router.post("/admin/general", addData); // Correct


// 📌 DELETE: Delete data by ID
router.delete("/admin/general/:id", deleteData);


router.get("/images", getImages);
router.put("/admin/images", updateImages);

router.get("/journal", getJournal);
router.put("/admin/journal/:id", updateJournal);


export default router;
