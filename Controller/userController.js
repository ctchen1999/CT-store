const User = require("./../models/userModel");
const Cart = require("./../models/cartModel");
const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const sendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expiresIn: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.cookie("jwt", token, cookieOptions);

    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user,
        },
    });
};

exports.signUp = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);
    const cart = await Cart.create({ userId: newUser._id });

    sendToken(newUser, 200, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.send("Please provide email and password!");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password))) {
        res.status(401).json({
            status: "fail",
            message: "Invalid password",
        });
    }

    res.status(200).send("Logged in successfully!");
});

exports.getAllUsers = catchAsync(async (req, res) => {
    const users = await User.find({});

    res.status(200).json({
        status: "success",
        results: users.length,
        data: {
            users,
        },
    });
});
