import { buildSchema } from "graphql";

const schema = buildSchema(`

    type Query {
        getAllUsers: [User]
        loginUsers(id: ID): User
        ip: String
    }

    type User {
        id:ID
        username: String
    }

    input UserInput {
        id:ID
        username: String!
    }

`);

export default schema;
