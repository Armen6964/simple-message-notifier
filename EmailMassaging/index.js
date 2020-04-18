const nodemailer = require("nodemailer");
const Config = require("./configs/index");
const fs = require("fs");
function getRandom(){
    return Math.floor(Math.random() * 1);
}
async function emails(service_name,message,to,subject){
    let mess = fs.readFileSync(__dirname+"/tamplates/1.html","utf-8")
        .replace('((message))',message);

    nodemailer.createTestAccount((err, account)=>{
        let  transporter = nodemailer.createTransport({
            host: Config[getRandom()].host,
            port: Config[getRandom()].port,
            secure: Config[getRandom()].secure,
            auth: {user: Config[getRandom()].username, pass: Config[getRandom()].password},
            tls : { rejectUnauthorized : Config[getRandom()].rejectUnauthorized}
        });


        let  mailOptions = {
            from: '"'+service_name+'"<'+Config[getRandom()].username+'>',
            to: to,
            subject: subject,
            html: mess
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }else{
                console.log(info);
            }
        });
    });
}

module.exports = {
   sendEmail : emails,
};
