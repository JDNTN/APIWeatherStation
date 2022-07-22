//Express
const express = require('express');

//DB
const SensorQ = require('../Model/Querys/SensorQ');

const SensorController = {}

SensorController.addSensor = async (req, res) =>{
    let {name, station} = req.body;
    if(name && station){
        if(await SensorQ.createSensor(req)){
            res.status(200).json("exito");
        }else{
            res.status(500).json("error");
        }
    }else{
        res.status(400).json("faltan datos");
    }
}

SensorController.listAllStationSensor = async (req, res) =>{
   let { station } = req.body;
   if(station){
        let sensors = await SensorQ.allStationSensor(station)
        if(sensors){
            res.status(200).json(sensors);
        }else{
            res.status(400).json("error")
        }
    }else{
        res.status(400).json("faltan Datos");
    }
}

SensorController.listAllSensor = async (req, res) =>{
    res.status(200).json(await SensorQ.allSensor());
}

module.exports = SensorController;