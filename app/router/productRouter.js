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

router.get("/produkty/edytuj/:id", productController.editForm);

router.post("/produkty/edytuj/:id", productController.update);

router.get("/produkty/usuwanie/:id", productController.delete);

module.exports = router;
