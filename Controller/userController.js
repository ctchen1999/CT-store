const User = require('./../models/userModel');
const Cart = require('./../models/cartModel');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');

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

    res.cookie('jwt', token, cookieOptions);
    // Remove password from output
    // user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        },
    });
};

exports.signUp = catchAsync(async (req, res, next) => {
    const { name, email, password, passwordConfirm } = req.body;

    // find user already exists, send message
    const user = await User.find({ email });
    if (user) res.send('User already exist!');

    const newUser = await User.create(req.body);
    await Cart.create({ userId: newUser._id }); // create cart when create user

    sendToken(newUser, 200, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.send('Please provide email and password!');
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.correctPassword(password))) {
        return res.status(401).json({
            status: 'fail',
            message: 'Invalid password',
        });
    }
    sendToken(user, 200, res);
    // res.status(200).send("Logged in successfully!");
});

exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000), // 設置cookie過期時間為10秒後
        httpOnly: true, // httpOnly屬性可以防止客戶端腳本訪問cookie，從而提高安全性，避免XSS攻擊
    });
    res.status(200).send('Logout successfully!');
};

exports.getAllUsers = catchAsync(async (req, res) => {
    const users = await User.find({});

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users,
        },
    });
});

exports.updateUser = catchAsync(async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
    });
    console.log(req.body);

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser,
        },
    });
});

exports.deleteUser = catchAsync(async (req, res) => {
    await User.updateOne({ _id: req.user._id }, { active: false });

    res.status(200).send(`User ${req.user.name} delete successfully.`);
});

//TODO -> resetpassword
