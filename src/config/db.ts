import {Pool} from "pg";
import dotenv from "dotenv";
import {Sequelize} from "sequelize"
dotenv.config();

// const sequelize: Sequelize = new Sequelize(
//     `${"users_test"}`,
//     `${process.env.DB_USER}`,
//     `${process.env.DB_PASS}`,
//     {
//         host: process.env.DB_HOST,
//         dialect: "postgres",
//
//         pool: {
//             max: 5,
//             min: 0,
//             acquire: 30000,
//             idle: 10000,
//         }
//     }
// )

export const db = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: 5432 || process.env.DB_PORT,
    // database: "admin_user",
    database: "users_test",
})

const database: any = {}


export default database;
