import { Router } from "express";

import AuthController from "../controllers/authController";
import {validLogin, validRegister, validVerify} from "../middleware/validRegister";

const authRoutes = Router();

authRoutes.post("/register", validRegister, AuthController.register)
authRoutes.post("/register/verify", validVerify, AuthController.verifyUser)
authRoutes.get("/sign-in", validLogin, AuthController.signIn)
authRoutes.get("/get_user", AuthController.getUser) // Example


export default authRoutes;