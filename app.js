const express = require("express");
const cors = require("cors");

const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const cartRouter = require("./routes/cartRouter");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/carts", cartRouter);

app.get("/test", (req, res) => {
    res.send("Hello!");
});

module.exports = app;
