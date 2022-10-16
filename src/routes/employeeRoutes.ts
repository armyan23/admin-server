import { Router } from "express";
import authorization from "../middleware/authorization";
import EmployeeController from "../controllers/employeeController";
import authCompany from "../middleware/authCompany";

const employeeRouter = Router();

employeeRouter.post("/employee", authorization, authCompany, EmployeeController.createEmployee);
// employeeRoutes.post("/admin", authorization, EmployeeController.userInfo);
// employeeRoutes.post("/director", authorization, EmployeeController.userInfo);

export default employeeRouter;