const db = require('../connector');
const Queues = db.sequelize.define('Queues', {
    sender : {
        type:db.Sequelize.STRING,
        allowNull:true,
        defaultValue:"UNKNOWN",
    },
    title : {
        type:db.Sequelize.STRING,
        allowNull:true,
        defaultValue:"Message",
    },
    recipients : {
        type:db.Sequelize.JSON,
        allowNull:true,
        defaultValue:"[{}]"
    },
    ip : {
        type:db.Sequelize.STRING,
        allowNull:false,
    },
    tz : {
        type:db.Sequelize.STRING,
        allowNull:false,
    },
    message:{
      type:db.Sequelize.TEXT,
      allowNull:false,
    },
    keyStorage:{
        type:db.Sequelize.JSON,
        allowNull:true,
        defaultValue:"[{}]"
    },
    schedulingTypeId:{
        type:db.Sequelize.INTEGER,
        allowNull:false
    },
    deliveryDate : {
        type:db.Sequelize.DATE,
        allowNull:true,
        defaultValue:new Date(),
        set (valueToBeSet) {
            console.log(valueToBeSet)
            this.setDataValue('deliveryDate', new Date(valueToBeSet))
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

module.exports = Queues;
