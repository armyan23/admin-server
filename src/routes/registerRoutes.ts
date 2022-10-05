import { Router } from "express";

import RegisterController from "../controllers/registerController";
import validRegister from "../middleware/validRegister";

const router = Router();

router.post("/register", validRegister, RegisterController.register)
router.post("/register/verify", RegisterController.verifyUser)
router.get("/get_user", RegisterController.getUser) // Example


export default router;