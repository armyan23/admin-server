import bcrypt from "bcrypt";
import sendMail from "../api/mail";

import db from "../../models/index"


class register {

    async createUser(req:any, res:any){

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

            // // SEND EMAIL MESSAGE
            // sendMail(req.body.email,"Confirm code","1234",  (err: any, data: any)=>{
            //     if (err){
            //         res.status(500).json({ message: "Error"})
            //     } else {
            //         res.status(200).json({
            //             message: "Email send",
            //             data
            //         })
            //     }
            // })

            const user = await db.User.create(newUser);
            await user.save()
            console.log(user.id)
            const verify = await user.setVerify(new db.VerifyEmail({
                // Verify id maybe make user_id ???
                // user_id: user.id,
                email: user.email,
                code: 123,
                // /// Issue. It's not working automatic!
                // createdAt: "2022-10-02 01:49:44.368+04",
                // updatedAt: "2022-10-02 01:49:44.368+04",
            }))

            res.status(200).send({
                message: "Verification code has been send in your email!",
                user,
                verify
            });
        }catch (error: any){
            console.log(error)
            res.status(403).send({
                status: 403,
                message: error.message || "Error",
            })
        }
    }

    async getUser(req: any, res: any){

        try{

            const users = await db.User.findAll({});
            console.log(users)
            res.status(200).send(users);
        }catch (err){
            console.error(err)
            res.status(403).send("Server Error")
        }
    }

}


export default new register();