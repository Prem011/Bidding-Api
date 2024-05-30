const jwt = require('jsonwebtoken');
const {JWT} = require('../config/dev.json');
const user = require('../models/userModel'); 

const SECRET_KEY = JWT.SECRET_KEY;

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign({
     id: user.id, username: user.username, role : user.role
     }, SECRET_KEY, 
     { expiresIn: '1h' });
};

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['cookie'];
  if (!token) return res.status(403).send('Token is required');

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).send('Invalid token');
    req.user = decoded;
    next();
  });
};

module.exports =  {generateToken, verifyToken};