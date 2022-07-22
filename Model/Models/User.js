const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Db');

//Creacion de modelo

const User = sequelize.define('USER',{    
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    username:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    email:{
       type:DataTypes.STRING,
       unique:true,
       allowNull:false 
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
} , {
    sequelize,
    modelName: 'USER',
    tableName: 'USER',
    timestamps: false
});

module.exports = User;