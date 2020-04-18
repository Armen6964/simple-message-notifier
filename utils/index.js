function replaceAll(string,char) {
    let newString = "";
    for (let i = 0; i < string.length;i++){
        if (string[i] !==  char){
            newString += string[i]
        }else{
            newString += " ";
        }
    }
    return newString;
}

async function initSchedulingTypes(model) {

    const defaults = [
        {name : "immediately"},
        {name : "after"},
        {name : "day"},
        {name : "month"},
        {name : "year"},
    ];

    model.findAll().then((results)=>{
        if (results.length < 1){
            console.log("Inserting defaults to database");
            model.bulkCreate(defaults)
        }else{
            console.log("Defaults already inserted into database");
        }
    })
}


module.exports = {
    replaceAll,
    initSchedulingTypes
}
