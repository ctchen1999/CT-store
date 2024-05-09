const express = require("express");
const reviewController = require("./../Controller/reviewController");
router = express.Router();

router.route("/").post(reviewController.createReview);

router
    .route("/:id")
    .delete(reviewController.deleteReview)
    .patch(reviewController.updateReview);

module.exports = router;
