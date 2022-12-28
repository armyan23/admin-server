import { Router } from "express";
import authorization from "../middleware/authorization";
import EmployeeController from "../controllers/employeeController";
import authCompany from "../middleware/authCompany";
import multerMiddleware from "../middleware/multer";

const employeeRouter = Router();

employeeRouter.post("/create", authorization, authCompany, multerMiddleware, EmployeeController.createEmployee);
employeeRouter.get("/all", authorization, authCompany, EmployeeController.getEmployeesAll);
employeeRouter.get("/:id", authorization, authCompany, EmployeeController.getEmployeeId);
employeeRouter.put("/edit/:id", authorization, authCompany, multerMiddleware, EmployeeController.updateEmployee);
employeeRouter.delete("/delete-image/:id", authorization, authCompany, multerMiddleware, EmployeeController.deleteImage);
employeeRouter.delete("/delete/:id", authorization, authCompany, EmployeeController.deleteEmployee);
employeeRouter.post("/restore/:id", authorization, authCompany, EmployeeController.restoreEmployee);
// employeeRoutes.post("/admin", authorization, EmployeeController.userInfo);
// employeeRoutes.post("/director", authorization, EmployeeController.userInfo);

export default employeeRouter;