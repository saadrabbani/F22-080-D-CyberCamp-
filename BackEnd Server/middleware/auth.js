const jwt = require('jsonwebtoken');
const config = require('../config/config');

const verifyToken = async (req, res, next) => {
    console.log(req.headers)
    const token = req.header('Authorization');
    if(!token) return res.status(401).json({message: 'Access Denied because no token provided'});

    try{
        const verified = await jwt.verify(token, config.secret_jwt);
        req.user = verified;
        console.log(req.user);
        return next();
    }
    catch(err){
        res.status(400).json({message: 'Invalid Token'});
    }
};

module.exports = verifyToken;