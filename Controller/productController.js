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
    // check if data stored in cache
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
    console.log(products);

    // Lazy-loading
    redis.setex("allProducts", 3600, JSON.stringify(products));

    res.status(200).json({
        status: "success",
        results: products.length,
        data: {
            products,
        },
    });
});

// TODO -> 目前是只能top5 price, 讓使用者輸入他想query 的屬性（例如評分前五）
exports.getTopFiveProducts = catchAsync(async (req, res) => {
    const products = await Product.find({})
        .sort({ price: -1 })
        .select("-__v")
        .limit(5);

    res.status(200).json({
        status: "success",
        results: products.length,
        data: {
            products,
        },
    });
});

exports.getOneProduct = catchAsync(async (req, res) => {
    const productId = req.params.id;
    const productQuery = productId.slice(-5);

    // Cache 部分，如果我新增review on product 就會出事
    // check if data in cache
    // const cacheProduct = await redis.get(`product:${productQuery}`);
    // // console.log(cacheProduct);
    // if (cacheProduct) {
    //     // console.log(JSON.parse(cacheProduct));
    //     return res.status(200).json({
    //         status: "success",
    //         data: {
    //             product: JSON.parse(cacheProduct),
    //         },
    //     });
    // }

    const productItem = await Product.findById(productId)
        .select("-__v")
        .populate("reviews");

    // whether item exists
    if (!productItem) {
        return res.send(`ID: ${productId} not in products`);
    }

    // Lazy-loading
    redis.setex(`product:${productQuery}`, 3600, JSON.stringify(productItem));

    res.status(200).json({
        status: "success",
        data: {
            product: productItem,
        },
    });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
    let productId = req.params.id;
    const productQuery = productId.slice(-5);

    // Whether productId is a 24 character hex string
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
            status: "fail",
            message: "Invalid product id. Should only contains 0-9 and a-f.",
        });
    }

    // check if this productId in the products
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
    redis.setex(
        `product:${productQuery}`,
        3600,
        JSON.stringify(updatedProduct)
    ); // also save to cache

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
