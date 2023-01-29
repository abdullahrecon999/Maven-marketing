const User = require('../models/User');

const checkIsInRole = (role) => (req, res, next) => {
    console.log('checkIsInRole called');
    console.log('req.user', req.user);
    if (!req.user) {
        //return res.redirect(res.baseUrl+'/login')
        return res.status(401).send("User not Logged in")
    }

    //const hasRole = roles.find(role => req.user.role === role)
    console.log('req.user.role', req.user.role);
    const hasRole = role === req.user.role;
    console.log('hasRole', hasRole);
    console.log('roles', role);
    if (!hasRole) {
        //unauthorized code 401
        return res.status(401).send("Unauthorized")
        //return res.redirect('/login')
    }

    return next()
}

module.exports = { checkIsInRole };