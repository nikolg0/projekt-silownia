const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

User.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      res.send(err);
    }

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        res.send(err);
      }

      user.password = hash;
      next();
    });
  });
});

User.methods.generateAuthToken = (user) => {
  const token = jwt.sign({ _id: user._id }, "secretKey", { expiresIn: "1h" });
  return token;
};

module.exports = mongoose.model("User", User);
