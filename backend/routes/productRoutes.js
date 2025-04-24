const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

//@route POST /api/products
//@desc Create a new product
//@access Private
router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id, //Reference to the user who created the product
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//@route PUT /api/products/:id
//@desc Update an existing product
//@access Private/Admin

router.put("/:id", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    //Find the product by ID
    const product = await Product.findById(req.params.id);

    if (product) {
      // Update the product fields
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished =
        isPublished !== undefined ? isPublished : product.isPublished;
      product.tags = tags || product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;

      //Save the updated product
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

//@route DELETE /api/products/:id
//@desc Delete a product
//@access Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    //find the product by ID
    const product = await Product.findById(req.params.id);
    if (product) {
      //Remove the product from the database
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

//@route DELETE /api/products/:id/image
//@desc Remove a specific image from a product
//@access Private/Admin
router.delete('/:id/image', protect, admin, async (req, res) => {
  try {
    const { publicId, imageUrl } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Xóa ảnh khỏi Cloudinary nếu có publicId
    if (publicId) {
      const cloudinary = require('cloudinary').v2;
      await cloudinary.uploader.destroy(publicId);
    }

    // Xóa ảnh khỏi mảng images trong DB
    product.images = product.images.filter((img) => img.url !== imageUrl);

    await product.save();
    res.json({ message: 'Image deleted successfully', images: product.images });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

//@route GET /api/products
//@desc Get all products with optional query filters
//@access Public
router.get("/", async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    let query = {};
    //Filter logic
    if (collection && collection.toLocaleLowerCase() !== "all") {
      query.collections = collection;
    }
    if (category && category.toLocaleLowerCase() !== "all") {
      query.category = category;
    }
    if (material) {
      query.material = { $in: material.split(",") };
    }
    if (brand) {
      query.brand = { $in: brand.split(",") };
    }
    if (size) {
      query.sizes = { $in: size.split(",") };
    }
    if (color) {
      query.colors = { $in: [color] };
    }
    if (gender) {
      query.gender = gender;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    //Sorting logic
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }

    //Fetching products and applying sorting and limit
    let products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

//@route GET /api/products/best-seller
//@desc Get the best-selling products
//@access Public
router.get("/best-seller", async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 });
    if (bestSeller) {
      res.json(bestSeller);
    } else {
      res.status(404).json({ message: "Best seller not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

//@route GET /api/products/new-arrivals
//@desc Get the new arrivals 8 products - Creation Date
//@access Public
router.get("/new-arrivals", async (req, res) => {
  try {
    //Fetch 8 new products
    const NewArrivalsSection = await Product.find()
      .sort({ createdAt: -1 })
      .limit(8);
    res.json(NewArrivalsSection);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

//@route GET /api/products/sale
//@desc Get products with sale >= 35%
//@access Public
router.get("/sale", async (req, res) => {
  try {
    const products = await Product.find();

    const saleProducts = products.filter((product) => {
      const { price, discountPrice } = product;

      if (
        typeof discountPrice === "number" &&
        typeof price === "number" &&
        discountPrice > price
      ) {
        const discountPercentage = Math.floor(
          ((discountPrice - price) / discountPrice) * 100
        );
        return discountPercentage >= 35;
      }
      return false;
    });

    res.json(saleProducts);
  } catch (error) {
    console.error("Error fetching sale products:", error.message);
    res.status(500).send("Server error");
  }
});

// Backend: routes/products.js
// Update stock of products after checkout success
router.post('/update-stock', async (req, res) => {
  try {
    const { items } = req.body; // [{ productId, quantity }]

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) continue;

      product.countInStock = Math.max(product.countInStock - item.quantity, 0);
      await product.save();
    }

    res.status(200).json({ message: "Stock updated" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi cập nhật tồn kho", error });
  }
});


//@route GET /api/products/:id
//@desc Get a single product by ID
//@access Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

//@route GET /api/products/similar/:id
//@desc Get similar products based on the current product's gender and category
//@access Public
router.get("/similar/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const similarProducts = await Product.find({
      _id: { $ne: id }, //Choose the products that are not the current product ID
      gender: { $in: product.gender }, // Choose products with the same gender at least one gender as the current product
      category: product.category,
    }).limit(4); // Only show 4 similar products
    res.json(similarProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});



module.exports = router;
