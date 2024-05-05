const mongoose = require("mongoose");
const axios = require("axios");

const reviewSchema = new mongoose.Schema(
    {
        review: {
            type: String,
            required: [true, "A review must have content."],
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            default: 5,
            required: [true, "A review must have a rating."],
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "A review must have a user."],
        },
        postedOn: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "A review must have a product."],
        },
    },
    { timestamps: true },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
