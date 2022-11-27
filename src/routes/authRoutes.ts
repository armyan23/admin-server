import { Router } from "express";
import { validLogin, validRegister, validVerify } from "../middleware/validRegister";
import AuthController from "../controllers/authController";
import authorization from "../middleware/authorization";

const authRoutes = Router();

authRoutes.post("/register", validRegister, AuthController.register);
authRoutes.post("/register/verify", validVerify, AuthController.verifyUser);
authRoutes.post("/sign-in", validLogin, AuthController.signIn);
authRoutes.post("/is-login", authorization, AuthController.isLogin);

export default authRoutes;