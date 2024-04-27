const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const User = require("./../models/userModel");

//TODO sendemail to signUp
exports.restricTo = (...roles) => {
    return (req, res, next) => {
        // Login or not (check by oritect)
        if (!req.user) {
            return res.status(401).send("Please login first!");
        }

        // 2. 檢查用戶是否具有足夠的權限
        if (!roles.includes(req.user.role)) {
            return res
                .status(403)
                .send("Yor do not have permission to perform this action!");
        }

        // 3. 如果用戶已登入且具有足夠的權限，則繼續處理請求
        next();
    };
};

exports.protect = catchAsync(async (req, res, next) => {
    let token;

    // check exits token or not in cookie
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    // Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Check exist user or not
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        res.status(401).send(
            "The user belonging to this token does no longer exist"
        );
    }

    // Grant access to protected route
    req.user = currentUser;

    next();
});
