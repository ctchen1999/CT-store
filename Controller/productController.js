const mongoose = require("mongoose");
const redis = require("./../config/cache");
const Product = require("./../models/productModel");
const catchAsync = require("./../utils/catchAsync");

exports.createProduct = catchAsync(async (req, res, next) => {
    const curProductName = req.body.name;
    const allProducts = await Product.find({});
    const allProductsName = allProducts.map((product) => product.name);

    // If already exists product with the same name
    if (allProductsName.includes(curProductName)) {
        return res.status(409).json({
            status: "fail",
            message: "Product name already exists.",
        });
    }

    const newProduct = req.body;
    await Product.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
            product: newProduct,
        },
    });
});

exports.getAllProducts = catchAsync(async (req, res) => {
    // check
    const cachedProducts = await redis.get("allProducts");
    if (cachedProducts) {
        return res.status(200).json({
            status: "success",
            results: JSON.parse(cachedProducts).length,
            data: {
                products: JSON.parse(cachedProducts),
            },
        });
    }

    const products = await Product.find({}).select("-__v");
    // console.log(products);
    // redis.set("allProducts", JSON.stringify(products));
    redis.setex("allProducts", 3600, JSON.stringify(products));

    res.status(200).json({
        status: "success",
        results: products.length,
        data: {
            products,
        },
    });
});

exports.getOneProduct = async (req, res) => {
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

exports.updateProduct = catchAsync(async (req, res, next) => {
    let productId = req.params.id;

    // Whether productId is a 24 character hex string
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
            status: "fail",
            message: "Invalid product id. Should only contains 0-9 and a-f.",
        });
    }
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({
            status: "fail",
            message: `Product with given id ${productId} not found.`,
        });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );
    updatedProduct.save(); // trigger model's save to update slug
    res.status(201).json({
        status: "success",
        data: {
            product: updatedProduct,
        },
    });
});

exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send("DELETE PRODUCT SUCCESSFULLY.");
};
