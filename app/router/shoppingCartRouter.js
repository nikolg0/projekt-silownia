const express = require("express");
const router = express.Router();
const cartStatus = require("../middlewares/cartStatusMiddleware");
const customerController = require("../controllers/customerController");
const shoppingCartController = require("../controllers/shoppingCartController");
const { addToCart } = require("../controllers/shoppingCartController");

router.get("/produkty", cartStatus(), customerController.index);

router.get("/", cartStatus(), (req, res) => {
  res.render("customerViews/mainPage");
});

router.post("/do-koszyka", addToCart);

router.get("/koszyk", cartStatus(), shoppingCartController.index);

module.exports = router;
