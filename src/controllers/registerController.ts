import bcrypt from "bcrypt";
import sendMail from "../api/mail";

import db from "../../models/index"
import authCode from "../helper/authCode";


class RegisterController {

    async register(req:any, res:any){

        try{
            const email = await db.User.findOne({ where: { email: req.body.email } });

            if (email && email?.is_verify) {
                return res.status(400).json({ message: "Email address already in use!"});
            } else if (email){
                return res.status(400).json({ message: "You already registry, please check your email for confirmation of your identity!"});
            }

            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound);
            const bcryptPassword = await bcrypt.hash(req.body.password, salt)

            const newUser = {
                name: req.body.name,
                email: req.body.email,
                password: bcryptPassword,
            }

            const user = await db.User.create(newUser);
            await user.save()

            const verify = await user.setVerify(new db.VerifyEmail({
                email: user.email,
                // code: authCode(),
                code: 1234,
            }))

            await RegisterController.sendMessage(verify, res, {
                message: "Verification code has been send in your email!",
                user,
                verify
            })
        }catch (error: any){
            console.log(error)
            return  res.status(403).send({
                status: 403,
                message: error.message || "Error",
            })
        }
    }

    async verifyUser(req: any, res: any){

        try{
            const {code, email} = req.body
            // const users = await db.User.findAll({});
            const verify = await db.VerifyEmail.findOne({ where: { email } });

            if(!verify){
                return res.status(200).send({
                    message: "Doesn't have verification this mail.",
                });
            }else if(verify?.code === "isActive"){
                return res.status(200).send({
                    message: "You already verified.",
                });
            }else if (verify?.code === code){
                await db.User.update(
                      { is_verify: new Date() },
                    { where: {email} }
                )
                verify.code = "isActive";
                await verify.save()
                // DELETE this row
                // await db.VerifyEmail.destroy({ where: { email } })

                return res.status(200).send({
                    status: 200,
                    message: "You are verified",
                    verify

                });
            }else {
                return res.status(200).send({
                    message: "Your code is no correct",
                });
            }

        }catch (err){
            console.error(err)
            return res.status(403).send("Server Error")
        }
    }

    static async sendMessage(verify: any, res: any, message: object){
        try {
            sendMail(verify.email,"Confirm code", verify.code,  (err: any, data: any) => {
                if (err){
                    return res.status(500).json({ message: "Error"})
                } else {
                    return res.status(200).json(message)
                }
            })
        }catch (err){
            console.error(err)
            return res.status(403).send("Server Error")
        }

    }

}


export default new RegisterController();