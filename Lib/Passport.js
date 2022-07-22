const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const jwt = require('jsonwebtoken');

const crypt = require('./Helpers');
const User = require('../Model/Querys/UserQ');

const tokensecret = 'conecta-podcast-cna-unicef-jda-halm';

passport.use('local.login', new localStrategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, user, password, done) => {
    const usr = await User.existUser(user);
    if (usr) {
        const match = await crypt.matchPassword(password, usr.password);
        if (match) {
            const token = jwt.sign({ user: usr }, tokensecret, { expiresIn: '1h' });
            return done(null, token, { message: 'Welcome' });
        } else {
            return done(null, false, { message: 'Wrong password. or username' });
        }
    } else {
        return done(null, false, { message: 'Wrong password or username.' });
    }
}));

passport.serializeUser((usr, done) => {
    return done(null, usr);
})


passport.deserializeUser(async (usr, done) => {  
    const {user} = await crypt.getUser(usr);  
    const usri = await User.existIdUser(user.id);
    const token = jwt.sign({ user: usri }, tokensecret, { expiresIn: '1h' });
    return done(null, usr);
})