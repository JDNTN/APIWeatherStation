//Modelo de la DB
const Data = require('../Models/Data');
const { Op } = require('sequelize');

const DataQ = {};

DataQ.addData = async(req) => {
    return await Data.create({
        value: req.body.value,
        dateTime: Date.now(),
        sensor_id: req.body.sensor
    });
}

DataQ.listLastData = async (sensor) =>{
    return await Data.findOne({
        where:{
            sensor_id: sensor
        }
    });
}

DataQ.listAllData = async (sensor) => {
    return await Data.findAll();
}

module.exports = DataQ