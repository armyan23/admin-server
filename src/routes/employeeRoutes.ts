import {Router} from "express";
import { authorization } from "../middleware/authorization";
import authCompany from "../middleware/authCompany";
import multerMiddleware from "../middleware/multer";
import EmployeeController from "../controllers/employeeController";
import { validRegisterAdmin } from "../middleware/validRegister";

const employeeRouter = Router();

employeeRouter.use("/", authorization, authCompany);

employeeRouter.post("/create", multerMiddleware, validRegisterAdmin, EmployeeController.createEmployee);
employeeRouter.get("/all", EmployeeController.getEmployeesAll);
employeeRouter.get("/:id", EmployeeController.getEmployeeId);
employeeRouter.put("/edit/:id", multerMiddleware, validRegisterAdmin, EmployeeController.updateEmployee);
employeeRouter.delete("/delete-image/:id", multerMiddleware, EmployeeController.deleteImage);
employeeRouter.delete("/delete/:id", EmployeeController.deleteEmployee);
employeeRouter.post("/restore/:id", EmployeeController.restoreEmployee);
// employeeRoutes.post("/admin", EmployeeController.userInfo);
// employeeRoutes.post("/director", EmployeeController.userInfo);

export default employeeRouter;