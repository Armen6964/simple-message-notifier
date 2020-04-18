const nodemailer = require("nodemailer");
const Config = require("./configs/index");
const fs = require("fs");
function getRandom(){ return Math.floor(Math.random() * Config.smtps.length-1) }

async function emails(service_name,message,to,subject){
    if (!Config.enabled) return;
    let mess = fs.readFileSync(__dirname+"/tamplates/1.html","utf-8")
        .replace('((message))',message);

    nodemailer.createTestAccount((err, account)=>{
        let rnd = getRandom();
        let  transporter = nodemailer.createTransport({
            host: Config.smtps[rnd].host,
            port: Config.smtps[rnd].port,
            secure: Config.smtps[rnd].secure,
            auth: {user: Config.smtps[rnd].username, pass: Config[rnd].password},
            tls : { rejectUnauthorized : Config.smtps[rnd].rejectUnauthorized}
        });


        let  mailOptions = {
            from: '"'+service_name+'"<'+Config.smtps[rnd].username+'>',
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
