import {validCheckEmail} from "../helper/valid";

async function valid(req: any, res: any, next: Function) {
    const { email, password } = req.body;

    const validInfoEmail = validCheckEmail(email);

   if (req.path === "/login") {
        if (![email, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        } else if (validInfoEmail) {
            return res.status(validInfoEmail.status).json(validInfoEmail);
        }
   }

    next();
};

// TODO: Sarqeci es faily bayc voch mi ban chareci es faili het :: time from video 1:15


export default valid;