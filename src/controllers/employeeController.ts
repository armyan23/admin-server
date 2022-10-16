import db from "../../models";

class EmployeeController {
    async createEmployee(req: any, res: any){

        const company = await db.CompanyDetails.findOne({where: {id: req.id}});
        return res.status(200).json({
            userId: req.id,
            company,
        })
    }
}

export default new EmployeeController();