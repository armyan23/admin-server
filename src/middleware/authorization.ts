import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../../models";

const { User } = db

dotenv.config();

export async function authorization(req: any, res: any, next: any) {
    try {
        const jwtToken = req.header("token");
        if (!jwtToken) {
            return res.status(403).send({
                status: 403,
                message: "Not Authorization!"
            });
        }

        const payload: any = jwt.verify(jwtToken, `${process.env.JWT_SECRET}`);
        const user = await User.findByPk(payload.id,{
            attributes: ['id', 'role'],
        });

        req.userId = payload.id;
        req.user = user;

        next()
    } catch (err) {
        return res.status(403).send({
            status: 403,
            message: "Invalid token."
        });
    }
}