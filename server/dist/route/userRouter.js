"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = __importDefault(require("../controller/AuthController"));
const router = (0, express_1.Router)();
// signup user------------------------------------
router.route('/signup').post(AuthController_1.default.signup);
// login user-------------------------------------
router.route('/login').post(AuthController_1.default.Login);
exports.default = router;
