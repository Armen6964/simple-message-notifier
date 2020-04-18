const admin = require("firebase-admin");
const fs = require("fs");
const options = JSON.parse(fs.readFileSync(__dirname+"/configs/Maps-adaa308f7e81.json"));

const app = admin.initializeApp({
    credential: admin.credential.cert(options),
});

const messaging = app.messaging();

async function sendPushForce(data, token) {
    let message = {data, token,};
    await messaging.send(message);
}

async function sendMultipleMessages(options) {
    let tokens = options.tokens;
    let len = tokens.length;

    for (let i = 0; i < len;i++){
        let message = {data: options.data, token: tokens[i]};
        await messaging.send(message);
    }

}


module.exports = {
    sendPushForce,
    sendMultipleMessages,
};
