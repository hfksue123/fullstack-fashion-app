const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/Cart");

const products = require("./data/products");

dotenv.config();

//Connect to DB
mongoose.connect(process.env.MONGODB_URI);
//Function to seed DB
const seedData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    // Create a default adin user
    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    });
    //Assign the default user ID to each product
    const userID = createdUser._id;
    const sampleProducts = products.map((product) => {
      return {
        ...product,
        user: userID,
      };
    });
    //Insert the products into the DB
    await Product.insertMany(sampleProducts);
    console.log("Data seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();