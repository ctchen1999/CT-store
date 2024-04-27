const request = require("supertest");
const app = require("../app");
const Product = require("../models/productModel");
// const importData = require("./../data/importData");
const mongoose = require("mongoose");
require("dotenv").config();
// const db = require("../models");

// Connect to database before test
beforeAll(async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://abfa762466:abfa76247284@cluster0.di1bznu.mongodb.net/"
        );
        console.log("TEST DATABASE CONNECT SUCCESSFULLY");
    } catch (err) {
        console.error(err);
        console.log("TEST DATABASE CONNECT FAILED");
    }
});

// delete test product
beforeEach(async () => {
    try {
        await Product.deleteMany({ name: { $regex: /^TEST PRODUCT/ } });
    } catch (err) {}
});

describe("API /api/products TEST START...", () => {
    it("GET /api/products | should return all products", async () => {
        const res = await request(app).get("/api/products");

        expect(res.body.status).toBe("success");
        expect(res.statusCode).toBe(200);
        expect(res.body.data.products.length).toBeGreaterThan(0);
    });

    it("GET /api/products/:id | should return one product with corresponded product ", async () => {
        const id = "662cca1a17b33cba9a41ab72";
        const res = await request(app).get(`/api/products/${id}`);

        expect(res.body.status).toBe("success");
        expect(res.statusCode).toBe(200);
        expect(res.body.data.product._id).toBe(id);
    });

    it("POST /api/products | should add a new product to database", async () => {
        const newProduct = {
            name: "TEST PRODUCT",
            description: "THIS IS THE ONE AND ONLY TEST PRODUCT",
            price: 100000,
        };
        let res = await request(app).post("/api/products").send(newProduct);
        expect(res.statusCode).toBe(201);
        expect(res.body.data.product.name).toBe("TEST PRODUCT");

        // create same product should return statusCode 409
        res = await request(app).post("/api/products").send(newProduct);
        expect(res.statusCode).toBe(409);
    });

    it("PATCH /api/products/:id | update a specified product by id", async () => {
        // create a new product
        const newProduct = {
            name: "TEST PRODUCT",
            description: "THIS IS THE ONE AND ONLY TEST PRODUCT",
            price: 100000,
        };
        let res = await request(app).post("/api/products").send(newProduct);
        expect(res.statusCode).toBe(201);

        // find id of new product
        const product = await Product.findOne({ name: newProduct.name });
        const productId = product._id;

        // update product with id we get
        const updateContent = { name: "TEST PRODUCT 2" };
        res = await request(app)
            .patch(`/api/products/${productId}`)
            .send(updateContent);

        expect(res.statusCode).toBe(201);
        expect(res.body.data.product.name).toBe("TEST PRODUCT 2");
    });

    it("DELETE /api/products/:id | delete a specified product by id", async () => {
        // create a new product
        const newProduct = {
            name: "TEST PRODUCT",
            description: "THIS IS THE ONE AND ONLY TEST PRODUCT",
            price: 100000,
        };
        let res = await request(app).post("/api/products").send(newProduct);
        expect(res.statusCode).toBe(201);

        // find id of new product
        const product = await Product.findOne({ name: newProduct.name });
        const productId = product._id;

        // delete product with id
        res = await request(app).delete(`/api/products/${productId}`);

        expect(res.statusCode).toBe(200);
        expect(res.text).toBe("DELETE PRODUCT SUCCESSFULLY.");
    });
});

// Disconnect database after test
afterAll(async () => {
    await mongoose.connection.close();
    // console.log("TEST DATABASE CONNECT CLOSED");
});
