import jwt from "jsonwebtoken";
import dotenv from "dotenv";

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

        req.userId = payload.id;

        next()
    } catch (err) {
        return res.status(403).send({
            status: 403,
            message: "Invalid token."
        });
    }
}

export default authorization;