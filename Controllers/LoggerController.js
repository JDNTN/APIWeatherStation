const express = require('express');
const passport = require('passport');

const LoggerController = {};

//Sign up
LoggerController.signUpView = (req, res) => {
    res.json({ 'Messege': 'Redirect to signup view' });
}

LoggerController.signup = (req, res, next) => {
    // console.log(req.body);
    passport.authenticate('local.signup', function (err, user, info) {
        if (err) { return res.status(501).json(err); }        
        if (!user) { return res.status(501).json(info); }
        req.logIn(user, function (err) {
            if (err) { return res.status(501).json(err); }            
            return res.status(200).json({ message: 'SE REGISTRO' });
        });
    })(req, res, next);
}

//Login
LoggerController.loginView = (req, res) => {
    res.json({ 'Messege': 'Redirect to login view' });
}

LoggerController.login = (req, res, next) => {    
    passport.authenticate('local.login', function (err, user, info) {
        if (err) { return res.status(409).json(err); }           
        if (!user) { return res.status(400).json(info); }
        req.logIn(user, function (err) {
            if (err) { return res.status(501).json(err); }             
            return res.status(200).json({ message: 'SE LOGUEO' });
        });
    })(req, res, next);
}

LoggerController.logout = (req, res) =>{
    req.logOut();
    res.status(300).redirect('/login');
}

module.exports = LoggerController;