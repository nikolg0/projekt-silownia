const Product = require("../models/Product");

module.exports = {
  create: (req, res) => {
    const { name, price } = req.body;

    const newProduct = new Product({ name, price });
    newProduct
      .save()
      .then(() => {
        res.redirect("/dashboard");
      })
      .catch((err) => {
        res.send(err);
      });
  },

  delete: (req, res) => {
    Product.findByIdAndDelete(req.params.id)
      .then(() => {
        res.redirect("/dashboard");
      })
      .catch((err) => {
        res.send(err);
      });
  },
};
