import { Router } from "express";
import { authorization } from "../middleware/authorization";
import authCompany from "../middleware/authCompany";
import { validRegister } from "../middleware/validRegister";
import multerMiddleware from "../middleware/multer";
import adminController from "../controllers/adminController";

const adminRoutes = Router();

adminRoutes.use("/", authorization, authCompany);

adminRoutes.post("/", multerMiddleware, validRegister, adminController.createAdmin);
adminRoutes.get("/", adminController.getAdmin);
adminRoutes.put("/:id", adminController.changeAdminPassword);
adminRoutes.delete("/:id", adminController.deleteAdmin);

export default adminRoutes;
