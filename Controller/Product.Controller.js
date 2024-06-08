const Image = require("../Models/Image");
const Product = require("../Models/Product");

exports.addProduct = async (req, res) => {
  try {
    const newProduct = new Product({ ...req.body });
    await newProduct.save();
    res.status(200).send({ msg: "Product added", product: newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error" });
  }
};
exports.getAllProducts = async (req, res) => {
  try {
    let productList = await Product.find().populate("image");
    res.status(200).send({ msg: "List of products", productList });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "can not get all products" }] });
  }
};
exports.getProductById = async (req, res) => {
  try {
    let productToFind = await Product.findById(req.params.id).populate("image");
    res.status(200).send({ msg: "get product by id", product: productToFind });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "failed to get product" }] });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id });
    res.status(200).send({ msg: "product deleted" });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "faild to delete product" }] });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const result = await Product.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    if (result.modifiedCount) {
      return res.status(200).send("product updated");
    }
    res.status(200).send({ msg: "no modification" });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "faild to update product" }] });
  }
};
exports.changeImageProduct = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: "service not found" });
    }

    const image = await Image.findById(req.params.imageId);

    service.image = image;
    await service.save();

    res.status(200).json({ message: "Image changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
