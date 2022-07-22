const express = require('express');
const Routes = express.Router();

const { isNotLoggedIn } = require('../Lib/auth');
const sensorController = require('../Controllers/SensorController');

//Views
Routes.get('/sensor', isNotLoggedIn, sensorController.listAllSensor);
Routes.get('/stationSensors', isNotLoggedIn, sensorController.listAllStationSensor)

//Actions
Routes.post('/sensor', isNotLoggedIn, sensorController.addSensor);

module.exports = Routes;