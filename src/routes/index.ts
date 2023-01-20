import { Router } from "express";
import authRoutes from "./authRoutes";
import employeeRouter from "./employeeRoutes";
import companyRouter from "./companyRouter";
import adminRoutes from "./adminRoutes";
import userRoutes from "./userRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/employee", employeeRouter);
router.use("/company", companyRouter);
router.use("/profile", userRoutes);
router.use("/admin", adminRoutes);

export default router;