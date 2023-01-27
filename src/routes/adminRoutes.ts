import { Router } from "express";
import { authorization } from "../middleware/authorization";
import authCompany from "../middleware/authCompany";
import { validRegister } from "../middleware/validRegister";
import multerMiddleware from "../middleware/multer";
import adminController from "../controllers/adminController";

const adminRoutes = Router();

adminRoutes.use("/", authorization, authCompany);

adminRoutes.post("/create", multerMiddleware, validRegister, adminController.createAdmin);
adminRoutes.get("/all", adminController.getAdmin);
adminRoutes.delete("/:id", adminController.deleteAdmin);

export default adminRoutes;
