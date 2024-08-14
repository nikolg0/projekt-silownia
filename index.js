const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/projekt-silownia");

app.engine("hbs", hbs.engine({ extname: ".hbs" }));
app.set("view enginge", "hbs");

app.use(express.static("public"));

app.use(express.json());

app.get("/dashboard", checkRole("admin"), (req, res) => {
  res.send("Dashboard");
});

app.listen(8008, function () {
  console.log("Serwer działa");
});
