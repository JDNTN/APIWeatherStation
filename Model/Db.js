const { Sequelize } = require('sequelize');
const { database } = require('../Configurations/config');
const sequelize = new Sequelize(

    database.database,
    database.username,
    database.password, {
    host: database.host,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // <<<<<<< YOU NEED THIS
        }
    },
    port: 5432,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

module.exports = sequelize;