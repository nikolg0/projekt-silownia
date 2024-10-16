const ShoppingCart = require("../models/ShoppingCart");
const ShipmentOption = require("../models/ShipmentOptions");

module.exports = {
  index: async (req, res) => {
    const cartId = req.cookies.cartId;
    const cartProducts = res.locals.carts;
    const cartTotal = res.locals.cartTotal;

    console.log("cartId", cartId);
    console.log("cartProducts", cartProducts);

    res.render("customerViews/shoppingCartView", {
      cartId: req.cookies.cartId,
      cartProducts: res.locals.carts,
      cartTotal: res.locals.cartTotal,
      shippingCost: res.locals.shippingCost,
      totalCost: res.locals.totalCost,
    });
  },

  addToCart: async (req, res) => {
    const userId = req.user ? req.user._id : null;
    const { productId } = req.body;
    const quantity = Number(req.body.quantity);

    const cartId = req.cookies.cartId;
    let cart;

    if (cartId) {
      cart = await ShoppingCart.findById(cartId);
    }

    if (!cart) {
      cart = new ShoppingCart({
        userId,
        products: [],
      });
    }

    const existingProductIndex = cart.products.findIndex(
      (p) => p.productId?.toString() === productId
    );

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      cart.products.push({
        productId: productId,
        quantity: quantity,
      });
    }

    await cart.save();

    res.cookie("cartId", cart._id, { httpOnly: true });

    res.redirect("/produkty");
  },

  deleteProduct: (req, res) => {
    const { cartId, productId } = req.params;

    ShoppingCart.findById(cartId)
      .then((cart) => {
        if (!cart) {
          return res.status(404).send("Nie znaleziono koszyka.");
        }

        cart.products = cart.products.filter(
          (product) => product.productId.toString() !== productId
        );

        return cart.save();
      })
      .then(() => {
        res.redirect("/koszyk");
      })
      .catch((err) => {
        res.send(err);
      });
  },

  selectShipmentOption: async (req, res) => {
    const { shipment } = req.body;
    const cartId = req.cookies.cartId;
    try {
      const cart = ShoppingCart.findById(cartId)
        .populate("products.productId")
        .lean();

      if (!cart) {
        return res.status(404).send("Nie znaleziono koszyka.");
      }

      const shipmentOption = await ShipmentOptions.findById(shipment);

      if (!shipmentOption) {
        return res.statys(404).sen("Nie znaleziono opcji wysyłki");
      }

      cart.shipmentOption = shipment._id;
      cart.totalCost = cart.cartTotal + shipmentOption.cost;

      await cart.save();

      res.redirect(`/koszyk/${cartId}`);
    } catch (err) {
      console.error("Błąd w aktualizacji opcji wysyłki", err);
    }
  },

  orderSummary: async (req, res) => {
    try {
      const shipmentOptions = await ShipmentOption.find().lean();
      res.render("customerViews/shoppingCartView", {
        cartProducts: res.locals.carts,
        cartTotal: res.locals.cartTotal,
        shippingCost: res.locals.shippingCost,
        totalCost: res.locals.totalCost,
        cartId: req.cookies.cartId,
        shipmentOptions,
      });
    } catch (err) {
      console.error("Błąd wysylka", err);
      res.status(500).send("Wystąpił błąd");
    }
  },

  summaryOrderView: (req, res) => {
    const cartId = req.cookies.cartId;

    console.log("cartID", cartId);

    res.render("customerViews/placingOrderView", {
      cartId: cartId,
      cartProducts: res.locals.carts,
      cartTotal: res.locals.cartTotal,
      shippingCost: res.locals.shippingCost,
      totalCost: res.locals.totalCost,
    });
  },
};
