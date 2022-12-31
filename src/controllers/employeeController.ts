import db from "../../models";
import {Op} from "sequelize";
import {createImage, deleteImage} from "../helper/helpers";

const { Company, Employee, User } = db

class EmployeeController {
    async createEmployee(req: any, res: any){
        try {
            const {body, userId, companyId, files} = req

            const addEmployee = await Employee.create({
                ...body,
                creatorId: userId,
                endWork: body.endWork === "null" ? null : body.endWork
            })
            await addEmployee.save()

            const company = await Company.findByPk(companyId);

            // // 3. INSERT the association in Enrollments table
            //    await student.addClass(classRow, { through: Enrollment });
            await company.addEmployee(addEmployee,{
                through:  {role: "employee"}
            })

            if (files?.length > 0) {
                await createImage(files, addEmployee.id, Employee,"employees")
            }

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
                data: company? company.Employee : [],
            })
        }catch (error: any){
            console.log(error);
            return  res.status(500).send({
                status: 500,
                message: error.message || "Error",
            })
        }
    }
    async updateEmployee(req: any, res: any){
        try {
            const { id } =  req?.params
            const { body, files } =  req

            const employee = await Employee.findByPk(id)
            await employee.update({
                ...body,
                endWork: body.endWork === "null" ? null : body.endWork
            });

            if (files?.length > 0) {
                if (employee.image) await deleteImage(employee)
                await createImage(files, id, employee,"employees")
            }

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
    async deleteImage(req: any, res: any){
        try {
            const { id } =  req?.params

            const employee = await Employee.findByPk(id)

            await deleteImage(employee)

            return res.status(200).send({
                status: 200,
                message: "Success",
                data: employee
            });
        }catch (err){
            console.error(err)
            return res.status(500).send({
                status: 500,
                message:"Server Error"
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
    async restoreEmployee(req: any, res: any){
        try {
            const { id } =  req?.params

            await Employee.update({
                endWork: null
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