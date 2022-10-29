import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function authorization(req:any, res:any, next:any){
    try{
        const jwtToken = req.header("token");
        if (!jwtToken){
            return res.status(403).send("Not Authorization!");
        }

        const payload: any = jwt.verify(jwtToken, `${process.env.JWT_SECRET}`);

        req.userId = payload.id;

        next()
    }catch (err){
        console.error(err, 'Err');
        return res.status(500).send({
            status: 500,
            message: "Server error!"
        });
    }
}

export default authorization;