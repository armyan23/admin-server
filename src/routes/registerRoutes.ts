import { Router } from "express";

import RegisterController from "../controllers/registerController";
import validRegister from "../middleware/validRegister";

const router = Router();

router.post("/register", validRegister, RegisterController.register)
router.post("/verify", RegisterController.verifyUser)


export default router;