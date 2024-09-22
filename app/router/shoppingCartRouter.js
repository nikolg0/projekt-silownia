const express = require("express");
const router = express.Router();

const calculateTotal = require("../middlewares/calculateTotalMiddleware");
const cartStatus = require("../middlewares/cartStatusMiddleware");
const customerController = require("../controllers/customerController");
const shoppingCartController = require("../controllers/shoppingCartController");
const { addToCart } = require("../controllers/shoppingCartController");
const { addShipment } = require("../controllers/shoppingCartController");
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

router.post(
  "/koszyk/:cartId/dostawa",
  shoppingCartController.selectShipmentOption
);

router.post("/koszyk/:cartId", calculateTotal(), cartStatus(), orderSummary);

router.get(
  "/zamowienie/:cartId",
  cartStatus(),
  calculateTotal(),
  shoppingCartController.summaryOrderView,

  (req, res) => {
    const cartProducts = res.locals.carts;
    const totalCost = res.locals.totalCost;
    const shippingCost = res.locals.shippingCost;
    const cartTotal = res.locals.cartTotal;

    res.render("customerViews/placingOrderView", {
      cartProducts: cartProducts,
      totalCost: totalCost,
      shippingCost: shippingCost,
      cartTotal: cartTotal,
    });
  }
);

module.exports = router;
