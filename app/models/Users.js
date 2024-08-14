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
  },
  {
    timestamps: true,
  }
);

const ROLE = {
  ADMIN: "admin",
  USER: "user",
};

module.exports = {
  ROLE: ROLE,
  users: [
    { id: 1, name: "Ben", role: ROLE.ADMIN },
    { id: 2, name: "Benny", role: ROLE.USER },
    { id: 3, name: "Buck", role: ROLE.USER },
  ],
  tasks: [
    { id: 1, name: "Ben's taks", userId: 1 },
    { id: 2, name: "Benny's tasks", userId: 2 },
    { id: 3, name: "Buck's tasks", userId: 3 },
  ],
};

module.exports = mongoose.model("User", User);
