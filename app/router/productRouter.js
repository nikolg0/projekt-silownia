const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const checkRole = require("../middlewares/roleMiddleware");

router.get("/", checkRole("admin"), (req, res) => {
  res.render("userViews/dashboard");
});

module.exports = router;
