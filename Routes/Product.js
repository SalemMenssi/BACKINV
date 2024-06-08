const express = require("express");
const {
  addProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  changeImageProduct,
} = require("../Controller/Product.Controller");
const router = express.Router();

router.post("/", addProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);
router.post("/change-avatar/:id/:imageId", changeImageProduct);

module.exports = router;
