const catchAsync = require("./../utils/catchAsync");
const Cart = require("./../models/cartModel");

exports.addNewItem = catchAsync(async (req, res) => {
    const userId = req.body.userId;
    const productId = req.body.productId;
    console.log(userId, productId);

    const cart = await Cart.findOneAndUpdate(
        { userId: userId },
        {
            $push: { productId: productId },
        },
        { new: true }
    );

    res.status(200).json({
        status: "success",
        data: cart,
    });
});
exports.getCartItems = catchAsync(async (req, res) => {
    const userId = req.params.userId;
    const cartItems = await Cart.find({ userId: userId })
        .populate({ path: "userId", select: "name email role" })
        .select("-__v");

    res.status(200).json({
        status: "success",
        data: cartItems,
    });
});
