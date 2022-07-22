//Modelo de la DB
const User = require('../Models/User');
const { Op } = require('sequelize');

const UserQ = {};

UserQ.createUser = async(req, pass) => {
    return await User.create({
        name: req.body.name,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: pass,
        type: req.body.type,
    });
}

UserQ.deleteUser = async (req, res) => {
    return await User.destroy({
        where: {
            id: req.body.id
        }
    });
}

UserQ.updateUser = async (req) => {
    return await User.update({
        name: req.body.name,
        lastname: req.body.lastname,        
        email: req.body.email,        
    }, {
        where: {
            username: req.body.username
        }
    });
}

UserQ.updatePassword = async (pass, user) => {
    return await User.update({
        password: pass,
    },{
        where:{
            id: user
        }
    });
}

UserQ.existUser = async (user) => {
    return await User.findOne({
        where: {
            [Op.or]: {
                username: user,
                email: user
            }
        }
    });
}

UserQ.existIdUser = async (userId) => {
    return await User.findOne({
        where: {
            id: userId
        }
    });
}

UserQ.existUsername = async (req) => {
    return await User.findOne({
        where: {
            username: req.body.username
        }
    })
}

UserQ.existEmail = async (req) => {
    return await User.findOne({
        where: {
            email: req.body.email
        }
    })
}

UserQ.listUser = async () => {
    return await User.findAll();
}

module.exports = UserQ