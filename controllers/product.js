const Product = require("../model/product");

exports.getProducts = (req, res) => {
  Product.findAll()
    .then((products) => {
      res.render("products", {
        products: products,
        path: '/products',
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res) => {
  Product.findByPk(req.params.id).then((product) => {
    console.log(product);
    res.render("product", {
      product: product,
      isAuthenticated: req.session.isLoggedIn,
    });
  });
};

exports.getAddProduct = (req, res) => {
  res.render("add-product", {
    isAddProduct: true,
    isEditProduct: false,
    path: '/add-product',
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postAddProduct = (req, res) => {
  console.log(req.body);
  Product.create({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
  })
    .then((result) => res.redirect("/products"))
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res) => {
  Product.findByPk(req.params.id).then((product) => {
    res.render("add-product", {
      isAddProduct: false,
      isEditProduct: true,
      product: product,
      path: '/edit-product'
    });
  });
};

exports.postEditProduct = (req, res) => {
  Product.findByPk(req.params.id)
    .then((product) => {
      return product;
    })
    .then((product) => {
      product.name = req.body.name;
      product.category = req.body.category;
      product.price = req.body.price;
      return product.save();
    })
    .then((result) => {
      console.log(result);
      res.redirect("/products");
    });
};
