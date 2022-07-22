const express = require('express');
const Routes = express.Router();

const { isNotLoggedIn } = require('../Lib/auth');
const stationController = require('../Controllers/StationController');

//Views
Routes.get('/station', isNotLoggedIn, stationController.listAllStation);
Routes.get('/allSensorStation', isNotLoggedIn, stationController.listSensorStation)
//Routes.get('/signup', isNotLoggedIn, loggerController.signUpView);

//Actions
Routes.post('/station', isNotLoggedIn, stationController.addStation);

module.exports = Routes;