import { Router } from "express";
import authorization from "../middleware/authorization";
import multerMiddleware from "../middleware/multer";
import UserController from "../controllers/userController";

const userRoutes = Router();

userRoutes.get("/", authorization, UserController.profileData);
userRoutes.put("/user-details", authorization, multerMiddleware, UserController.editUserDetails);
userRoutes.delete("/delete-image", authorization, multerMiddleware, UserController.deleteImage);
userRoutes.put("/password", authorization, UserController.editUserPassword);
userRoutes.put("/email", authorization, UserController.editUserEmail);
userRoutes.delete("/delete", authorization, UserController.userDelete);
userRoutes.put("/activate", authorization, UserController.userActivate);

export default userRoutes;