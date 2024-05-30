const User = require("../models/userModel")
const passport = require("passport");

exports.registerUser =  async function (req, res, next) {
    // Handle validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
        // Register the user
        await User.register({ username, email }, password);
        res.status(201).json({ message: "user Registration successful" }); ; 

    } catch (error) {
        // Handle different error scenarios
        if (error.username === 'UsernameExistsError') {
            // existing userr
            return res.status(409).json({ message: 'User already exists with this username' });
            
        }
        else if (error.email === 'EmailAlreadyExistsError') {
            // existing email
            return res.status(409).json({ message: 'User already exists with this email' });
        } 
        else{
            console.error(error);
        res.status(500).json({ message: 'Registration failed. Please try again.' });
        }
    }
}

exports.loginUser = function(req, res, next) {
    // Handle validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    passport.authenticate("local", function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.status(401).json({ message: "Invalid credentials" }); }

        req.login(user, function(err) {
            if (err) { return next(err); }
            const token = generateToken(req.user);
            res.cookie("token", token, { httpOnly: true });
            res.status(200).json({ message: "Login successful" }); 
        });
    })(req, res, next);
}

exports.profile = function(req, res, next) { 
    try {
        // If the user is authenticated
        res.status(200).json({ message: "Profile rendered page successfully" }); ;
    } catch (error) {
        console.error(error);
        // Handle unexpected errors gracefully
        res.status(500).json({ message: 'An error occurred while loading the profile. Please try again.' });
    }
}