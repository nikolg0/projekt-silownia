const mongoose = require("mongoose");

const TicketOrder = new mongoose.Schema({
  date: Date,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  ticketsIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TicketIds",
    },
  ],
});

module.exports = mongoose.model("TicketOrder", TicketOrder);
