const jwt = require("jsonwebtoken");
const User = require("../models/Users");

module.exports = (role) => {
  return (req, res, next) => {
    const token = req.cookies["AuthToken"];
    console.log("token z roli " + token);
    try {
      const verified = jwt.verify(token, "secretKey");
      console.log("token zweryfikowany");
      User.findById(verified._id)
        .then((user) => {
          if (user.role !== role) {
            res.status(401);
            return res.send("not allowed");
          }
          next();
        })
        .catch((err) => {
          res.send(err);
        });
    } catch {
      console.log("błąd");
      res.redirect("/auth/login?loginRedirect=true");
    }
  };
};
