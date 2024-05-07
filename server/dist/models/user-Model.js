"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    role: {
        type: String,
    },
    password: {
        type: String,
    },
    profile: {
        type: String,
    },
}, {
    timestamps: true,
});
const User = (0, mongoose_1.model)('users', userSchema);
exports.default = User;
