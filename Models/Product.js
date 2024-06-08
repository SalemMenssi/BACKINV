const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  sellPrice: { type: Number, required: true },
  image: { type: Schema.Types.ObjectId, ref: "Image" },
  ref: String,
});

module.exports = Product = mongoose.model("product", ProductSchema);
