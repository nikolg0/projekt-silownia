const User = require("../models/Users");
const bcrypt = require("bcrypt");

module.exports = {
  create: (req, res) => {
    const { email, password, name, surname, user, admin } = req.body;

    const newUser = new User({ email, password, name, surname, user, admin });
    newUser
      .save()
      .then(() => {
        res.redirect("/auth/logowanie");
      })
      .catch((err) => {
        res.send(err);
      });
  },

  login: (req, res) => {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          res.render("userViews/loginUser", {
            error: true,
            message: "Użytkownik nie istnieje.",
            user: req.body,
          });
          return;
        }

        bcrypt.compare(req.body.password, user.password, (err, logged) => {
          if (err) {
            res.render("userViews/loginUser", {
              error: true,
              message: "Błąd logowania.",
              user: { email: req.body.email, password: "" },
            });
            return;
          }

          if (logged) {
            const token = user.generateAuthToken(user);
            res.cookie("AuthToken", token);
            res.redirect("/");
          } else {
            res.render("userViews/loginUser", {
              error: true,
              message: "Dane użytkownika nie pasują.",
              user: { email: req.body.email, password: "" },
            });
            return;
          }
        });
      })
      .catch((err) => {
        res.send(err);
      });
  },

  logout: (req, res) => {
    res.clearCookie("AuthToken");
    res.redirect("/auth/logowanie");
  },
};
