const express = require("express");
const userController = require("./../Controller/userController");

router = express.Router();

router.route("/").get(userController.getAllUsers);

router.route("/signup").post(userController.signUp);
router.route("/login").post(userController.login);

module.exports = router;
