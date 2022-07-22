const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Db');

//Creacion de modelo

const Sensor = sequelize.define('SENSOR',{    
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    station_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        foreingkey:true
    },
} , {
    sequelize,
    modelName: 'SENSOR',
    tableName: 'SENSOR',
    timestamps: false
});

module.exports = Sensor;