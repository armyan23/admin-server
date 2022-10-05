import { Router } from "express";
import registerRoutes from "./registerRoutes";

const router = Router();

router.use("/auth", registerRoutes);

export default router;