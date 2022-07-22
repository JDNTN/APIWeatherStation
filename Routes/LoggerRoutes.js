const express = require('express');
const Routes = express.Router();

const { isNotLoggedIn } = require('../Lib/auth');
const loggerController = require('../Controllers/LoggerController');

//Views
Routes.get('/login', isNotLoggedIn, loggerController.loginView);
//Routes.get('/signup', isNotLoggedIn, loggerController.signUpView);

//Actions
Routes.post('/login', isNotLoggedIn, loggerController.login);
//Routes.put('/category/update', isLoggedIn, CategoryController.updateCategory);
//Routes.delete('/category', isLoggedIn, CategoryController.deleteCategory);

module.exports = Routes;