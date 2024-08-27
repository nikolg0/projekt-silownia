const Product = require("../models/Products");

module.exports = {
  index: (req, res) => {
    Product.find({})
      .lean()
      .then((products) => {
        res.render("customerViews/productsPage", {
          products: products,
        });
      })
      .catch((err) => {
        res.send(err);
      });
  },
};
