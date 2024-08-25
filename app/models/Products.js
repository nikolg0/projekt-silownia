const mongoose = require("mongoose");

const Product = new mongoose.Schema({
  name: String,
  price: Number,
  weight: {
    value: Number,
    unit: String,
  },
  quantity: Number,
  description: String,
  images: [String],
});

module.exports = mongoose.model("Product", Product);
