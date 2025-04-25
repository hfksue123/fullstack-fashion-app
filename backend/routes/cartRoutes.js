const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const getCart = async (userId, guestId) => {
  return userId
    ? await Cart.findOne({ user: userId })
    : guestId
    ? await Cart.findOne({ guestId })
    : null;
};

const recalculateTotal = (cart) => {
  cart.totalPrice = cart.products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
};

// Add product to cart
router.post('/', async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await getCart(userId, guestId);

    const newItem = {
      productId,
      name: product.name,
      image: product.images[0]?.url || '',
      price: product.price,
      size,
      color,
      quantity,
    };

    if (cart) {
      const index = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );

      if (index > -1) {
        cart.products[index].quantity += quantity;
      } else {
        cart.products.push(newItem);
      }

      recalculateTotal(cart);
      await cart.save();
      return res.status(200).json(cart);
    } else {
      const newCart = await Cart.create({
        user: userId || undefined,
        guestId: guestId || 'guest_' + Date.now(),
        products: [newItem],
        totalPrice: product.price * quantity,
      });
      return res.status(201).json(newCart);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update quantity
router.put('/', async (req, res) => {
  const { productId, quantity, size, color, userId, guestId } = req.body;
  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const index = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (index > -1) {
      if (quantity > 0) {
        cart.products[index].quantity = quantity;
      } else {
        cart.products.splice(index, 1);
      }
      recalculateTotal(cart);
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Remove product from cart
router.delete('/', async (req, res) => {
  const { productId, size, color, userId, guestId } = req.body;
  try {
    const cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.products = cart.products.filter(
      (p) =>
        !(
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
        )
    );

    recalculateTotal(cart);
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get cart with countInStock per product
router.get('/', async (req, res) => {
  const { userId, guestId } = req.query;

  try {
    const cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const updatedProducts = await Promise.all(
      cart.products.map(async (item) => {
        const product = await Product.findById(item.productId).select("countInStock");
        return {
          ...item.toObject(),
          countInStock: product?.countInStock || 0,
        };
      })
    );

    res.status(200).json({
      ...cart.toObject(),
      products: updatedProducts,
    });
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Merge guest cart
router.post('/merge', protect, async (req, res) => {
  const { guestId } = req.body;
  if (!guestId) return res.status(400).json({ message: 'Missing guestId' });

  try {
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    if (!guestCart) {
      return res.status(200).json(userCart || { message: 'No guest cart to merge' });
    }

    if (guestCart.products.length === 0) {
      await Cart.deleteOne({ guestId });
      return res.status(200).json(userCart || { message: 'Guest cart was empty' });
    }

    if (userCart) {
      guestCart.products.forEach((guestItem) => {
        const index = userCart.products.findIndex(
          (item) =>
            item.productId.toString() === guestItem.productId.toString() &&
            item.size === guestItem.size &&
            item.color === guestItem.color
        );

        if (index > -1) {
          userCart.products[index].quantity += guestItem.quantity;
        } else {
          userCart.products.push(guestItem);
        }
      });

      recalculateTotal(userCart);
      await userCart.save();
      await Cart.deleteOne({ guestId });
      return res.status(200).json(userCart);
    } else {
      guestCart.user = req.user._id;
      guestCart.guestId = undefined;
      await guestCart.save();
      return res.status(200).json(guestCart);
    }
  } catch (err) {
    console.error('Cart merge error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
