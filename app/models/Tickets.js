const mongoose = require("mongoose");

const Ticket = new mongoose.Schema({
  duration: Date,
  price: Number,
  packOption: {
    standard: String,
    medium: String,
    deluxe: String,
  },
});

module.exports = mongoose.model("Ticket", Ticket);
