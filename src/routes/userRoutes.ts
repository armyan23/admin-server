import { Router } from "express";
import authorization from "../middleware/authorization";
import UserController from "../controllers/userController";

const userRoutes = Router();

userRoutes.put("/details", authorization, UserController.editUserDetails);
userRoutes.put("/password", authorization, UserController.editUserPassword);
userRoutes.put("/email", authorization, UserController.editUserEmail);
userRoutes.delete("/delete", authorization, UserController.userDelete);
userRoutes.put("/activate", authorization, UserController.userActivate);

export default userRoutes;