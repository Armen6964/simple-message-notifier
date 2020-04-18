const twilio = require('twilio');
const config = require("./configs");
const client = new twilio(config.accountSid, config.authToken);


function sendMessage(body,to,cb){
    client.messages.create({
        body: body,
        to: to,
        from: config.from
    }).then((message)=>{
        cb({
            error : false,
            message : message
        })
    }).catch((error)=>{
        cb({
            error : true,
            message : error.message
        })
    });
}

async function sendMessageForce(body,to){
    await client.messages.create({body: body, to: to, from: config.from})
}


module.exports.sendMessage = sendMessage;
module.exports.sendMessageForce = sendMessageForce;
