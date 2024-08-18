const mongoose = require("moongose");

const ProductOrder = new mongoose.Schema({
  date: Date,
  userId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  productsIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductIds",
    },
  ],
  address: {
    street: String,
    suite: String,
    city: String,
    zipcode: String,
  },
  shipping: String,
});

module.exports = mongoose.model("ProductOrder", ProductOrder);
