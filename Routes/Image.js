const express = require("express");
const { upload } = require("../Middleware/Multer.Middleware");
const Image = require("../Models/Image");
const router = express.Router();

// Upload image route
router.post("/upload/", upload().single("image"), async (req, res) => {
  try {
    const imageURL = `/uploads/${req.file.filename}`;
    const newImage = new Image({ url: imageURL });

    await newImage.save();

    res
      .status(200)
      .json({ message: "Image uploaded successfully", image: newImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all images route
router.get("/", async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const image = await Image.findById(req.params.id);
//     res.status(200).json(image);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

module.exports = router;
