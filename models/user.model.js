const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email"],
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    apiKey: {
        type: String,
        required: true,
        unique: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
},{
    timestamps:true,
});

// Hash password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// JWT Token
userSchema.methods.getJWT = function() {
    return jwt.sign({ id: this._id, email: this.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '1h',
    });
};

// Compare Password
userSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);