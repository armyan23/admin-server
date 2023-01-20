import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes";

const main =async () => {

    const app = express();
    dotenv.config();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(
        '/resources',
        express.static(__dirname + '/resources', { maxAge: 3600000 })
    );

    //Routers
    app.use("/api", router)

    // Server
    app.listen(process.env.SERVER_PORT,() => {
        console.log(`⚡️[server]: Server is running at ${process.env.SERVER_HOST}${process.env.SERVER_PORT}`);
    })
}

main().catch(err => {
    console.log(err);
})
