import { Router } from "express";
import database, { db } from "../config/db";
import authorization from "../middleware/authorization";

const router = Router();

router.get("/", authorization, async (req: any, res: any)=>{
    try {
        // req.user has the payload

        const user = await db.query(`SELECT * FROM users_test WHERE user_id = $1`, [req.user]);
        res.json(user.rows[0])

    }catch (err){
        console.error(err);
        res.status(500).json("Server Error");
    }
})

export default router;