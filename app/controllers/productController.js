const Product = require("../models/Products");

module.exports = {
  index: (req, res) => {
    Product.find({})
      .lean()
      .then((products) => {
        res.render("userViews/dashboard", {
          products: products,
        });
      })
      .catch((err) => {
        res.send(err);
      });
  },

  create: (req, res) => {
    const { name, price } = req.body;

    const newProduct = new Product({ name, price });
    newProduct
      .save()
      .then(() => {
        res.redirect("/dashboard/produkty");
      })
      .catch((err) => {
        res.send(err);
      });
  },

  delete: (req, res) => {
    Product.findByIdAndDelete(req.params.id)
      .then(() => {
        res.redirect("/dashboard/produkty");
      })
      .catch((err) => {
        res.send(err);
      });
  },
};
