const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
require("dotenv").config();

const router = express.Router();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup using memory storage (no file saved to disk)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

// ------------------------ UPLOAD ROUTE ------------------------
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ message: "Only JPEG, PNG, and WEBP images are allowed" });
    }

    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    const result = await streamUpload(req.file.buffer);

    res.json({
      imageUrl: result.secure_url,
      publicId: result.public_id, // ✅ return publicId to frontend
      width: result.width,
      height: result.height,
      format: result.format,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({
      message: "An error occurred while uploading the image",
      error: error.message || "Unknown error",
    });
  }
});

// ------------------------ DELETE ROUTE ------------------------
router.delete("/", async (req, res) => {
  const { public_id } = req.body;

  if (!public_id) {
    return res.status(400).json({ message: "Missing public_id in request body" });
  }

  try {
    const result = await cloudinary.uploader.destroy(public_id);
    res.json({ message: "Image deleted", result });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({
      message: "Failed to delete image",
      error: error.message || "Unknown error",
    });
  }
});

module.exports = router;
