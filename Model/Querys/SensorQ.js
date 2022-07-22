//Modelo de la DB
const Sensor = require('../Models/Sensor');
const { Op } = require('sequelize');

const SensorQ = {};

SensorQ.createSensor = async(req) => {
    return await Sensor.create({
        name: req.body.name,
        station_id: req.body.station
    });
}

SensorQ.allSensor = async () => {
    return await Sensor.findAll();
}

SensorQ.allStationSensor = async (station) =>{
    return await Sensor.findAll({
        where:{
            station_id: station
        }
    })
}

module.exports = SensorQ