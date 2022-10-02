import { Router } from "express";
import UserController from "../controllers/testUserController";

const router = Router();

router.post("/user", UserController.createUser)
router.get("/user", UserController.getUsers)
router.get("/user/:id", UserController.getOneUser)
router.put("/user", UserController.updateUser)
router.delete("/user/:id", UserController.deleteUser)

export default router;