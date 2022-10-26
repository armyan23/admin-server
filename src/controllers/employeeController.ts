import db from "../../models";

class EmployeeController {
    async createEmployee(req: any, res: any){

        await db.CompanyDetails.findOne({where: {id: req.id}});

        // const employee = await db.Employee(req.body)
        // await employee.save()
        //
        // await company.addEmployee(employee, {
        //     through: {role: "employee"}
        // })

        return res.status(200).json({
            userId: req.id,
            req: req.body
            // company,
        })
    }
}

export default new EmployeeController();