const mongoose = require("moongose");

const TicketOrder = new mongoose.Schema({
  date: Date,
  userId: String,
  ticketsIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TicketIds",
    },
  ],
});

module.exports = mongoose.model("TicketOrder", TicketOrder);
