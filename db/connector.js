const config    = require("../config/global").db;
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.database, config.username, config.password, config);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit(1)
});
sequelize.sync();

let db = { sequelize: sequelize, Sequelize: Sequelize };
module.exports = db;
