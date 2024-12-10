const User = require("../models/user.model");
const asyncHandle = require("./async");
const RateLimit = require("express-rate-limit");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");

exports.protected = asyncHandle(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new ErrorResponse("Token not found", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);

        if (!req.user) {
            return next(new ErrorResponse("User not found", 404));
        }
        next();
    } catch (error) {
        return next(new ErrorResponse("Invalid token", 401));
    }
});

exports.adminStatus = asyncHandle(async (req, res, next) => {
    if (req.user.isAdmin) {
        next();
    } else {
        return next(new ErrorResponse("Not authorized to isAdmin", 401));
    }
});

exports.Limit = RateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: {
        status: 429,
        error: "Too many requests from this IP, please try again in 10 minutes",
    },
});