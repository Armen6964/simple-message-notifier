let protocol = null;
let server = null;

const Queues = require("./db/models/Queues");
const SchedulingTypes = require('./db/models/SchedulingTypes');
const Op = require("sequelize").Op;

const Fb = require("./FirabaseMessaging/index");
const Em = require("./EmailMassaging/index");
const TSms = require("./TwilloSmsMessaging/index");

const TZ = require("tz-maker");
const log = require("inologger");

const {initSchedulingTypes} = require("./utils/index");
const {serverHandler} = require("./utils/server");

const config = require("./config/global");
log.init(__dirname+"/log.log");

const CLIENTS_LIVE = {};

if (config.https.isEnabled){
    log.info("ENABLING HTTPS SERVER");
    protocol = require("https");
    const https_options = {
        key: config.https.keys.private,
        cert: config.https.keys.cert,
        ca:config.https.keys.ca
    };
    server = protocol.createServer(https_options,serverHandler)
}else{
    log.info("ENABLING HTTP SERVER");
    protocol = require("http");
    server = protocol.createServer(serverHandler)
}

server.listen(config.port);

const io = require("socket.io")(server);

io.on("connection",(socket)=>{
    socket.on("join",(data)=>{ connect(socket,data); });
    socket.on("disconnect",()=>{ disconnectFromSocket(socket);})
});

function connect(socket,data) {
    log.warn("CONNECTION REQUEST");
    data.socketId = socket.id;
    CLIENTS_LIVE[data.id] = data;
    socket.emit("connected",data);
}

function disconnectFromSocket(socket){
    for (let key in CLIENTS_LIVE){
        if (CLIENTS_LIVE[key].socketId === socket.id){
            delete CLIENTS_LIVE[key];
        }
    }
}



function sendNotification(limit) {
    if (!limit) limit = 100;
    Queues.belongsTo(SchedulingTypes,{
        foreignKey:"schedulingTypeId",onDelete:"CASCADE"})
    Queues.findAll({
        limit,
        include:[ {model:SchedulingTypes} ],
        where:{ status : {[Op.in]:[0,2,3]} }
    }).then(async (data)=>{
        for (let i = 0; i < data.length;i++){
            let filed = data[i];
            let item = data[i].dataValues;
            let SchedulingType = item.SchedulingType.name;
            let delivery = item.deliveryDate;
            let recipients = item.recipients;
            let sentData = {
                title : item.title,
                message : item.message,
                storage : item.keyStorage,
            };

            if (item.tz.length > 1){
                let d = new TZ(delivery,item.tz);
                d.convert();
                delivery  = d.date;
            }

            if (SchedulingType === "day"){
                sendInDay(delivery, recipients, sentData, item.tz, filed);
            }

            if (SchedulingType === "year"){
                sendInYear(delivery,recipients,sentData, item.tz, filed);
            }

            if (SchedulingType === "month"){
                sendInMonth(delivery,recipients);
            }

            if (SchedulingType === "immediately") {
                sendMessagesImmediately(recipients, sentData, filed);
            }

            if (SchedulingType === "after"){
                sendAfterSomeDate(delivery,recipients,sentData,item.tz,filed);
            }

        }
    }).catch((err)=>{
        log.error(err.message);
    });
}

function sendInDay(delivery,recipients,data,tz,row) {
    log.info("SENDING SCHEDULED NOTIFICATIONS IN DAY...");
    let nowDate = new TZ(new Date(),tz);
    nowDate.convert();
    if (nowDate.date > delivery){
        send(recipients,data);
        row.update({delivery:delivery.setDate(delivery.getDate()+1)})
    }
}

function sendMessagesImmediately(recipients,data,row) {
    log.info("SENDING MASSAGE NOW...");
    send(recipients,data,row);
}

function sendOfflineMessages(data,push_web,emails,phone_number) {
    if (push_web.length > 0){
        Fb.sendPushForce(data, push_web).then(r =>{
            log.info("Push Sent");
        })
    }

    if (emails.length > 0){
        Em.sendEmail("Notification", data.message, emails, data.title).then(r  =>{
            log.info("Email sent");
        });
    }

    if (phone_number.length){
        TSms.sendMessageForce(data.message, "+"+phone_number).then(r =>{log.info("Sms sent")});
    }
}

function send(recipients,data,row) {
    for (let i = 0; i < recipients.length;i++){
        let clientId = recipients[i].clientId;
        let emails = recipients[i].emails;
        let push_web = recipients[i].push_web;
        let push_android = recipients[i].push_android;
        let push_ios = recipients[i].push_ios;
        let push_windows = recipients[i].push_windows;
        let push_macOS = recipients[i].push_macOS;
        let phone_number = recipients[i].phone_number;
        let options = recipients[i].options;

        if (CLIENTS_LIVE[clientId]){
            let socket = io.sockets.connected[CLIENTS_LIVE[clientId].socketId];
            if (socket){
                console.log("SOCKET EXISTS...");
                socket.emit(data.title,data);
            }else{
                log.warn("DELETING DISCONNECTED CLIENT");
                delete CLIENTS_LIVE[clientId];
                sendOfflineMessages(data,push_web,emails,phone_number);
            }
        }else{
            log.warn("CLIENT NOT CONNECTED SENDING OFFLINE");
            sendOfflineMessages(data,push_web,emails,phone_number);
        }

    }

    if (row){row.destroy()};
}

function sendAfterSomeDate(delivery,recipients,data,tz,row) {
    log.info("SENDING MASSAGE AFTER SOME DATE...");
    let newDate = new TZ(new Date(),tz);
    newDate.convert();
    if (newDate.date > delivery){
        send(recipients,data,row);
    }else{
        log.info("No data to send...")
    }
}

function sendInMonth(delivery,recipients,data,tz,row) {
    log.info("SENDING SCHEDULED NOTIFICATIONS IN MONTH...");
    let nowDate = new TZ(new Date(),tz);
    nowDate.convert();
    if (nowDate.date > delivery){
        send(recipients,data);
        row.update({delivery:delivery.setMonth(delivery.getMonth()+1)})
    }
}

function sendInYear(delivery,recipients,data,tz,row) {
    log.info("SENDING SCHEDULED NOTIFICATIONS IN YEAR...");
    log.info(delivery.getFullYear())
    let nowDate = new TZ(new Date(),tz);
    nowDate.convert();
    if (nowDate.date > delivery){
        send(recipients,data);
        row.update({delivery:delivery.setFullYear(delivery.getFullYear()+1)})
    }
}


setInterval(()=>{sendNotification()},config.intervalInSeconds  * 1000);


initDefaults();

function initDefaults() {
    let sleep = setTimeout(async ()=>{
        await initSchedulingTypes(SchedulingTypes).catch(err=>{
            log.fatal(err.message);
            process.exit(1);
        });
        clearTimeout(sleep);
    },2000);
}
