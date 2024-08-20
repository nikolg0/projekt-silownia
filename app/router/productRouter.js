const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const checkRole = require("../middlewares/roleMiddleware");

router.get(
  "/produkty",
  checkRole("admin"),
  productController.index,
  (req, res) => {
    res.render("userViews/dashboard");
  }
);

router.get("/produkty/dodaj", (_req, res) => {
  res.render("productViews/addProduct");
});

router.post("/produkty/dodaj", productController.create);

module.exports = router;
