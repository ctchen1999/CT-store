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

exports.updateReview = catchAsync(async (req, res) => {
    const reviewId = req.params.id;
    const updateKeys = Object.keys(req.body);
    const containUnchangeableKeysOrNot = updateKeys
        .map((key) => {
            return Number(["postedBy", "postedOn"].includes(key));
        })
        .reduce((acc, cur) => acc + cur, 0);

    if (containUnchangeableKeysOrNot) {
        return res.status(400).json({
            status: "fail",
            message: "Cannot update postedBy or postedOn",
        });
    }

    const review = await Review.findByIdAndUpdate(reviewId, req.body, {
        new: true,
        runValidators: true,
    });

    // if review not found
    if (!review) {
        return res.status(404).json({
            status: "fail",
            message: "Review not found",
        });
    }

    res.status(200).json({
        status: "success",
        review,
    });
});
