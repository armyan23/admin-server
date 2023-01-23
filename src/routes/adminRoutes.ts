import { Router } from "express";
import { authorization } from "../middleware/authorization";
import authCompany from "../middleware/authCompany";
import { validRegister } from "../middleware/validRegister";
import adminController from "../controllers/adminController";

const adminRoutes = Router();

adminRoutes.use("/", authorization);

adminRoutes.post("/create", authCompany, validRegister, adminController.createAdmin);
adminRoutes.get("/get", authCompany, adminController.getAdmin);

export default adminRoutes;
