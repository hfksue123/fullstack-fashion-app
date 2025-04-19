const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

//@route POST /api/users/register
//@desc Register a new user
//@access Public
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ name, email, password });
    await user.save();

    // ✅ Không trả token, chỉ báo thành công
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

//@route POST /api/users/login
//@desc Authenticate a user
//@access Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    //Find the user by email
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    //Create JWT Payload
    const payload = { user: { id: user._id, role: user.role } };
    //Sign and return token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;
        //send the user and token in response
        res.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

//@route GET /api/users/profile
//@desc Get logged in user's profile (Protected route)
//@access Private
router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
