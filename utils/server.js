const {replaceAll} = require("./index");
const Queues = require("../db/models/Queues");
function serverHandler(req,res) {
    res.setHeader("Content-type","application/json");
    if (req.method === "POST" && req.url === "/add"){
        let data = [];
        req.on('data', chunk => {data.push(chunk)});
        req.on('end', () => {addNewQueue(res,data);});
    }else{
        res.end(JSON.stringify({
            error : true,
            message : "invalid request url or params"
        }));
    }
}
function addNewQueue(res,data) {

    let args = JSON.stringify(data.toString()).replace("\"","").replace("\"","");
    let arrayOfArgs = args.split("&");
    let OBJECT = {};

    for (let i = 0; i < arrayOfArgs.length;i++){
        let itemArr = arrayOfArgs[i].split("=");
        let key = itemArr[0];
        let value = decodeURIComponent(itemArr[1]);
        OBJECT[key] = value;
    }

    OBJECT.message = replaceAll(OBJECT.message,"+");
    OBJECT.deliveryDate = replaceAll(OBJECT.deliveryDate,"+");
    OBJECT.recipients = replaceAll(OBJECT.recipients,"+");
    OBJECT.title = replaceAll(OBJECT.title,"+");
    OBJECT.recipients = JSON.parse(OBJECT.recipients);

    Queues.create(OBJECT).then((data)=>{
        res.end(JSON.stringify(data))
    }).catch((error)=>{
        res.end(JSON.stringify({error:true,message:error.message}))
    })
}


module.exports = {
    serverHandler,
}
