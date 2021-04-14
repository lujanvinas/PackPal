const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // get token from the header
    const token = req.header('x-auth-token');

    // check if NOT token
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        //token payload will be stored in decoded var
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' })
        
    }
}