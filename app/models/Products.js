const mongoose = require("moongose");

const Product = new mongoose.Schema({
  protein: String,
  proteinSnacks: String,
  shaker: String,
});

module.exports = mongoose.model("Product", Product);
