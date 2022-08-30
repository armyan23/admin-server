import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import path from 'path';

import { ArgumentNode } from 'graphql';
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema";
import { users } from "./api/users";

const app: Express = express();
const port = process.env.PORT; // 8000

dotenv.config();
app.use(cors());

const root = {
    // getAllUsers: () => users,
    loginUsers: ({ id }: any) => {
        return 5
    },
    ip: () => 'Hello World!'
};

const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log('ip:', req.ip);
    next();
}
app.use(loggingMiddleware);

app.use(
    "/graphql",
    graphqlHTTP({
        graphiql: true,
        schema,
        rootValue: root,
    })
);


// ROUTERS

// app.use(express.static('assets/person'));
// app.use(express.static('public'));
// app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req: Request, res: Response) => {
    res.send(`Express + TypeScript Server`);
});

app.listen(8000, (): void => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});









