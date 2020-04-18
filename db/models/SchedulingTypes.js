const db = require('../connector');
const SchedulingTypes = db.sequelize.define('SchedulingTypes', {
    name:{
        type: db.Sequelize.STRING,
        unique:{
            args : true,
            message : "name is unique"
        }
    },
    status:{
        type: db.Sequelize.INTEGER,
        defaultValue:0
    },
    archive:{
        type: db.Sequelize.INTEGER,
        defaultValue: 0
    }
});

module.exports = SchedulingTypes;
