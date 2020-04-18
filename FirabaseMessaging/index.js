const admin = require("firebase-admin");
const fs = require("fs");
const config = require("./configs/configs");
const options = JSON.parse(fs.readFileSync(__dirname+"/configs/google-configs.json"));

const app = admin.initializeApp({
    credential: admin.credential.cert(options),
});

const messaging = app.messaging();

async function sendPushForce(data, token) {
    if (!config.isEnabled) return;
    let message = {data, token,};
    await messaging.send(message);
}

async function sendMultipleMessages(options) {
    if (!config.isEnabled) return;

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
