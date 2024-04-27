const catchAsync = require("./../utils/catchAsync");
const Cart = require("./../models/cartModel");

//TODO -> 目前只能加一個品項，修改成同時加很多品項
exports.addNewItem = catchAsync(async (req, res, next) => {
    const userId = req.body.userId;
    const productId = req.body.productId[0];

    const currentCart = await Cart.findOne({ userId: userId });

    const productIds = currentCart.productId.map((item) => String(item._id));

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
    const productNames = cartItems[0].productId.map((item) => item.name);

    res.status(200).json({
        status: "success",
        amount: productNames.length,
        data: cartItems,
    });
});

exports.deleteCartItem = catchAsync(async (req, res) => {
    const productId = req.body.productId;
    const userId = req.params.userId;
    const currentUser = await Cart.find({ userId: userId });
    console.log(currentUser);

    //TODO -> 判斷使用者是否存在，若不存在send error

    // find current prodcuts
    const currentProducts = currentUser[0].productId.map((item) =>
        String(item._id)
    );
    // console.log(currentProducts);

    if (!currentProducts.includes(productId)) {
        return res.status(404).send("Product not found!");
    }

    //TODO -> 目前會從array 中刪除所有等於productId 的元素，把它改成只能刪除一個，但這樣好像需要改變schema，新增一個類似累積購物車重複商品數量到東西？
    // delete
    await Cart.findOneAndUpdate(
        { userId: userId },
        { $pull: { productId: productId } },
        { $new: true }
    );

    // send response
    res.status(200).send("Deleted successfully!");
});

exports.deleteAllCartItems = catchAsync(async (req, res) => {
    const userId = req.params.userId;

    await Cart.findOneAndUpdate(
        { userId: userId },
        { $set: { productId: [] } }
    );

    res.status(200).send("Deleted cart successfully!");
});
