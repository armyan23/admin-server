import {Router} from "express";
import authorization from "../middleware/authorization";
import authCompany from "../middleware/authCompany";
import multerMiddleware from "../middleware/multer";
import EmployeeController from "../controllers/employeeController";

const employeeRouter = Router();

employeeRouter.use("/", authorization);

employeeRouter.post("/create", authCompany, multerMiddleware, EmployeeController.createEmployee);
employeeRouter.get("/all", authCompany, EmployeeController.getEmployeesAll);
employeeRouter.get("/:id", authCompany, EmployeeController.getEmployeeId);
employeeRouter.put("/edit/:id", authCompany, multerMiddleware, EmployeeController.updateEmployee);
employeeRouter.delete("/delete-image/:id", authCompany, multerMiddleware, EmployeeController.deleteImage);
employeeRouter.delete("/delete/:id", authCompany, EmployeeController.deleteEmployee);
employeeRouter.post("/restore/:id", authCompany, EmployeeController.restoreEmployee);
// employeeRoutes.post("/admin", EmployeeController.userInfo);
// employeeRoutes.post("/director", EmployeeController.userInfo);

export default employeeRouter;