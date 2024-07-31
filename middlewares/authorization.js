const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function requireAuth(req, res, next) {
    const token = req.cookies["token"];
    
    if (!token) {
        if (req.path === '/' || req.path === '/user/login' || req.path === '/user/signup') {
            return next(); // Allowing access to home, login, and signup without authentication
        }
        else return res.redirect('/');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.redirect('/user/login'); 
        }

        req.user = user; 
        return next(); 
    } catch (error) {
        console.error(error);
        return res.redirect('/user/login'); 
    }
}

module.exports = {
    requireAuth
};
