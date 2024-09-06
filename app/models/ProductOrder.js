const mongoose = require("mongoose");

const ProductOrder = new mongoose.Schema({
  date: Date,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  customerData: {
    name: String,
    surname: String,
    email: String,
    phoneNumber: Number,
  },
  productsIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductIds",
    },
  ],
  shippingAddress: {
    street: String,
    city: String,
    zipcode: String,
  },
});

module.exports = mongoose.model("ProductOrder", ProductOrder);
