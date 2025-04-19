const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//Helper function to get a cart by user ID or guest ID
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

//@route POST api/cart
//@desc Add product to cart for a guest or logged in user
//@access Public
router.post("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    //Determine if the user is a guest or a logged in
    let cart = await getCart(userId, guestId);

    //If the cart exists, update it
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );

      if (productIndex > -1) {
        //If the product is already in the cart, increase the quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        //If the product is not in the cart, add it
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          size,
          color,
          quantity,
        });
      }

      //Recalculate the total price
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      // Create a new cart for the guest or user
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//@route PUT api/cart
//@desc Update product quantity in cart for a guest or logged in user
//@access Public
router.put("/", async (req, res) => {
  const { productId, quantity, size, color, userId, guestId } = req.body;

  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Find the product in the cart
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );
    if (productIndex > -1) {
      //update quantity
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1); //remove the product if quantity is 0
      }
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//@route DELETE api/cart
//@desc Remove product from cart
//@access Public
router.delete("/", async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );
    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//@route GET api/cart
//@desc Get logged-in user's or guest's cart
//@access Public
router.get("/", async (req, res) => {
  const { userId, guestId } = req.query;
  try {
    const cart = await getCart(userId, guestId);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//@route POST /api/cart/merge
//@desc Merge guest cart into logged-in user's cart upon login
//@access Private
router.post("/merge", protect, async (req, res) => {
  const { guestId } = req.body;

  // Validate guestId
  if (!guestId) {
    return res.status(400).json({ message: "Missing guestId" });
  }

  try {
    // Find carts
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    // If there's no guest cart, return user's cart or a message
    if (!guestCart) {
      return res
        .status(200)
        .json(userCart || { message: "No guest cart to merge" });
    }

    // If guest cart is empty, remove it and return user's cart
    if (guestCart.products.length === 0) {
      await Cart.findOneAndDelete({ guestId });
      return res
        .status(200)
        .json(userCart || { message: "Guest cart was empty" });
    }

    // If user already has a cart, merge guest cart into it
    if (userCart) {
      guestCart.products.forEach((guestItem) => {
        const productIndex = userCart.products.findIndex(
          (item) =>
            item.productId.toString() === guestItem.productId.toString() &&
            item.size === guestItem.size &&
            item.color === guestItem.color
        );

        if (productIndex !== -1) {
          // If item already exists in user cart, increase quantity
          userCart.products[productIndex].quantity += guestItem.quantity;
        } else {
          // If item is new, add it to user cart
          userCart.products.push({
            productId: guestItem.productId,
            name: guestItem.name,
            image: guestItem.image,
            price: guestItem.price,
            size: guestItem.size,
            color: guestItem.color,
            quantity: guestItem.quantity,
          });
        }
      });

      // Recalculate total price
      userCart.totalPrice = userCart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await userCart.save();

      // Remove guest cart after successful merge
      await Cart.findOneAndDelete({ guestId });

      return res.status(200).json(userCart);
    } else {
      // If user has no existing cart, convert guest cart to user cart
      guestCart.user = req.user._id;
      guestCart.guestId = undefined;

      await guestCart.save();
      return res.status(200).json(guestCart);
    }
  } catch (error) {
    console.error("Cart merge error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
