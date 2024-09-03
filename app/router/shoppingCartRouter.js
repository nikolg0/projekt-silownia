const express = require("express");
const router = express.Router();
const cartStatus = require("../middlewares/cartStatusMiddleware");
const customerController = require("../controllers/customerController");

router.get("/produkty", cartStatus(), customerController.index);

const { addToCart } = require("../controllers/shoppingCartController");

router.get("/", cartStatus(), (req, res) => {
  res.render("customerViews/mainPage");
});

router.post("/do-koszyka", addToCart);

module.exports = router;
