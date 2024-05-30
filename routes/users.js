const express = require("express");
const router = express();
const User = require("../models/userModel");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const isLoggedIn = require("../middlewares/isLoggedIn");
const {generateToken} = require("../services/jwt");
const jwt = require('jsonwebtoken');
const {verifyToken} = require("../services/jwt");
const { check, validationResult } = require('express-validator');
const userController = require("../controllers/userController")

passport.use(new LocalStrategy(User.authenticate()));


router.post("/users/register", [
    // Validation middleware
    check('username').notEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Valid email is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.registerUser);


router.post("/users/login", [
    // Validation middleware
    check('username').notEmpty().withMessage('Username is required'),
    check('password').notEmpty().withMessage('Password is required')
], userController.loginUser );


router.get('/users/profile', isLoggedIn, userController.profile );

module.exports = router;