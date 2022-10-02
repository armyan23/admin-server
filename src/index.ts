import express from "express";
import cors from "cors";
import router from "./api/index";
import dotenv from "dotenv";
// import routerDashboard from "./routes/dashboard"

const main =async () => {

    const app = express();
    dotenv.config();

    //Middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    //Router
    app.use("/api", router)
    // app.use("/api/dashboard", routerDashboard)

    // Server
    app.listen(process.env.SERVER_PORT,() => {
        console.log(`⚡️[server]: Server is running at ${process.env.SERVER_HOST}${process.env.SERVER_PORT}`);
    })
}

main().catch(err => {
    console.log(err);
})


// Need turn on sequelize Type end user