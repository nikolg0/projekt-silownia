const ShoppingCart = require("../models/ShoppingCart");

module.exports = () => {
  return async (req, res, next) => {
    try {
      const { cartId } = req.params;

      const cart = await ShoppingCart.findById(cartId)
        .populate("products.productId")
        .lean();

      if (!cart) {
        return res.status(404).send("Nie znaleziono koszyka.");
      }

      const cartProducts = cart.products.map((item) => ({
        ...item.productId,
        quantity: item.quantity,
      }));

      const cartTotal = cartProducts.reduce((total, product) => {
        const price = parseFloat(product.price) || 0;
        const quantity = parseFloat(product.quantity) || 0;
        return total + price * quantity;
      }, 0);

      const shippingCost = parseFloat(req.body.shipment) || 0;

      console.log("cartotal (numeryczny):", cartTotal);
      console.log("shipping (numeryczny):", shippingCost);

      const totalCost = (cartTotal + shippingCost).toFixed(2);

      console.log("pełny koszt", totalCost);

      res.locals.carts = cartProducts;
      res.locals.cartTotal = cartTotal.toFixed(2);
      res.locals.shippingCost = shippingCost.toFixed(2);
      res.locals.totalCost = totalCost;

      req.cookies.cartId = cartId;

      next();
    } catch (err) {
      console.error("Błąd w obliczaniu kwoty.", err);
      res.status(500).send("Wystąpił błąd podczas obliczania");
    }
  };
};
