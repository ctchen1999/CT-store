const express = require("express");
const productController = require("../Controller/productController");

router = express.Router();

router
    .route("/")
    .get(productController.getAllProducts)
    .post(productController.createProduct);
router
    .route("/:id")
    .get(productController.getOneProduct)
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct);

module.exports = router;
