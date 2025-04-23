const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/Cart");

const products = require("./data/products");

dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGODB_URI);

// Function to seed DB
const seedData = async () => {
  try {
    // Clear users and carts, but keep existing products
    await User.deleteMany();
    await Cart.deleteMany();

    // Create default admin user
    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    });

    const userID = createdUser._id;

    // Get all existing SKUs from DB
    const existingSkus = await Product.find().distinct("sku");

    // Filter products: only those with SKUs not already in DB
    const newProducts = products
      .filter((product) => !existingSkus.includes(product.sku))
      .map((product) => ({
        ...product,
        user: userID,
      }));

    // Insert new products if any
    if (newProducts.length > 0) {
      await Product.insertMany(newProducts);
      console.log(`${newProducts.length} new products added.`);
    } else {
      console.log("No new products to add.");
    }

    console.log("Seeding completed.");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
