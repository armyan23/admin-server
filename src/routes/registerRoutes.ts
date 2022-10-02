import { Router } from "express";

import registerController from "../controllers/registerController";
import validRegister from "../middleware/validRegister";

const router = Router();

router.post("/user", validRegister, registerController.createUser)
router.get("/user", registerController.getUser)


export default router;