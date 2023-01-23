import {Router} from "express";
import { authorization } from "../middleware/authorization";
import multerMiddleware from "../middleware/multer";
import CompanyController from "../controllers/companyController";

const companyRouter = Router();

companyRouter.use("/", authorization);

companyRouter.post("", multerMiddleware, CompanyController.createCompany);
companyRouter.get("", CompanyController.getCompanies);
companyRouter.post("/:id", multerMiddleware, CompanyController.updateCompany);
companyRouter.delete("/image/:id", CompanyController.deleteImageCompany);
companyRouter.get("/:id", CompanyController.getCompany);
companyRouter.delete("/:id", CompanyController.deleteCompany);

export default companyRouter;