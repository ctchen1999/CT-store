const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            minLength: [3, "A product name must be at least 3 characters long"],
            maxLength: [
                100,
                "A product name cannot be longer than 100 characters",
            ],
            required: [true, "A product must have a name"],
        },
        description: {
            type: String,
            required: [true, "A product must have a description"],
        },
        price: {
            type: Number,
            required: [true, "A product must have a price"],
        },
        imageUrl: {
            type: String,
            default: "https://via.placeholder.com/150",
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            default: 4.5,
        },
        slug: String,
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual Populate on reviews
productSchema.virtual("reviews", {
    ref: "Review",
    foreignField: "postedOn",
    localField: "_id",
});

productSchema.pre("save", function (next) {
    // console.log(this.name);
    this.slug = slugify(this.name, {
        replacement: "-",
        remove: undefined,
        lower: true,
    });

    this.rating = this.rating.toFixed(2);

    next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
