const { connectDB } = require("./../config/db");
const productData = require("./productData");
const Product = require("./../models/productModel");

connectDB();
(async () => {
    try {
        await Product.deleteMany({});
        await Product.create(productData);
        console.log("DATA IMPORTED SUCCESSFULLY!");
        process.exit(1);
    } catch (err) {
        console.log("ERROR OCCURS DURING IMPORT DATA!");
        process.exit(1);
    }
})();
