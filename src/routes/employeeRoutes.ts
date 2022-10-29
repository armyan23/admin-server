import { Router } from "express";
import authorization from "../middleware/authorization";
import EmployeeController from "../controllers/employeeController";
import authCompany from "../middleware/authCompany";

const employeeRouter = Router();

employeeRouter.post("/create", authorization, authCompany, EmployeeController.createEmployee);
employeeRouter.get("/id", authorization, authCompany, EmployeeController.getEmployeeId);
employeeRouter.get("/all", authorization, authCompany, EmployeeController.getEmployeesAll);
// employeeRoutes.post("/admin", authorization, EmployeeController.userInfo);
// employeeRoutes.post("/director", authorization, EmployeeController.userInfo);

export default employeeRouter;