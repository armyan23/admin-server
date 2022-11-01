import { Router } from "express";
import authorization from "../middleware/authorization";
import adminController from "../controllers/adminController";
import authCompany from "../middleware/authCompany";
import { validRegister } from "../middleware/validRegister";

const adminRoutes = Router();

adminRoutes.post("/create", authorization, authCompany, validRegister, adminController.createAdmin);
adminRoutes.get("/get", authorization, authCompany, adminController.getAdmin);

export default adminRoutes;
