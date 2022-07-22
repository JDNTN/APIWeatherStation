const express = require('express');
const Routes = express.Router();

const { isNotLoggedIn } = require('../Lib/auth');
const dataController = require('../Controllers/DataController');

//Views
Routes.get('/data', isNotLoggedIn, dataController.getAllData);
Routes.get('/dataStation', isNotLoggedIn, dataController.getStationData);
Routes.get('/dataSensor', isNotLoggedIn, dataController.getSensorData);
Routes.get('/zona',isNotLoggedIn, dataController.zona);

//Actions
Routes.post('/data', isNotLoggedIn, dataController.saveData);

module.exports = Routes;