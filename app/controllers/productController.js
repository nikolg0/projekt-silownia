const Product = require("../models/Products");

module.exports = {
  index: (req, res) => {
    Product.find({})
      .lean()
      .then((products) => {
        res.render("dashboardViews/dashboardProductsList", {
          products: products
        });
      })
      .catch((err) => {
        res.send(err);
      });
  },

  create: (req, res) => {
    const { name, price, weight, quantity, unit, description } = req.body;
    const image = req.file.filename;

    const newProduct = new Product({
      name,
      price,
      weight: { value: weight, unit: unit },
      quantity,
      description,
      images: [image],
    });
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

  editForm: (req, res) => {
    Product.findById(req.params.id)
      .then((product) => {
        res.render("dashboardViews/editProduct", product);
      })
      .catch((err) => {
        res.send(err);
      });
  },

  update: (req, res) => {
    Product.findByIdAndUpdate(req.params.id, {
      ...req.body,
      images: [req.file.filename],
    })
      .then((product) => {
        res.redirect("/dashboard/produkty");
      })
      .catch((err) => {
        res.send(err);
      });
  },
};
