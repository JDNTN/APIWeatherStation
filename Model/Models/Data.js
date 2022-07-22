const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Db');

//Creacion de modelo

const Data = sequelize.define('DATA',{    
    value:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    dateTime:{        
        allowNull:false,
        type: DataTypes.DATE
    },
    sensor_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        foreingkey:true
    }
} , {
    sequelize,
    modelName: 'DATA',
    tableName: 'DATA',
    timestamps: false
});

module.exports = Data;