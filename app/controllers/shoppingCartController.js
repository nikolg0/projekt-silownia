const ShoppingCart = require("../models/ShoppingCart");


module.exports = {

  addToCart: async (req, res) => {
    const userId = req.user ? req.user._id : null;
    const { productId, quantity } = req.body;

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
