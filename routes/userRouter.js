const express = require('express');
const userController = require('./../Controller/userController');
const authController = require('./../Controller/authController');

router = express.Router();

router.route('/signup').post(userController.signUp);
router.route('/login').post(userController.login);
router.route('/logout').get(userController.logout);

router.use(authController.protect);

router
    .route('/restrictTo')
    .get(authController.protect, authController.restricTo('admin', 'store'));
router
    .route('/')
    .get(authController.restricTo('admin'), userController.getAllUsers)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;
