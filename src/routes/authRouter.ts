import { Router } from "express";
import authController from "../controllers/authController";
import validInfo from "../middleware/validInfo";
import authorization from "../middleware/authorization";

const router = Router();

router.post("/register", validInfo, authController.registration);
router.post("/confirm-email", authController.confirmEmail);
router.post("/login", validInfo, authController.login);
router.get("/is-verify", authorization, authController.isVerify);

export default router;