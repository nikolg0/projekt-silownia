const User = require("../models/Users");
const cookieParser = require("cookie-parser");

module.exports = {
  addToCart: (req, res, next) => {
    const userId = req.user ? req.user.userId : null;
    if (userId) {
      const cart = req.cookies[`cart_${userId}`]
        ? JSON.parse(req.cookies[`cart_${userId}`])
        : [];
      res.locals.cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    } else {
      res.locals.cartCount = 0;
    }
    next();
  },
};
