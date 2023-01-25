import bcrypt from "bcrypt";
import db from "../../models/index"
import {createBcrypt, codeGenerate} from "../helper/helpers";
import jwtGenerator from "../helper/jwtAuth";
import {sendMessage} from "../helper/sendMessage";

const {Company, VerifyEmail, User, UserDetails, Company_Employees, Employee} = db

class AuthController {
    async register(req: any, res: any) {
        try {
            const email = await User.findOne({where: {email: req.body.email}});
            if (email && email?.is_verify) {
                return res.status(400).json({
                    status: 400,
                    message: "Email address already in use!"
                });
            } else if (email) {
                return res.status(400).json({
                    status: 400,
                    message: "You already registry, please check your email for confirmation of your identity!"
                });
            }

            const bcryptPassword = await createBcrypt(req.body.password)
            const user = await User.create({
                role: "owner",
                email: req.body.email,
                password: bcryptPassword,
            });
            await user.save()

            // TODO: Edit this part
            await user.setDetails(new UserDetails({
                ...req.body.userDetails
            }))

            const verify = await user.setVerify(new VerifyEmail({
                email: user.email,
                // code: codeGenerate(),
                code: 1234
            }))


            await sendMessage(res, verify, {
                status: 200,
                message: "Verification code has been send in your email!",
                data: ''
            })
        } catch (error: any) {
            console.log(error)
            return res.status(500).send({
                status: 500,
                message: error.message || "Error",
            })
        }
    }

    async verifyUser(req: any, res: any) {
        try {
            const {code, email} = req.body
            const verify = await VerifyEmail.findOne({where: {email}});

            if (!verify) {
                return res.status(200).send({
                    message: "Doesn't have verification this mail.",
                });
            } else if (verify?.code === "isActive") {
                return res.status(200).send({
                    message: "You already verified.",
                });
            } else if (verify?.code === code) {
                await User.update(
                    {is_verify: new Date()},
                    {where: {email}}
                )
                verify.code = "isActive";
                await verify.save()
                // DELETE this row
                // await VerifyEmail.destroy({ where: { email } })

                return res.status(200).send({
                    status: 200,
                    message: "You are verified",
                    data: ""
                });
            } else {
                return res.status(200).send({
                    status: 400,
                    message: "Your code is no correct",
                });
            }
        } catch (error: any) {
            console.log(error)
            return res.status(500).send({
                status: 500,
                message: error.message || "Error",
            })
        }
    }

    async signIn(req: any, res: any) {
        try {
            const {email, password} = await req.body;

            const user = await User.scope('deleted').findOne({where: {email}})
            // 1. CHECK Valid fields in VALIDATOR
            // 2. CHECK User
            // 3. CHECK email verify or not
            // 4. CHECK password valid or not
            // 5. CREATE User Token
            if (!user) {
                return res.status(401).send({
                    message: "You have entered an invalid email or password",
                    status: 401,
                })
            } else if (!user.is_verify) {
                return res.status(401).send({
                    message: "The account is not active. Please check your email.",
                    status: 401,
                });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).send({
                    message: "Password not valid.",
                    status: 401
                });
            }
            const userToken = jwtGenerator(user.id)

            const findCompany = { company: null }

            if (user.role === "owner") {
                const companies = await Company.findOne({where: {user_id: user.id}});
                findCompany.company = companies?.id
            } else if (user.role === "admin") {
                const employee = await Employee.findOne({where: {user_id: user.id}});
                const companies = await Company_Employees.findOne({where: {employeeId: employee.id}});
                findCompany.company = companies?.companyId
            }

            return res.status(200).send({
                status: 200,
                message: "Sign in success.",
                data: {
                    userToken,
                    company: findCompany.company,
                }
            })
        } catch (error: any) {
            console.log(error)
            return res.status(500).send({
                status: 500,
                message: error.message || "Error",
            })
        }
    }

    async isLogin(req: any, res: any) {
        try {
            const companies = await Company.findOne({where: {user_id: req.userId}});
            const company = companies?.id

            return res.status(200).send({
                status: 200,
                message: "Is login.",
                company
            })
        } catch (error: any) {
            console.log(error)
            return res.status(500).send({
                status: 500,
                message: error.message || "Error",
            })
        }
    }
}


export default new AuthController();