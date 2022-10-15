import {
    validCheckEmail,
    validCheckPassword,
} from "../helper/valid";

async function validRegister(req: any, res: any, next: Function) {
    const { email, name, password, confirmPassword } = req.body;

    const validInfoEmail = validCheckEmail(email);
    const validInfoPassword = validCheckPassword(password, confirmPassword);

    // TODO: CREATE EVERY BOOLEAN GLOBAL FUNCTION
    if (![email, name, password, confirmPassword].every(Boolean)) {
        return res.status(401).json({
            status: 401,
            message:"Missing Credentials!"
        });
    }else if (validInfoEmail) {
        return res.status(validInfoEmail.status).json(validInfoEmail);
    }else if (validInfoPassword) {
        return res.status(validInfoPassword.status).json(validInfoPassword);
    }

    next();
};

async function validVerify(req: any, res: any, next: Function) {
    // TODO: email or other field. WHEN SEND REQUEST FOR VERIFY EMAIL
    const { email, code } = req.body;

    if (![email, code].every(Boolean)) {
        return res.status(401).json({
            status: 401,
            message:"Missing Credentials!"
        });
    }

    next();
};

async function validLogin(req: any, res: any, next: Function) {
    const { email, password } = req.body;

    const validInfoEmail = validCheckEmail(email);

    if (![email, password].every(Boolean)) {
        return res.status(401).json({
            status: 401,
            message:"Missing Credentials!"
        });
    }else if (validInfoEmail) {
        return res.status(validInfoEmail.status).json(validInfoEmail);
    }

    next();
};


export  { validRegister, validVerify, validLogin};