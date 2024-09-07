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

const userRouter = require("./app/router/userRouter");

const productRouter = require("./app/router/productRouter");

const checkRole = require("./app/middlewares/roleMiddleware");

const shoppingCartRouter = require("./app/router/shoppingCartRouter");

app.use("/dashboard", checkRole("admin"), productRouter);

app.use("/auth", userRouter);

app.use("/", shoppingCartRouter);

app.listen(8008, function () {
  console.log("Serwer działa");
});
