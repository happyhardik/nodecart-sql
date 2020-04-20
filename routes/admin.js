const express = require("express");

const productController = require("../controllers/products");

const router = express.Router();

router.get("/product-add", productController.getProductAdd);
router.post("/product-add", productController.postProductAdd);
router.get("/product-edit/:productId", productController.getProductUpdate);
router.post("/product-edit", productController.postProductUpdate);
router.post("/product-delete", productController.postProductDelete);
router.get("/products", productController.getAdminProducts);

module.exports = router;
