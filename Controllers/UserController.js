//Express
const express = require('express');
//
const User = require('../Model/Querys/UserQ');
const crypt = require('../Lib/Helpers');
const helpers = require('../Lib/Helpers');
const jwt = require('jsonwebtoken');
const email = require('../Controllers/Email');
const AuthenticationEmail = require('../Model/Querys/AuthenticationEmailQ');
const RecoveryPassword = require('../Model/Querys/RecoveryPasswordQ');

const UserController = {};
const tokensecret = 'morazan-cunoc-usac-dntn';

UserController.createUserView = (req, res) => {
    res.status(200).json({ 'messege': 'Redirect to createUserView' });
}

UserController.updateUserView = (req, res) => {
    res.status(200).json({ 'messege': 'Redirect to updateUserView' });
}

UserController.list = async (req, res) => {
    const { user } = await helpers.getUser(req.user);
    if (user.type == 1) {
        res.status(200).json(await User.listUser());
    } else {
        res.status(403).json({ 'messege': 'Sin permisos' });
    }
}

UserController.profile = (req, res) => {
    res.status(200).json({ 'messege': 'Redirect to profile' });
}

UserController.createUser = async (req, res) => {
    const { user } = await helpers.getUser(req.user);
    if (user.type == 1) {
        const { name, email, password, username, type } = req.body
        if (name && email && password && username, type) {
            const usrname = await User.existUsername(req); //Search if exist username in db
            const usermail = await User.existEmail(req);  //Search if exist email in db
            if (usrname) {  //if username exist return error
                res.status(400).json({ 'messege': 'username exist' });
            } else if (usermail) {  //if usermail exist return error
                res.status(400).json({ 'messege': 'email have other account' });
            } else {
                const password = await crypt.encryptPassword(password); //Code the password
                const usr = await User.createUser(req, password); //Create user in db
                if (usr) { //If user create return sucessful messege
                    res.status(200).json({ 'messege': 'Sucessful' });
                } else { //if user dont be created return error
                    res.status(409).json({ 'messege': 'error' });
                }
            }
        } else {
            res.status(400).json({ 'messege': 'Es necesario llenar toda la informacion' });
        }
    } else {
        res.status(403).json({ 'messege': 'Sin permisos' });
    }
}

UserController.updateUser = async (req, res) => {
    const { user } = await helpers.getUser(req.user);
    if (user.type == 1 || user.id == req.body.id) {
        const usr = User.existUsername(req);
        if (usr) {
            if (req.body.email, req.body.lastname, req.body.name) {
                const usr = await User.updateUser(req);
                res.status(201).json({ 'messege': 'Sucessful' });
            } else {
                res.status(403).json({ 'Error': 'Faltan datos' });
            }
        } else {
            res.status(404).json({ 'messege': 'Usuario no existe' });
        }
    }
}

UserController.deleteUser = async (req, res) => {
    const { user } = await helpers.getUser(req.user);
    if (user.type == 1 || user.id == req.body.id) {
        const users = await User.existIdUser(req.body.id);
        if (users) {
            const usr = await User.deleteUser(req);
            if (usr) {
                if (user.id == req.body.id) {
                    req.logOut();
                }
                res.status(200).json({ 'messege': 'Sucessful' });
            } else {
                res.status(501).json({ 'messege': 'Error' });
            }
        } else {
            res.status(404).json({ 'messege': 'Usuario no existe' });
        }
    } else {
        res.status(301).json({ 'messege': 'Falta de permisos' });
    }
}

UserController.sendSetPassword = async (req, res) => {
    const { user } = req.body;
    if (user) {
        const userPass = await User.existUser(user);
        if (userPass) {
            const pinUser = helpers.createPin();
            const token = jwt.sign({ user: userPass, date: Date.now(), pin: pinUser }, tokensecret, { expiresIn: '30d' });
            const link = "http://localhost:3000/user/password/" + token;
            const db = await RecoveryPassword.SavePin(parseInt(pinUser), userPass.id);
            if (db) {
                await email.notificationNewPodcast(userPass.name, userPass.email, link);
                res.status(200).json({ 'messege': 'Sucessful' })
            } else {
                //error
            }
        } else {
            //No existe usuario
        }
    } else {
        //no agrego user
    }
}

UserController.setPassword = async (req, res) => {
    const { token } = req.params;
    const { pin, user } = await helpers.getUser(token);
    const { newPassword } = req.body
    if(token && pin && user && newPassword){
        if (await RecoveryPassword.searchPin(pin)) {
            const deleteUser = await RecoveryPassword.delete(pin);
            const password = await crypt.encryptPassword(newPassword.toString());
            const updateUser = await User.updatePassword(password, user.id);
            if (updateUser) {
                res.status(201).json({ 'messege': 'Sucessful' });
            } else {
                res.status(501).json({ 'messege': 'Error' })
            }
        }else{
            res.status(404).json({ 'messege': 'el enlace no existe' });
        }    
    }else{
        res.status(400).json({ 'messege': 'faltan datos' });
    }
}

UserController.updatePassword = async (req, res) => {
    const { user } = await helpers.getUser(req.user);

    const { newPassword, oldPassword } = req.body;
    if (newPassword != oldPassword) {
        if (helpers.matchPassword(oldPassword, user.password)) {
            const password = await crypt.encryptPassword(newPassword.toString());
            const updateUser = await User.updatePassword(password, user.id);

            if (updateUser) {
                res.status(201).json({ 'messege': 'Sucessful' });
            } else {
                res.status(501).json({ 'messege': 'Error' })
            }
        } else {
            //password incorrecta
        }
    } else {
        //newPassword y OldPassword son la misma
    }
}

module.exports = UserController;