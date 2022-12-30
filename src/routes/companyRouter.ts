import { Router } from "express";
import authorization from "../middleware/authorization";
import CompanyController from "../controllers/companyController";

const companyRouter = Router();

companyRouter.post("", authorization, CompanyController.createCompany);
companyRouter.post("/edit/:id", authorization, CompanyController.updateCompany);
companyRouter.get("", authorization, CompanyController.getCompanies);
companyRouter.get("/:id", authorization, CompanyController.getCompany);

export default companyRouter;