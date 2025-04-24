const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');
const Cart = require('./models/Cart');

const products = require('./data/products');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

// Function to seed DB
const seedData = async () => {
  try {
    const action = process.argv[2]; // "reset" or undefined

    // Clear user and cart data
    await User.deleteMany();
    await Cart.deleteMany();

    // Create admin user
    const createdUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
    });

    const userID = createdUser._id;

    if (action === 'reset') {
      // Reset mode: delete all products and reinsert all
      await Product.deleteMany();

      const resetProducts = products.map((product) => ({
        ...product,
        user: userID,
      }));

      await Product.insertMany(resetProducts);
      console.log(`${resetProducts.length} products reset and inserted.`);
    } else {
      // Update mode: only insert new products
      const existingSkus = await Product.find().distinct('sku');
      const newProducts = products
        .filter((product) => !existingSkus.includes(product.sku))
        .map((product) => ({
          ...product,
          user: userID,
        }));

      if (newProducts.length > 0) {
        await Product.insertMany(newProducts);
        console.log(`${newProducts.length} new products added.`);
      } else {
        console.log('No new products to add.');
      }
    }

    console.log('Seeding completed.');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
