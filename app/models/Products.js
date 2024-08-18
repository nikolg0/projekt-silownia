const mongoose = require("moongose");

const Product = new mongoose.Schema({
  name: String,
  price: Number,
});

module.exports = mongoose.model("Product", Product);
