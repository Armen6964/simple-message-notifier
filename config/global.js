const fs = require("fs");
const port = 8020;
const db = {
    host: 'localhost', //enter you'r mysql host
    username: 'inoclouds', //enter you'r mysql username
    password: 'inoclouds', //enter you'r mysql password
    database: 'workers', //enter you'r database name
    dialect: 'mysql', //this server only work with mysql database so dont't edit this line
    logging: false //Enable/Disable logging in console from sequelize
};

const global = {
    intervalInSeconds : 2,
    https : {
        isEnabled : false,
        keys : {
            ca : fs.readFileSync(__dirname+"/certs/ca.pem","utf-8"),
            private : fs.readFileSync(__dirname+"/certs/private.key","utf-8"),
            cert : fs.readFileSync(__dirname+"/certs/cert.pem","utf-8")
        }
    },
    port,
    db,
};

module.exports = global;
