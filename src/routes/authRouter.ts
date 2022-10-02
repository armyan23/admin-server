import { Router } from "express";
import authController from "../controllers/authController";
import validInfo from "../middleware/validInfo";

const router = Router();

router.post("/register", validInfo, authController.registration)
router.post("/login", validInfo, authController.login)

export default router;