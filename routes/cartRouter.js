const express = require("express");
const cartController = require("./../Controller/cartController");

router = express.Router();

router.route("/:userId").get(cartController.getCartItems);

router.route("/").post(cartController.addNewItem);

module.exports = router;
