import { Router } from "express";
import authRoutes from "./authRoutes";
import createRoutes from "./createRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/create", createRoutes);

export default router;