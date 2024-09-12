const ShoppingCart = require("../models/ShoppingCart");

module.exports = () => {
  return async (req, res, next) => {
    try {
      const { cartId } = req.params;

      const cart = await ShoppingCart.findById(cartId).lean();

      if (!cart) {
        return res.status(404).send("Nie znaleziono koszyka.");
      }

      const cartProducts = cart.products.map((item) => ({
        ...item.productId,
        quantity: item.quantity,
      }));

      const cartTotal = cartProducts.reduce((total, product) => {
        const multiply = product.price * product.quantity;
        return total + multiply;
      }, 0);

      const shippingCost = req.body.shipment;

      const totalCost = (cartTotal + shippingCost).toFixed(2);

      res.locals.cartTotal = cartTotal;
      res.locals.shippingCost = shippingCost;
      res.locals.totalCost = totalCost;

      next();
    } catch (err) {
      console.error("Błąd w obliczaniu kwoty.", err);
      res.status(500).send("Wystąpił błąd podczas obliczania");
    }
  };
};
