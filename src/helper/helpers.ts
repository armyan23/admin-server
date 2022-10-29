import bcrypt from "bcrypt";

export function helpers(length = 8){
    return Math.random().toString(36).substring(2, length);
}

export async function createBcrypt(password: string){
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt)

    return bcryptPassword
}