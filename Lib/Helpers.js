const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const helpers = {};
const tokensecret = 'conecta-podcast-cna-unicef-jda-halm';
const MAX_TOKEN_VAL = 999999;
const TOKEN_SIZE = 6;

helpers.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password,salt);
    return newPassword;
}

helpers.matchPassword = async (password, dataPassword) =>{
    try{
        return await bcrypt.compare(password, dataPassword);
    }catch(e){
        console.log(e);
    }
}

helpers.getUser = async (token) =>{
    return jwt.verify(token, tokensecret, async function (err, decoded) {
        if (err){
            console.log(err);
            return null;
        }else{            
            return decoded;
        }
    });    
}

helpers.createPin = () =>{
    let pin = Math.floor(Math.random() * MAX_TOKEN_VAL).toString();
    while(pin.length < TOKEN_SIZE){
        pin = '0' + pin;
    }
    return pin;
}

module.exports = helpers;