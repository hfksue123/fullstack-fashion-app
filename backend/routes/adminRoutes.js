const express = require("express");
const User = require("../models/User");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

//@route GET /api/admin/users
//@desc Get all users (admin only)
//@access Private/Admin
router.get("/", protect, admin, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//@route POST /api/admin/users
//@desc Create a new user (admin only)
//@access Private/Admin
router.post("/", protect, admin, async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    user = new User({
      name,
      email,
      password,
      role: role || "customer",
    });
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//@route PUT /api/admin/users/:id
//@desc Update a user (admin only) - name,email,role
//@access Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
    }
    const updateUser = await user.save();
    res.json({ message: "User updated successfully", user: updateUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//@route DELETE /api/admin/users/:id
//@desc Delete a user (admin only)
//@access Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.deleteOne();
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
