import sendMail from "./mail";

export async function sendMessage(res: any, verify: any,message: object){
    try {
        sendMail(verify.email,"Confirm code", verify.code,  (err: any, data: any) => {
            if (err){
                return res.status(500).json({ message: "Error"});
            } else {
                return res.status(200).json(message);
            }
        })
    }catch (err){
        console.error(err)
        return res.status(500).send({
            status: 500,
            message: "Server Error"
        })
    }
}
