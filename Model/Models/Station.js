const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Db');

//Creacion de modelo

const Station = sequelize.define('STATION',{    
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    location:{
       type:DataTypes.STRING,
       unique:false,
       allowNull:false 
    },
} , {
    sequelize,
    modelName: 'STATION',
    tableName: 'STATION',
    timestamps: false
});

module.exports = Station;