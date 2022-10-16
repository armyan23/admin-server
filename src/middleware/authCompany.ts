import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function authorization(req:any, res:any, next:any){
    try{
        const companyToken = req.header("companyToken");

        if (!companyToken){
            return res.status(403).send({
                message: "Not Authorization!"
            });
        }

        const payload: any = jwt.verify(companyToken, `${process.env.JWT_SECRET}`);
        req.id = payload.id;

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