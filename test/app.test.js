const request = require("supertest");
const app = require("../app"); // 確保你已經引入你的 app
const mongoose = require("mongoose");
require("dotenv").config();
// const db = require("../models");

// Connect to database before test
beforeEach(async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://abfa762466:abfa76247284@cluster0.di1bznu.mongodb.net/"
        );
        // console.log("TEST DATABASE CONNECT SUCCESSFULLY");
    } catch (err) {
        console.error(err);
        console.log("TEST DATABASE CONNECT FAILED");
    }
});

describe("GET /api/products", () => {
    it("should return all products", async () => {
        const res = await request(app).get("/api/products");
        // console.log(res.body.data.products);
        // expect(res.body.data.products.length).toBe(6);
        expect(res.body.status).toBe("success");
        expect(res.statusCode).toBe(200);
        expect(res.body.data.products.length).toBeGreaterThan(0);
    });
});

// Disconnect database after test
afterEach(async () => {
    await mongoose.connection.close();
    // console.log("TEST DATABASE CONNECT CLOSED");
});
