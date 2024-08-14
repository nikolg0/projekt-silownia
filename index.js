const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const mongoose = require("mongoose");

const { ROLE, users } = require("./app/models/Users");
const { authUser, authRole } = require("./app/routes/basicAuth");

mongoose.connect("mongodb://127.0.0.1:27017/projekt-silownia");

app.engine("hbs", hbs.engine({ extname: ".hbs" }));
app.set("view enginge", "hbs");

app.use(express.static("public"));

app.use(express.json());

app.get("/dashboard", authUser, (req, res) => {
  res.send("Dashboard");
});

app.listen(8008, function () {
  console.log("Serwer działa");
});
