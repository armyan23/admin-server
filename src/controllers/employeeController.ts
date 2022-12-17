import db from "../../models";
import {Op} from "sequelize";

const { Company, Employee, User } = db

class EmployeeController {
    async createEmployee(req: any, res: any){
        try {
            // // 1. INSERT a new student
            const addEmployee = await Employee.create({
                ...req.body,
                creatorId: req.userId
            })
            await addEmployee.save()
            //   const student = await Student.create({
            //        firstName: "Jake",
            //   });

            // // 2. Find the Classes row
            const company = await Company.findByPk(req.companyId);
            //    const classRow = await Class.findByPk(1);

            // // 3. INSERT the association in Enrollments table
            //    await student.addClass(classRow, { through: Enrollment });
                await company.addEmployee(addEmployee,{
                    through:  {
                        role: "employee"}
                })

            return res.status(200).json({
                status: 200,
                message: "Success",
                data: addEmployee
            })
        }catch (error: any){
            console.log(error);
            return  res.status(500).send({
                status: 500,
                message: error.message || "Error",
            })
        }
    }
    async getEmployeeId(req: any, res: any){
        try {
            const employee = await Employee.findOne({
                where: {
                    id: req?.params?.id
                }
            })

            return res.status(200).json({
                status: 200,
                data: employee,
            })
        }catch (error: any){
            console.log(error);
            return  res.status(500).send({
                status: 500,
                message: error.message || "Error",
            })
        }
    }
    async getEmployeesAll(req: any, res: any){
        try {
            const { type } = req?.query

            const company = await Company.findOne({
                where: {
                    id: req.companyId,
                },
                include: {
                    model: Employee,
                    where: {
                        endWork: type === "active" ? null : {
                            [Op.ne]: null
                        }
                    },
                    as: "Employee",
                    include:[{
                        model: User,
                        as: "Admin",
                    },{
                        model: User,
                        as: "CreatorId",
                    }]
                }

            })

            return res.status(200).json({
                status: 200,
                message: "Success",
                data: company.Employee,
            })
        }catch (error: any){
            console.log(error);
            return  res.status(500).send({
                status: 500,
                message: error.message || "Error",
            })
        }
    }
    async deleteEmployee(req: any, res: any){
        try {
            const { id } =  req?.params

            await Employee.update({
                endWork: new Date()
            },{where: {id: id}})

            return res.status(200).json({
                status: 200,
                message: "Success",
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

export default new EmployeeController();