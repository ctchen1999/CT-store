const slugify = require("slugify");

const text = "Some Text";
console.log(slugify(text, { lower: true }));

// const bcrypt = require("bcrypt");
// const password = "123 456";
// console.log(password.trim());

const crypto = require("crypto");

const password = "password123";

// 使用SHA-256算法對密碼進行雜湊
const hash = crypto.createHash("sha256").update(password).digest("hex");

console.log("Hashed password:", hash);

// JWT
const jwt = require("jsonwebtoken");

const secret = "CTCHEN";
console.log(
    jwt.sign({ id: "CTCHEN" }, "CTCHEN", {
        expiresIn: "10m",
    })
);
