const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Db');

//Creacion de modelo

const Token = sequelize.define('Token',{
    pin:{
      type: DataTypes.INTEGER,
      allowNull:false  
    },    
    id_user:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
} , {
    sequelize,
    modelName: 'Token',
    tableName: 'Token',
    timestamps: false
});

module.exports = Token;