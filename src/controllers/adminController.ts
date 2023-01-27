import db from "../../models";
import {createBcrypt, createImage} from "../helper/helpers";
import {sendMessage} from "../helper/sendMessage";

const { User, Employee, Company } = db

class AdminController{
    async createAdmin(req: any, res: any){
        try {

            const {body, userId, companyId, files} = req
            const {email, password, role } = body

            delete body.password

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
        }catch (error: any){
            console.log(error)
            return  res.status(500).send({
                status: 500,
                message: error.message || "Error",
            })
        }
    }
    async getAdmin(req: any, res: any){
        try {
            const admins = await Company.findOne({
                where: {
                    id: req.companyId,
                },
                include: {
                    model: Employee,
                    as: "Employee",
                    where:{ role: "admin" },
                    // include:{
                    //     model: Company_Admins,
                    //     as: "Admin",
                    //     include: {
                    //         model: User,
                    //         as: "User"
                    //     }
                    // }
                }
            })
            return res.status(200).send({
                data: admins.employee,
                status: 200,
            });
        }catch (error: any){
            console.log(error)
            return  res.status(500).send({
                status: 500,
                message: error.message || "Error",
            })
        }
    }
}

export default new AdminController();