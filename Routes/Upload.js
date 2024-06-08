const fs = require("fs");
const path = require("path");
const express = require("express");
const { upload } = require("../Middleware/Multer.Middleware");

const router = express.Router();

router.post("/uploadimage", upload().single("image"), (req, res) => {
  if (req.file) {
    res.status(200).send("Image uploaded successfully");
  } else {
    res.status(400).send("No file uploaded.");
  }
});

module.exports = router;
