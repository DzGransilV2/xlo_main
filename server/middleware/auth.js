const Jwt = require('jsonwebtoken');
const { JWT_KEY_SECRET } = require('../config/config');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // console.log('Received Authorization header:', authHeader); // Log the header
    if (!authHeader) {
        // console.error('Authorization header missing');
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    // another method 
    // let token = authHeader.startsWith('Bearer ') ? authHeader.split(' ') : authHeader;
    // token = token[1];
    // console.log('Token extracted:', token); // Log the token

    Jwt.verify(token, JWT_KEY_SECRET, (err, user) => {
        if (err) {
            // console.error('Token verification failed:', err.message);
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};


module.exports = authenticateToken;
