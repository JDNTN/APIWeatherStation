module.exports = {

    isLoggedIn(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        return res.status(401).redirect('/login');
    },

    isNotLoggedIn(req,res,next){
        if(!req.isAuthenticated()){
            return next();
        }
        return res.status(400).redirect('/profile');
    }
}