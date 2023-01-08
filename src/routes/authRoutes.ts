import { Router } from "express";
import { validLogin, validRegister, validVerify } from "../middleware/validRegister";
import authorization from "../middleware/authorization";
import AuthController from "../controllers/authController";

const authRoutes = Router();

authRoutes.post("/register", validRegister, AuthController.register);
authRoutes.post("/register/verify", validVerify, AuthController.verifyUser);
authRoutes.post("/sign-in", validLogin, AuthController.signIn);
authRoutes.post("/is-login", authorization, AuthController.isLogin);

export default authRoutes;