const fs = require("fs");
const path = require("path");
const multer = require("multer");

exports.upload = () => {
  return (imageUpload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        const path = `uploads/`;
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
      },
      filename: function (req, file, cb) {
        const originalExtension = path.extname(file.originalname); // Extract original extension
        const currentDate = new Date().toISOString().replace(/:/g, "-"); // Get current date as a string
        const newName = `${currentDate}_${file.originalname}`; // Concatenate date and original filename
        cb(null, newName);
      },
    }),
    limits: { fieldSize: 10000000 },
    fileFilter: function (req, file, cb) {
      cb(null, path);
    },
  }));
};
