const mongoose = require("moongose");

const Ticket = new mongoose.Schema({
  duration: Date,
  packOption: {
    standard: String,
    medium: String,
    deluxe: String,
  },
});

module.exports = mongoose.model("Ticket", Ticket);
