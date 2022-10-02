import db from "../config/db";


class UserController{
    async createUser(req: any, res: any): Promise<void> {
        const { name, surname } = req.body;
        const newPerson = await db.query(`INSERT INTO person (name, surname) values ($1, $2 ) RETURNING *`,[name,surname])
        res.json(newPerson.rows[0])
    }

    async getUsers(req: Request, res: any): Promise<void> {
        const users = await db.query(`SELECT * FROM person`)
        res.json(users.rows)
    }


    async getOneUser(){
        console.log("Response: 200")
    }

    async updateUser(){
        console.log("Response: 200")
    }

    async deleteUser(){
        console.log("Response: 200")
    }

}


export default new UserController();
