import { Router } from "express";
import authRoutes from "./authRoutes";
import employeeRouter from "./employeeRoutes";
import companyRouter from "./companyRouter";
import userRoutes from "./userRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/employee", employeeRouter);
router.use("/company", companyRouter);
router.use("/edit", userRoutes);

export default router;