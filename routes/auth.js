const express = require("express");
const router = express.Router();
const User = require("../models/user");

//SignUp
router.post("/signup", async (req, res) => {
  try {
    const { username, password, fullName } = req.body;
    const user = new User({ username, fullName, password });
    const data = await user.save();
    console.log('hai',existingUsername);
    res
      .status(201)
      .json({ data: data, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internet server Error" });
  }
});

//Login
router.post("/login", () => {
  console.log("Login");
});

module.exports = router;
