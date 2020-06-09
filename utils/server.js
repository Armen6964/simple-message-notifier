const Queues = require("../db/models/Queues");
function serverHandler(req,res) {
    Queues.create(req.body).then((data)=>{
        res.json({error:false,message:data})
    }).catch((error)=>{
        res.json({error:true,message:error.message})
    })
}


module.exports = { serverHandler, }
