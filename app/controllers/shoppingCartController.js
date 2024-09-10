const ShoppingCart = require("../models/ShoppingCart");

module.exports = {
  index: async (req, res) => {
    const cartId = req.cookies.cartId;
    const cartProducts = res.locals.carts;
    const cartTotal = res.locals.cartTotal;

    console.log("cartId", cartId);
    console.log("cartProducts", cartProducts);

    res.render("customerViews/shoppingCartView", {
      cartId: cartId,
      cartProducts: cartProducts,
      cartProductCount: res.locals.cartProductCount,
      cartTotal: cartTotal,
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
          return res.status(404).sen("Nie znaleziono koszyka.");
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
};
