const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const QRCode = require("../models/QRCode");

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, "../public/qrcodes");
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, `qrcode${path.extname(file.originalname)}`); // Always same filename
    }
  });
  
  const upload = multer({ storage });
  
  // Upload/Update QR Code (Admin)
  router.post("/admin/qrcode", upload.single("qrcode"), async (req, res) => {
    try {
      // Delete existing QR code if exists
      const existingQR = await QRCode.findOne();
      if (existingQR) {
        const filePath = path.join(__dirname, "../public", existingQR.imagePath);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        await QRCode.deleteMany({});
      }
  
      // Create new QR code
      const imagePath = `/qrcodes/${req.file.filename}`;
      const newQRCode = new QRCode({
        imagePath,
        updatedAt: Date.now()
      });
  
      await newQRCode.save();
      res.status(201).json(newQRCode);
    } catch (error) {
      console.error("Error uploading QR code:", error);
      res.status(500).json({ message: "Failed to upload QR code" });
    }
  });
  
  // Get QR Code
  router.get("/qrcode", async (req, res) => {
    try {
      const qrcode = await QRCode.findOne();
      if (!qrcode) {
        return res.status(404).json({ message: "No QR code found" });
      }
      res.status(200).json(qrcode);
    } catch (error) {
      console.error("Error fetching QR code:", error);
      res.status(500).json({ message: "Failed to fetch QR code" });
    }
  });
  
  // Delete QR Code (Admin)
  router.delete("/admin/qrcode", async (req, res) => {
    try {
      const qrcode = await QRCode.findOneAndDelete();
      if (!qrcode) {
        return res.status(404).json({ message: "QR code not found" });
      }
  
      // Delete the image file
      const filePath = path.join(__dirname, "../public", qrcode.imagePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
  
      res.status(200).json({ message: "QR code deleted successfully" });
    } catch (error) {
      console.error("Error deleting QR code:", error);
      res.status(500).json({ message: "Failed to delete QR code" });
    }
  });
  

module.exports = router;