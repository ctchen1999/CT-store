const Review = require("../models/reviewModel");
const catchAsync = require("../utils/catchAsync");

exports.createReview = catchAsync(async (req, res) => {
    // console.log(postedBy, postedOn);

    const review = await Review.create(req.body);

    res.status(200).json({
        status: "success",
        review,
    });
});

exports.deleteReview = catchAsync(async (req, res) => {
    const reviewId = req.params.id;
    console.log("reviewId", reviewId);

    await Review.findByIdAndDelete(reviewId);

    res.send("Review deleted successfully");
});
