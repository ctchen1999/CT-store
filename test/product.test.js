// require("dotenv").config({ path: "./../config/config.env" });
const { connectTestDB, disconnectTestDB } = require("./../config/db");
const request = require("supertest");
const app = require("../app");
const Product = require("../models/productModel");
const mongoose = require("mongoose");
const productData = require("./../data/productData");
// const importData = require("./../data/importData");

beforeAll(async () => {
    try {
        connectTestDB();
        console.log("TEST DATABASE CONNECT SUCCESSFULLY");
    } catch (error) {
        console.error(error);
        console.log("TEST DATABASE CONNECT FAILED");
    }
});

// delete test product
beforeEach(async () => {
    try {
        await Product.deleteMany({});
        console.log("CLEAN UP TEST DATABASE SUCCESSFULLY");
    } catch (err) {
        console.error(err);
    }
});

describe("API /api/products TEST START...", () => {
    it("GET /api/products | should return none products", async () => {
        const res = await request(app).get("/api/products");
        // console.log(res.body);

        expect(res.body.status).toBe("success");
        expect(res.headers["content-type"]).toMatch(/application\/json/); //)
        expect(res.statusCode).toBe(200);
        expect(res.body.data.products.length).toBe(0);
    });

    it("POST /api/products | should return all write-in products", async () => {
        const res = await request(app).post("/api/products").send(productData);
        // console.log(res.body);

        expect(res.body.status).toBe("success");
        expect(res.statusCode).toBe(201);
        expect(res.body.data.products.length).toBe(productData.length);
    });

    // it("GET /api/products/:id | should return one product with corresponded product ", async () => {
    //     let res = await request(app).post("/api/products").send(productData);
    //     console.log(res.body.data.products);
    //     res = await request(app).get("/api/products");
    //     console.log(res.body.data.products);
    //     const randomNumber = productData.length;
    //     console.log(res.body.data.products[randomNumber]);
    // const id = res.body.data.products[randomNumber]._id;
    // console.log("id", id);

    // res = await request(app).get(`/api/products/${id}`);
    // console.log(res.body);

    // expect(res.body.status).toBe("success");
    // expect(res.statusCode).toBe(200);
    // expect(res.body.data.product._id).toBe(id);
    // });

    it("POST /api/products | should add a new product to database", async () => {
        const newProduct = {
            name: "TEST PRODUCT",
            description: "THIS IS THE ONE AND ONLY TEST PRODUCT",
            price: 100000,
        };
        let res = await request(app).post("/api/products").send(newProduct);
        console.log(res.body.data);
        expect(res.statusCode).toBe(201);
        expect(res.body.data.product.name).toBe("TEST PRODUCT");

        // create same product should return statusCode 409
        res = await request(app).post("/api/products").send(newProduct);
        expect(res.statusCode).toBe(409);
    });

    // it("PATCH /api/products/:id | update a specified product by id", async () => {
    //     // create a new product
    //     const newProduct = {
    //         name: "TEST PRODUCT",
    //         description: "THIS IS THE ONE AND ONLY TEST PRODUCT",
    //         price: 100000,
    //     };
    //     let res = await request(app).post("/api/products").send(newProduct);
    //     expect(res.statusCode).toBe(201);

    //     // find id of new product
    //     const product = await Product.findOne({ name: newProduct.name });
    //     const productId = product._id;

    //     // update product with id we get
    //     const updateContent = { name: "TEST PRODUCT 2" };
    //     res = await request(app)
    //         .patch(`/api/products/${productId}`)
    //         .send(updateContent);

    //     expect(res.statusCode).toBe(201);
    //     expect(res.body.data.product.name).toBe("TEST PRODUCT 2");
    // });

    // it("DELETE /api/products/:id | delete a specified product by id", async () => {
    //     // create a new product
    //     const newProduct = {
    //         name: "TEST PRODUCT",
    //         description: "THIS IS THE ONE AND ONLY TEST PRODUCT",
    //         price: 100000,
    //     };
    //     let res = await request(app).post("/api/products").send(newProduct);
    //     expect(res.statusCode).toBe(201);

    //     // find id of new product
    //     const product = await Product.findOne({ name: newProduct.name });
    //     const productId = product._id;

    //     // delete product with id
    //     res = await request(app).delete(`/api/products/${productId}`);

    //     expect(res.statusCode).toBe(200);
    //     expect(res.text).toBe("DELETE PRODUCT SUCCESSFULLY.");
    // });
});

// Disconnect database after test
afterAll(() => {
    disconnectTestDB();
    console.log("TEST DATABASE DISCONNECT");
});
