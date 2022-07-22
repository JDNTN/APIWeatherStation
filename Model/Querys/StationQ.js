//Modelo de la DB
const Station = require('../Models/Station');
const Sensor = require('../Models/Sensor');
const { Op } = require('sequelize');

const StationQ = {};

StationQ.createStation = async(req) => {
    return await Station.create({
        name: req.body.name,
        location: req.body.location
    });
}

StationQ.allStation = async() =>{
    return await Station.findAll();
}

StationQ.allStationAndSensor = async () =>{
    return await Station.findAll({
        include:[Sensor]
    });
}


module.exports = StationQ