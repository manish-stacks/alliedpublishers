const express = require('express');
const router = express.Router();
const aboutUsPageController = require('../controllers/AboutUsPageController');

// Public route
router.get('/about-us-page', aboutUsPageController.getAboutUsPage);

// Admin route
router.post('/admin/about-us-page', aboutUsPageController.updateAboutUsPage);

module.exports = router;