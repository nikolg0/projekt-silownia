const User = require("../models/Users");
const cookieParser = require("cookie-parser");
const ShoppingCart = require("../models/ShoppingCart");

module.exports = {
  cartStatus: async (req, res, next) => {
    let cartId = req.cookies.cartId;

    if (cartId) {
      try {
        let cart = await ShoppingCart.findById(cartId).populate(
          "products.productId"
        );

        if (!cart) {
          res.clearCookie("cartId");
          res.locals.cartItemCount = 0;
        } else {
          const cartItemCount = cart.products.reduce(
            (total, product) => total + product.quantity,
            0
          );
          res.locals.cartItemCount = cartItemCount;
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
        res.status(500).send("Internal server error");
        return;
      }
    } else {
      res.locals.cartItemCount = 0;
    }

    next();
  },

  addToCart: async (req, res) => {
    const userId = req.user ? req.user._id : null;
    const { productId, quantity } = req.body;

    let cartId = req.cookies.cartId;
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
      (p) => p.productID.toString() === productId
    );

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      cart.products.push({
        productID: productId,
        quantity: quantity,
      });
    }

    await cart.save();

    res.cookie("cartId", cart._id, { httpOnly: true });

    await this.cartStatus(req, res, () => {});
  },
};
