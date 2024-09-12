const express = require("express");
const router = express.Router();

const calculateTotal = require("../middlewares/calculateTotalMiddleware");
const cartStatus = require("../middlewares/cartStatusMiddleware");
const customerController = require("../controllers/customerController");
const shoppingCartController = require("../controllers/shoppingCartController");
const { addToCart } = require("../controllers/shoppingCartController");
const { orderSummary } = require("../controllers/shoppingCartController");

router.get("/produkty", cartStatus(), customerController.index);

router.get("/", cartStatus(), (req, res) => {
  res.render("customerViews/mainPage");
});

router.post("/do-koszyka", addToCart);

router.post(
  "/koszyk/:cartId/product/:productId",
  shoppingCartController.deleteProduct
);

router.get("/koszyk", cartStatus(), shoppingCartController.index);

router.get("/zamowienie", cartStatus(), (req, res) => {
  const cartProducts = res.locals.carts;

  router.post("/koszyk/:cartId", calculateTotal(), orderSummary);

  res.render("customerViews/placingOrderView", {
    cartProducts: cartProducts,
  });
});

module.exports = router;
