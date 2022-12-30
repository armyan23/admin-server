import { Router } from "express";
import authorization from "../middleware/authorization";
import CompanyController from "../controllers/companyController";
import multerMiddleware from "../middleware/multer";

const companyRouter = Router();

companyRouter.post("", authorization, multerMiddleware, CompanyController.createCompany);
companyRouter.get("", authorization, CompanyController.getCompanies);
companyRouter.post("/:id", authorization, multerMiddleware, CompanyController.updateCompany);
companyRouter.delete("/image/:id", authorization, CompanyController.deleteImageCompany);
companyRouter.get("/:id", authorization, CompanyController.getCompany);

export default companyRouter;