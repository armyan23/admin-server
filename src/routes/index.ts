import { Router } from "express";
import authRoutes from "./authRoutes";
import employeeRouter from "./employeeRoutes";
import companyRouter from "./companyRouter";

const router = Router();

router.use("/auth", authRoutes);
router.use("/create", employeeRouter);
router.use("/company", companyRouter);

export default router;