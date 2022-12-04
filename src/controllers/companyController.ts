import db from "../../models";
import jwtGenerator from "../helper/jwtAuth";

class CompanyController {
    async createCompany(req:any, res:any){
        try{
            await db.User.findOne({where: {id: req.userId}, include: ["Details"]});

            const company = await db.Company.bulkCreate([{
                user_id: req.userId,
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
            const companies = await db.Company.findAll({where: {user_id: req.userId}});

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
            await db.Company.findByPk(req.param("id"));

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