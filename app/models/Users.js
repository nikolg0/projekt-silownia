const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    surname: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    birthdate: Date,

    productOrderIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    ticketOrderIds: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Ticket",
      },
    ],

    role: {
      enum: ["user", "admin"],
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", User);
