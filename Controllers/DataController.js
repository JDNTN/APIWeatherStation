//Express
const express = require('express');

const DataQ = require('../Model/Querys/DataQ');
const SensorQ = require('../Model/Querys/SensorQ');

const DataController = {}

DataController.saveData = async (req, res) =>{
    let {value, dateTime, sensor} =  req.body;
    if(value && dateTime && sensor){
        if(await DataQ.addData(req)){            
            res.status(200).json("Exito");
        }else{
            res.status(500).json("Error")
        }
    }else{
        res.status(400).json("Faltan Datos");
    }
}

DataController.getAllData = async (req, res) =>{
    res.status(200).json(await DataQ.listAllData());
}

DataController.getSensorData = async (req, res) =>{
    let { sensor } = req.body;
    if(sensor){
        let data = await DataQ.listLastData(sensor);
        if(data){
            res.status(200).json(data);
        }else{
            res.status(500).json("Error");
        }
    }else{
        res.status(400).json("Faltan Datos");
    }
}

DataController.getStationData = async (req, res) =>{
    let { station } = req.body;
    if(station){
        let sensores = await SensorQ.allStationSensor(station);
        if(sensores){            
            let datum = await searchAllSensors(sensores);
            if(datum){
                res.status(200).json(datum);
            }else{
                res.status(500).json("Mal");
            }
        }else{
            res.status(500).json("Error");
        }
    }else{
        res.status(400).json("Faltan Datos");
    }
}

async function searchAllSensors(sensors){
    let datum = new Array();
    await sensors.forEach(async (sensor) => {
        let data = await DataQ.listLastData(sensor.id);                
        if(data){                    
            datum.push(data.dataValues);
            console.log(datum);
        }
    });
    return datum;
}

DataController.zona = async (req,res)=>{
    res.status(200).json(Date.now());
}

module.exports = DataController;