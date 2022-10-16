import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function jwtGenerator(id : string){
    const payload = {
        id
    }

    return jwt.sign(payload, `${process.env.JWT_SECRET}`,{ expiresIn: 60 * 60}); // or 1hr
}

export default jwtGenerator;