import db from "../../models";

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
    async updateCompany(req:any, res:any){
        try{
            const company = await db.Company.findByPk(req.param("id"));

            await company.update(req.body)
            return res.status(200).json({
                data: company,
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
            const company = await db.Company.findByPk(req.param("id"));

            return res.status(200).json({
                data: company
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