const AuthenticationEmail = require('../Models/Token');
const { Op } = require('sequelize');

const authenticationEmail = {};

authenticationEmail.SavePin = async (pin, user) => {
    return await AuthenticationEmail.create({
        pin: pin,
        id_user: user
    });
}

authenticationEmail.searchPin = async (pin) =>{
    return await AuthenticationEmail.findOne({
        where:{
            pin: pin
        }
    });
}

authenticationEmail.userHavePin = async (user) =>{
    return await AuthenticationEmail.findOne({
        where:{
            id_user: user
        }
    });
}

authenticationEmail.delete = async (pin) =>{
    return await AuthenticationEmail.destroy({
        where:{
            pin: pin
        }
    })
}

module.exports = authenticationEmail;