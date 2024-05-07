"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_Model_1 = __importDefault(require("../models/user-Model"));
const bcrypt_1 = require("../util/bcrypt/bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_2 = __importDefault(require("bcrypt"));
const AuthController = {
    signup: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { password, email, username } = req.body;
            let existingUser = yield user_Model_1.default.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ status: false, error: "User already exists" });
            }
            else {
                const hashed = yield (0, bcrypt_1.hash)(password);
                console.log('this is hashed', hashed);
                let newUser = yield user_Model_1.default.create({ email, username, password: hashed });
                let jwtSecret = process.env.JWT_SCT;
                if (!jwtSecret) {
                    console.error('JWT secret not found in environment variables');
                }
                else {
                    let token = jsonwebtoken_1.default.sign({ data: newUser._id }, jwtSecret);
                    console.log('Generated token:', token);
                    res.cookie('token', token, {
                        httpOnly: true,
                        maxAge: 1000 * 60 * 60 * 24,
                    });
                }
                return res.status(200).json({ status: true, data: newUser, message: "User created successfully" });
            }
        }
        catch (err) {
            console.log('Internal server Error:-', err);
        }
    }),
    Login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { password, email } = req.body;
            const user = yield user_Model_1.default.findOne({ email });
            if (!user) {
                return res.status(400).json({ status: false, error: "User not found" });
            }
            const passwordMatch = yield bcrypt_2.default.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(400).json({ status: false, error: "Incorrect password" });
            }
            return res.status(200).json({ status: true, data: user, message: "User logged in" });
        }
        catch (err) {
            console.error('Internal server error:', err);
            return res.status(500).json({ status: false, err: "Internal server error" });
        }
    })
};
exports.default = AuthController;
