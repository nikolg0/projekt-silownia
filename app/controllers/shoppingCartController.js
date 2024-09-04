const ShoppingCart = require("../models/ShoppingCart");

module.exports = {
  index: (req, res) => {
    ShoppingCart.find({})
      .lean()
      .then((carts) => {
        res.render("customerViews/shoppingCartView", {
          carts: carts,
        });
      })
      .catch((err) => {
        res.send(err);
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
};
