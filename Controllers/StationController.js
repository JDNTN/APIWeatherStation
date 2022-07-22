//Express
const express = require('express');

//DB
const StationQ = require('../Model/Querys/StationQ');

const StationController = {}

StationController.addStation = async (req, res) =>{
    let {name, location} = req.body;
    if(name && location){
        if(await StationQ.createStation(req)){
            res.status(200).json("exito");
        }else{
            res.status(500).json("error");
        }
    }else{
        res.status(400).json("faltan datos");
    }
}

StationController.listAllStation = async (req, res) =>{
   res.status(200).json(await StationQ.allStation()); 
}

StationController.listSensorStation = async (req,res)=>{
    res.json(await StationQ.allStationAndSensor());
}

module.exports = StationController;