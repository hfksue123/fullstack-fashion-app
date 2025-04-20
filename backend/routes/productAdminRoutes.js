const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

//@route GET /api/admin/products
//@desc Get all products (admin only)
//@access Private/Admin
router.get("/", protect, admin, async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Server Error" });
  }
});

// @route POST /api/admin/products
// @desc Create new product (admin only)
// @access Private/Admin
router.post("/", protect, admin, async (req, res) => {
  try {
    const newProduct = new Product({
      ...req.body,
      user: req.user._id,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

module.exports = router;