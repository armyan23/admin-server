import db from "../../models";
import { Op } from "sequelize";
import { createBcrypt, createImage, deleteImage } from "../helper/helpers";
import { sendMessage } from "../helper/sendMessage";

const { Company, Employee, User } = db

class EmployeeController {
    async createEmployee(req: any, res: any){
        try {
            const {body, userId, companyId, files} = req
            const {email, password, role } = body

            delete body.password

            if (role === "admin") {
                const user = await User.findOne({where: {email}})

                if (user) {
                    return res.status(400).json({
                        status: 400,
                        message: "You cannot create admin with this mail because that this mail is used."
                    })
                }

                // Add user in table
                const bcryptPassword = await createBcrypt(password)
                const addUser = await User.create({
                    password: bcryptPassword,
                    email,
                    role,
                })
                await addUser.save();


                // // Add Employee in table
                const addEmployee = await Employee.create({
                    ...body,
                    creatorId: userId,
                    user_id: addUser.id,
                    endWork: body.endWork === "null" ? null : body.endWork,
                })
                await addEmployee.save()

                if (files?.length > 0) {
                    await createImage(files, addEmployee.id, addEmployee,"employees")
                }

                // // Add employee and company ID into ref table
                const company = await Company.findByPk(companyId);
                await company.addEmployee(addEmployee, {
                    through:  { role }
                })

                const verify = await addUser.setVerify(new db.VerifyEmail({
                    email,
                    // code: helpers(),
                    code: 1234,
                }))

                await sendMessage(res, verify, {
                    status: 200,
                    message: `Verification code has been send in this ${email} email!`,
                    data: addEmployee
                })
            } else if (role === "employee") {
                const addEmployee = await Employee.create({
                    ...body,
                    creatorId: userId,
                    endWork: body.endWork === "null" ? null : body.endWork
                })
                await addEmployee.save()

                const company = await Company.findByPk(companyId);
                await company.addEmployee(addEmployee, {
                    through:  { role }
                })

                if (files?.length > 0) {
                    await createImage(files, addEmployee.id, addEmployee,"employees")
                }

                return res.status(200).json({
                    status: 200,
                    message: "Success",
                    data: addEmployee
                })
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Something went wrong",
                })
            }
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
                    as: "employee",
                    // include:[{
                    //     model: User,
                    //     as: "Admin",
                    // },{
                    //     model: User,
                    //     as: "CreatorId",
                    // }]
                }

            })

            return res.status(200).json({
                status: 200,
                message: "Success",
                data: company? company.employee : [],
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