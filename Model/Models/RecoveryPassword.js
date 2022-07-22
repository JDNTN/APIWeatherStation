const { Model, DataTypes } = require('sequelize');
const sequelize = require('../Db');

//Creacion de modelo

const RecoveryPassword = sequelize.define('RECOVERY_PASSWORD',{
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
    modelName: 'RECOVERY_PASSWORD',
    tableName: 'RECOVERY_PASSWORD',
    timestamps: false
});

module.exports = RecoveryPassword;