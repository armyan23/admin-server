import {Router} from "express";
import { authorization } from "../middleware/authorization";
import multerMiddleware from "../middleware/multer";
import UserController from "../controllers/userController";

const userRoutes = Router();

userRoutes.use("/", authorization);

userRoutes.get("/", UserController.profileData);
userRoutes.put("/user-details", multerMiddleware, UserController.editUserDetails);
userRoutes.delete("/delete-image", UserController.deleteImage);
userRoutes.put("/password", UserController.editUserPassword);
userRoutes.put("/email", UserController.editUserEmail);
userRoutes.delete("/delete", UserController.userDelete);
userRoutes.put("/activate", UserController.userActivate);

export default userRoutes;