const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

//@route POST /api/subscribers
//@desc Handle newsletter subscription
//@access Public
router.post("/", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    //check if email already exists
    let subscriber = await Subscriber.findOne({ email });
    if (subscriber) {
      return res.status(400).json({ message: "You are already subscribed." });
    }
    // Validate email format strictly
    const isValidEmail =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(email);
    if (!isValidEmail) {
      return res
        .status(400)
        .json({
          message: "Invalid email format. Please enter a valid email address.",
        });
    }

    //Create a new subcriber
    subscriber = new Subscriber({ email });
    await subscriber.save();
    res.status(201).json({ message: "You are successfully subscribed." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
