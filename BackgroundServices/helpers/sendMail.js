const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();
function createTransporter(config)
{
    const transporter = nodemailer.createTransport9(config);
    return transporter; // using this transporter we can now have the configuration.
}

let configuration = {
    service:"gmail",
    host:"smtp.gmail.com",
    port:587,
    requireTLS:true,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
}

const sendMail= async(messageOption) =>
{
    const transporter = await createTransporter(configuration);
    await transporter.verify();
    await transporter.sendMail(messageOption,(error, info) =>{
        if(error){
            console.log(error);
        }
        console.log(info.response);
    })
}

module.exports = sendMail;