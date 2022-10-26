import db from "../../models";
import jwtGenerator from "../utils/jwtAuth";

class CompanyController {
    async createCompany(req:any, res:any){
        try{
            await db.User.findOne({where: {id: req.id}, include: ["Details"]});

            const company = await db.CompanyDetails.bulkCreate([{
                user_id: req.id,
                ...req.body
            }])

            return res.status(200).json({
                body: company,
            })
        }catch (error: any){
            console.log(error);
            return  res.status(500).send({
                status: 500,
                message: error.message || "Error",
            })
        }
    }

    async getCompanies(req: any, res: any){
        try {
            const companies = await db.CompanyDetails.findAll({where: {user_id: req.id}});

            return res.status(200).json({
                status: 200,
                message: "Success",
                data: companies
            })
        }catch (error: any){
            console.log(error);
            return  res.status(500).send({
                status: 500,
                message: error.message || "Error",
            })
        }
    }

    async getCompany(req: any, res: any){
        try {
            await db.CompanyDetails.findOne({ where: {id: req.param("id")}});

            const companyToken = jwtGenerator(req.param("id"));
            return res.status(200).json({
                params:{
                    id:req.param("id")
                },
                companyToken,
            })
        }catch (error: any){
            console.log(error);
            return  res.status(500).send({
                status: 500,
                message: error.message || "Error",
            })
        }
    }
}

export default new CompanyController();