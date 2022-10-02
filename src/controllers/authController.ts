import { db } from "../config/db";
import bcrypt from "bcrypt";
import jwtGenerator from "../utils/jwtAuth";


class authController {
    async registration(req: any, res: any){
        try{
            //1. Destructure the req.body
            const { name, email, password } = req.body
            console.log(req.body)
            //2. Check if user exist (if user exist then throw error)

            // const userSequelize = await user.findAll({  })      name === 'notice' ? new NoticeMessage(length, messageValue) : new DatabaseError(messageValue, length, name)
            // res.json(userSequelize)

            const user = await db.query(`SELECT * FROM users_test WHERE user_email = $1`,[email])
            if(user.rows.length !== 0){
                return res.status(401).send("User already created!" )
            }

            //3. Bcrypt the user password

            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound);
            const bcryptPassword = await bcrypt.hash(password, salt);


            // I think this part go to the confirmEmail request;
            //4. Enter the new user inside our database

            const newUser = await db.query(`INSERT INTO users_test (user_name, user_email, user_password) VALUES ($1,$2,$3) RETURNING *`,[name, email, bcryptPassword])

            //5. Generating our jwt token
            // const token = jwtGenerator(newUser.rows[0].user_id);
            // res.json({token});
            res.json(newUser)

        }catch (err){
            console.error(err)
            res.status(500).send("Server Error!")
        }
    }

    async confirmEmail(req: any, res: any){
        try {
            console.log(req.body)
            res.json(req.body)
        }catch (err){
            console.error(err);
            res.status(500).json("Server Error");
        }
    }

    async login(req: any, res: any){
        try{
            //1. Destructure the req.body
            const {email, password} = req.body;

            //2. Check if user doesn't exist (if not we throw error)
            const user = await db.query(`SELECT * FROM users_test WHERE user_email = $1`, [email])

            if (user.rows.length === 0){
                return res.status(401).send("Password or Email is incorrect! *Email");
            }

            //3. Check if incoming password is the same the database password

            const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

            if (!validPassword){
                return res.status(401).send("Password or Email is incorrect! *Password");
            }

            //4. Give them the jwt token
            const token = jwtGenerator(user.rows[0].user_id);
            res.json({token})

        }catch (err){
            console.error(err);
            res.status(500).send("Server Error!")
        }
    }

    async isVerify(req: any, res: any){
        try {
            res.json(true);
        }catch (err){
            console.error(err);
            res.status(500).send("Server Error");
        }
    }
}

export default new authController();