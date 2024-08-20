const mongoose = require("mongoose");

const Product = new mongoose.Schema({
  name: String,
  price: Number,
  weight: Number,
  quantity: Number,
  images: [String],
});

module.exports = mongoose.model("Product", Product);
