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

router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Allow only specific image MIME types
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ message: "Only JPEG, PNG, and WEBP images are allowed" });
    }

    // Function to upload the image buffer to Cloudinary using a stream
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        // Convert buffer to readable stream and pipe to Cloudinary
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    // Upload image and wait for result
    const result = await streamUpload(req.file.buffer);

    // Respond with uploaded image info
    res.json({
      imageUrl: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    });

  } catch (error) {
    // Log detailed error for debugging
    console.error("Error uploading image:", error);

    // Respond with detailed error message
    res.status(500).json({
      message: "An error occurred while uploading the image",
      error: error.message || "Unknown error",
    });
  }
});

module.exports = router;
