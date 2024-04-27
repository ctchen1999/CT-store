const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "A Cart must have a user"],
    },
    productId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
    quantity: Number,
    count: Number,
});

cartSchema.pre(/^find/, function (next) {
    this.populate({
        path: "productId",
        select: "-__v -description",
    });

    next();

    // console.log(this.productId);
    // this.quantity = this.productId.length;
    // this.count = this.product.reduce(
    //     (count, product) => total + product.quantity
    // );
    // console.log(this.quantity, count);
    // next();
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
