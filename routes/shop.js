const express = require("express");

const productController = require("../controllers/products");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/cart", shopController.getCart);
router.post("/cart", shopController.postCart);
router.post("/cart-item-delete", shopController.postCartItemDelete);
router.get("/checkout", shopController.getCheckout);
router.get("/orders", shopController.getOrders);

router.get("/products", productController.getProducts);
router.get("/product/:productId", productController.getProductDetails);
router.post("/post-order-add", shopController.postOrderAdd);

module.exports = router;