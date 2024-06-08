const express = require("express");
const {
  addService,
  getAllServices,
  getServiceById,
  deleteService,
  updateService,
  changeImage,
} = require("../Controller/Services.Controller");
const router = express.Router();

router.post("/", addService);
router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.delete("/:id", deleteService);
router.put("/:id", updateService);
router.post("/change-avatar/:id/:imageId", changeImage);

module.exports = router;
