import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../../models";

dotenv.config();

async function authCompany(req:any, res:any, next:any){
    try{
        req.header("company")

        const companies = await db.Company.findAll({where: {user_id: req.userId}});
        const company = req.header("company");
        // ToDo: Change middleware
        // if (!company){
        //     return res.status(403).send({
        //         status: 403,
        //         message:"Not Authorization!"
        //     });
        // }

        req.companyId = company;

        next()
    }catch (err){
        console.error(err, 'Err');
        return res.status(500).send({
            status: 500,
            message: "Server error!"
        });
    }
}

export default authCompany;