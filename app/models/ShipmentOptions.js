const mongoose = require("mongoose");

const shipmentOption = new mongoose.Schema({
  value: Number,
  name: String,
});

module.exports = mongoose.model("shipmentOption", shipmentOption);
