import nodemailer from "nodemailer";

const auth = {
    user: 'adm.employer@outlook.com',
    pass: 'Adm1nEmp10ee'
}

const sendMail = (email: string, subject: string, text: string, cb: any) => {
    const mailOptions = {
        to: "arm.davtyan1029@gmail.com",
        // to: email,
        subject,
        text,
        html: `<div>
                    <h1>Email Confirmation</h1>
                    <h2>Hello ${email}</h2>
                    <p>Thank you for subscribing. Please confirm your email.</p>
                    <p> Confirm code ${text} </p>
                </div>`,
    }
    const transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 465,
        secure: true, //  Only True if  port === 465
        // /// FROM
        auth: {
            user: 'arm.davtyan1029@mail.ru',
            // pass: 'Adm1nEmp10ee'
            pass: 'r3BMiz6qwgfLMV2Lg9AE'
        },
        // ///OUTLOOK MICROSOFT
        // host: 'smtp-mail.outlook.com',
        // port: 587,
        // secure: false, // Only True if  port === 465
        // //FROM
        // auth: {
        //     user: 'adm.employer@outlook.com',
        //     pass: 'Adm1nEmp10ee'
        // },
    },{
        // from: "adm.employer@outlook.com"
        from: "arm.davtyan1029@mail.ru"
    });
    transporter.sendMail(mailOptions,(err,info) => {
        if(err)  cb(err, null);
        else cb(null, info);
    })
}

export default sendMail;