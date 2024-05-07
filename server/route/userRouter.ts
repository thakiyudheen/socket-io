import { Router } from "express";
import AuthController from "../controller/AuthController";
const router =Router()

// signup user------------------------------------
router.route('/signup').post(AuthController.signup)
// login user-------------------------------------
router.route('/login').post(AuthController.Login)



export default router;