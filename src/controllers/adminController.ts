import db from "../../models";
import {createBcrypt} from "../helper/helpers";
import {sendMessage} from "../helper/sendMessage";

const { User, Employee, Company, Company_Employees } = db

class AdminController{
    async createAdmin(req: any, res: any){
        try {

            const {email, password, role, employee } = req.body
            const user = await User.findOne({where: {email}})
            const createdBy = await User.findByPk(req.userId)

            if(user){
                return res.status(400).json({
                    status: 400,
                    message: "You cannot create this mail because that this mail is used."
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

            // Add Employee in table
            const addEmployee = await Employee.create({
                ...employee,
                creatorId: req.userId,
                user_id: addUser.id
            })
            await addEmployee.save()

            // Add employee and company ID into ref table
            const company = await Company.findByPk(req.companyId);
            await company.addEmployee(addEmployee,{
                through:  {
                    role
                }
            })

            // Add Verify in table
            const verify = await addUser.setVerify(new db.VerifyEmail({
                email,
                // code: helpers(),
                code: 1234,
            }))

            // const companyAdmin = await addUser.setAdmin(new Company_Admins({
            //     employeeId: addEmployee.id,
            //     createdById: req.userId,
            //     role,
            // }))

            await sendMessage(res, verify, {
                status: 200,
                message: `Verification code has been send in this ${email} email!`,
                data: ''
            })
            // return res.status(200).send({
            //     status: 200,
            //     message: "Success",
            //     // body: req.body
            // });
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
                where: {id: req.companyId},
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
            // const company = await Company.findOne({
            //     where: {
            //         id: req.companyId,
            //     },
            //     include: {
            //         model: Employee,
            //         as: "Employee"
            //     }
            // })
            return res.status(200).send({
                admins: admins.Employee,
                status: 200,
                message: "Success",
                // body: req.body
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