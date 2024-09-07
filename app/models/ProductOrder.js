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
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  shippingAddress: {
    street: String,
    city: String,
    zipcode: String,
  },
});

module.exports = mongoose.model("ProductOrder", ProductOrder);
