const mongoose = require("mongoose");

const Ticket = new mongoose.Schema({
  packOption: [
    {
      standard: {
        duration: Date,
        price: Number,
      },
      deluxe: {
        duration: Date,
        price: Number,
      },
      ultimate: {
        duration: Date,
        price: Number,
      },
    },
  ],
});

module.exports = mongoose.model("Ticket", Ticket);
