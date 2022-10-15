const error = (status: any, valid: boolean, message: any, error: any) => ({
    valid,
    message,
    status,
    error,
})

// |:| Valid email
export const  validCheckEmail = (userEmail: string)=> {
    const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    if (!isEmail){
        return error(401, isEmail,"Invalid Email!", { email: userEmail });
    }
}

// |:| Valid password
export const validCheckPassword = (password: string, confirmPassword: string)=>{
    const length = password.length >= 8
    const match = password === confirmPassword
    if (!length){
        return  error(404, length,"Minimum password length is 8.",{passwordLength: length})
    }else if (!match){
        return  error(401, match,"Passwords did not match.",{passwordConfirm: match})
    }
}

// TODO: I need validate = {
//      Phone number,
//      ...
// }