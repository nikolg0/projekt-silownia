const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = require("../middlewares/uploadMiddleware");

router.get("/", (req, res) => {
  res.render("dashboardViews/dashboard");
});

router.get("/produkty", productController.index);

router.get("/produkty/dodaj", (_req, res) => {
  res.render("dashboardViews/addProduct");
});

router.post(
  "/produkty/dodaj",
  upload.single("image"),
  productController.create
);

router.get("/produkty/edytuj/:id", productController.editForm);

router.post(
  "/produkty/edytuj/:id",
  upload.single("image"),
  productController.update
);

router.get("/produkty/usuwanie/:id", productController.delete);

module.exports = router;
