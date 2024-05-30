const jwt = require('jsonwebtoken');
const secret = "prem098";

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send('Token is required');
    }

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid token');
        }
        req.user = decoded;
        next();
    });
};

module.exports =  verifyToken ;