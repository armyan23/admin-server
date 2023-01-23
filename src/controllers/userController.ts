import db from "../../models";
import bcrypt from "bcrypt";
import {createBcrypt, createImage, deleteImage} from "../helper/helpers";

const { User, UserDetails, Employee }  = db

class UserController{
    async profileData(req: any, res: any){
        try {
            // TODO: Change This part
            const { userId } = req
            const user = await User.findByPk( userId);

            let details = null

            if (user.role === "owner") {
                details = await UserDetails.findByPk( userId,{
                    attributes: ['birthDate', 'city', 'country','firstName','gender','lastName','phoneNumber','image'],
                })
            } else  if (user.role === "admin") {
                details = await Employee.findOne({
                    where: {
                        user_id: userId
                    }
                })
            }

            return res.status(200).send({
                status: 200,
                message: "Success",
                data: {...user.dataValues, details}
            });
        }catch (err){
            console.error(err)
            return res.status(500).send({
                status: 500,
                message:"Server Error"
            })
        }
    }
    async editUserDetails(req: any, res: any){
        try {
            const {body, userId, files} = req

            const details = await UserDetails.findByPk(userId)

            await details.update({...body});

            if (files?.length > 0) {
                if (details.image) await deleteImage(details)
                await createImage(files, userId, details,"company/users")
            }

            return res.status(200).send({
                status: 200,
                message: "Success",
                data: details
            });
        }catch (err){
            console.error(err)
            return res.status(500).send({
                status: 500,
                message:"Server Error"
            })
        }
    }
    async deleteImage(req: any, res: any){
        try {
            const details = await UserDetails.findByPk(req.userId)
            await deleteImage(details)

            return res.status(200).send({
                status: 200,
                message: "Success",
                data: details
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