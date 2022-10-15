import { Router } from "express";
import authorization from "../middleware/authorization";
import CreateController from "../controllers/createController";

const createRoutes = Router();

createRoutes.post("/company", authorization, CreateController.createCompany);
// router.post("/admin", authorization, CreateController.userInfo);
// router.post("/director", authorization, CreateController.userInfo);
// router.post("/employer", authorization, CreateController.userInfo);
createRoutes.get("/info", authorization, CreateController.userInfo); // Example

export default createRoutes;