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
    const {title, description} = req.body
    const post = new Post({ filename, path, size,title, description });
    console.log(filename, path, size);
    if(size > 9000){
        return res.status(400).json({message: 'Size file too big'})
    }
    await post.save();
    res.status(201).json({
      message: "File Upload success",
      file: { filename, size, path, title, description },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
