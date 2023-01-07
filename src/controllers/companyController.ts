import db from "../../models";
import {createImage, deleteImage} from "../helper/helpers";

const { Company, Employee } = db

class CompanyController {
    async createCompany(req:any, res:any){
        try{
            const { userId, body, files } =  req
            await db.User.findOne({where: {id: userId}, include: ["Details"]});

            const company = await Company.create({
                user_id: userId,
                ...body,
            })
            await company.save()

            if (files?.length > 0) {
                await createImage(files, company.id, company,"company/logo")
            }

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
            const { id } =  req?.params
            const { body, files } =  req

            const company = await Company.findByPk(id);

            await company.update({
                ...body,
            });

            if (files?.length > 0) {
                if (company.image) await deleteImage(company)
                await createImage(files, id, company,"company/logo")
            }

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
    async deleteImageCompany(req:any, res:any){
        try{
            const { id } =  req?.params
            const company = await Company.findByPk(id);

            await deleteImage(company)

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
            const companies = await Company.findAll({where: {user_id: req.userId}});

            return res.status(200).json({
                status: 200,
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
            const { id } =  req?.params

            const company = await Company.findByPk(id, {
                attributes:['id','nameCompany','aboutCompany','typeCompany','phoneNumber','image','email','website',"createdDate"],
                include: [{
                    model: Employee,
                    as: "employee",
                }],
            });
            const male = company.employee.filter((elem: any) => elem.gender === "Male").length
            const female = company.employee.filter((elem: any) => elem.gender === "Female").length
            const costsSalary = company.employee.reduce((acc: any, elem: any) => (acc+elem.salary),0)

            const employeeInfo = {
                count: company.employee.length,
                female,
                male,
                costsSalary
            }

            return res.status(200).json({
                data: company,
                details: employeeInfo
            })
        }catch (error: any){
            console.log(error);
            return  res.status(500).send({
                status: 500,
                message: error.message || "Error",
            })
        }
    }
    async deleteCompany(req: any, res: any){
        try {
            const { id } =  req?.params

            const company = await Company.findByPk(id);

            if (!company){
                return  res.status(403).send({
                    message: "Company don't found.",
                    status: 403,
                })
            }

            await company.destroy()

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
}

export default new CompanyController();