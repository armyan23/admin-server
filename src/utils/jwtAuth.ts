import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


function jwtGenerator(user_id : string){
    const payload = {
        user: user_id
    }

    return jwt.sign(payload, `${process.env.JWT_SECRET}`,{ expiresIn: 60 * 60}); // or 1hr
}

export default jwtGenerator;