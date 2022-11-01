import db from "../../models";
import bcrypt from "bcrypt";
import { createBcrypt } from "../helper/helpers";

const { User, UserDetails } = db

class UserController{
    async editUserDetails(req: any, res: any){
        try {
            const user = await UserDetails.update({
                ...req.body
            },{where: {user_id: req.userId}})

            return res.status(200).send({
                status: 200,
                message: "Success",
                userId: req.userId,
                data: user
            });
        }catch (err){
            console.error(err)
            return res.status(500).send({
                status: 500,
                message:"Server Error"
            })
        }
    }

    async editUserPassword(req: any, res: any){
        try {
            const { password, newPassword, confirmPassword } = await req.body;
            const user = await User.findByPk(req.userId);

            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword){
                return res.status(400).send({
                    status: 400,
                    message: "The password you entered does not match your password. Please make sure you entered the wrong password.",
                });
            }

            if (newPassword !== confirmPassword){
                return res.status(400).send({
                    status: 400,
                    message: "Passwords did not match.",
                });
            }
            const changePassword = await createBcrypt(newPassword)

            user.update({
                password: changePassword
            })

            return res.status(200).send({
                status: 200,
                message: "Your password has been changed",
            });
        }catch (err){
            console.error(err)
            return res.status(500).send({
                status: 500,
                message:"Server Error"
            })
        }
    }

    async editUserEmail(req: any, res: any){
        try {
            const { email } = await req.body;
            const user = await User.findByPk(req.userId);
            // TODO: WORKING BAD (need change logic)
            user.update({
                email: email
            })

            return res.status(200).send({
                status: 200,
                message: "Your email has been changed",
            });
        }catch (err){
            console.error(err)
            return res.status(500).send({
                status: 500,
                message:"Server Error"
            })
        }
    }
    async userDelete(req: any, res: any){
        try {
            const user = await User.findByPk(req.userId)
            if (user.deletedAt){
                return res.status(200).send({
                    status: 200,
                    message: "Your account is deleted.",
                });
            }
            user.update({
                deletedAt: new Date()
            })

            return res.status(200).send({
                status: 200,
                message: "Your account has been deleted.",
            });
        }catch (err){
            console.error(err)
            return res.status(500).send({
                status: 500,
                message:"Server Error"
            })
        }
    }
    async userActivate(req: any, res: any){
        try {
            const user = await User.findByPk(req.userId);
            if (!user.deletedAt){
                return res.status(200).send({
                    status: 200,
                    message: "Your account is activated.",
                });
            }
            user.update({
                deletedAt: null
            })

            return res.status(200).send({
                status: 200,
                message: "Your account has been activated.",
            });
        }catch (err){
            console.error(err)
            return res.status(500).send({
                status: 500,
                message:"Server Error"
            })
        }
    }
}

export default new UserController();