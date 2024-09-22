const mongoose = require("mongoose");

const ProductOrder = new mongoose.Schema({
  date: Date,
  cost: Number,
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
    country: String,
    street: String,
    suite: String,
    city: String,
    zipcode: String,
  },

  shipmentOption: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShipmentOption",
  },
});

module.exports = mongoose.model("ProductOrder", ProductOrder);
