"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
// Example usage
const saltRounds = 10;
const hash = (password) => {
    try {
        const hashedPassword = bcrypt_1.default.hashSync(password, saltRounds);
        console.log('Hashed password:', hashedPassword);
        return hashedPassword;
    }
    catch (error) {
        console.error('Error hashing password:', error);
        return null;
    }
};
exports.hash = hash;
