const ShoppingCart = require("../models/ShoppingCart");

module.exports = () => {
  return async (req, res, next) => {
    let cartId = req.cookies.cartId;

    if (cartId) {
      try {
        let cart = await ShoppingCart.findById(cartId).populate(
          "products.productId"
        );

        if (!cart) {
          res.clearCookie("cartId");
          res.locals.cartProductount = 0;
        } else {
          const cartProductCount = cart.products.reduce((total, product) => {
            const quantity = Number(product.quantity);
            return total + quantity;
          }, 0);
          res.locals.cartProductCount = cartProductCount;
        }
      } catch (err) {
        console.error("Error", err);
        res.status(500).send("Internal server error");
        return;
      }
    } else {
      res.locals.cartProductCount = 0;
    }

    next();
  };
};
