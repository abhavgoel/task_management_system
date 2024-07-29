const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

async function checkAuthorization (req, res, next) {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // Check cookie or Authorization header
    console.log(token);

    if (!token) {
        return res.status(401).json({ msg: 'No token provided, authorization denied.' });
    }
    try {
n
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(401).json({ msg: 'User not found.' });
        }

        req.user = user; 
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ msg: 'Token is not valid.' });
    }
};

module.exports = checkAuthorization;
