const Product = require("./../models/productModel");
const catchAsync = require("./../utils/catchAsync");

exports.createProduct = catchAsync(async (req, res, next) => {
    const newProduct = req.body;
    await Product.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
            product: newProduct,
        },
    });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
    const products = await Product.find({}).select("-__v");
    res.status(200).json({
        status: "success",
        results: products.length,
        data: {
            products,
        },
    });
});

exports.getOneProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const productItem = await Product.findById(productId).select("-__v");
        res.status(200).json({
            status: "success",
            data: {
                product: productItem,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

exports.updateProduct = async (req, res, next) => {
    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );
    res.status(201).json({
        status: "success",
        data: {
            product: updatedProduct,
        },
    });
};

exports.deleteProduct = async (req, res, next) => {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send("DELETE PRODUCT SUCCESSFULLY.");
};
