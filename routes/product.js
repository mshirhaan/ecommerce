const productController = require("../controllers/product");

const router = require("express").Router();

const isAuth = require("../middleware/is-auth");

router.get("/products", productController.getProducts);

router.get("/product/:id", productController.getProduct);

router.get("/add-product", isAuth, productController.getAddProduct);

router.post("/add-product", isAuth, productController.postAddProduct);

router.get("/edit-product/:id", isAuth, productController.getEditProduct);

router.post("/edit-product/:id", productController.postEditProduct);

module.exports = router;
