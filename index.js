const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

mongoose.connect("mongodb://127.0.0.1:27017/projekt-silownia");

app.engine("hbs", hbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const checkRole = require("./app/middlewares/roleMiddleware");

const userController = require("./app/controllers/userController");

app.get("/", (req, res) => {
  res.render("customerViews/mainPage");
});

app.get("/dashboard", checkRole("admin"), (req, res) => {
  res.render("userViews/dashboard");
});

app.get("/auth/logowanie", (req, res) => {
  res.render("userViews/loginUser");
});

app.post("/auth/logowanie", userController.login);

app.get("/auth/rejestracja", (req, res) => {
  res.render("userViews/signupUser");
});

app.post("/auth/rejestracja", userController.create);

app.listen(8008, function () {
  console.log("Serwer działa");
});
