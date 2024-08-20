const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/logowanie", (req, res) => {
  res.render("userViews/loginUser");
});

router.post("/logowanie", userController.login);

router.get("/rejestracja", (req, res) => {
  res.render("userViews/signupUser");
});

router.post("/rejestracja", userController.create);

router.get("/wyloguj", userController.logout);

module.exports = router;
