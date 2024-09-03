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
    };
  };