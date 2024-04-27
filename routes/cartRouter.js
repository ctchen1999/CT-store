const express = require("express");
const cartController = require("./../Controller/cartController");

router = express.Router();

router
    .route("/:userId")
    .get(cartController.getCartItems)
    .delete(cartController.deleteCartItem);

router.route("/deleteAll/:userId").delete(cartController.deleteAllCartItems);

router.route("/").post(cartController.addNewItem);

module.exports = router;
