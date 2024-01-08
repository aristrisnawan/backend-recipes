const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const multer = require("multer");

//Set storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { filename, path, size } = req.file;
    const { title, description, steps } = req.body;
    const post = new Post({ filename, path, size, title, description, steps });
    console.log(filename, path, size);
    if (size > 972546) {
      return res.status(400).json({ message: "Size file too big" });
    }
    await post.save();
    res.status(201).json({
      message: "File Upload success",
      file: { filename, size, path, title, description, steps },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Show all data
router.get("/recipes", async (req, res) => {
  try {
    const data = await Post.find();
    res.status(200).json({ message: "Success show data", data });
  } catch (error) {
    res.status(500).json({ message: "Internet server error" });
  }
});

module.exports = router;
