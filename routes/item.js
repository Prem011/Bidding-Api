const express = require("express");
const router = express();
const Item = require("../models/itemsModel");
const User = require("../models/userModel");
const passport = require("passport");
const upload = require("../services/multer")
const LocalStrategy = require("passport-local");
passport.use(new LocalStrategy(User.authenticate()));
const isAdmin = require("../middlewares/isAdmin");
const isLoggedIn = require("../middlewares/isLoggedIn");
const {verifyToken} = require("../services/jwt");
const paginateItems = require("../middlewares/pagination");
const { check, validationResult } = require('express-validator');
const itemController = require("../controllers/itemController")


router.get("/items", verifyToken, itemController.getAllItems);

router.get("/items/:id", verifyToken, itemController.getItemById);


router.post("/items", [
    isLoggedIn,
    verifyToken,
    upload.single("image_url"),
    // Validation middleware
    check('name').notEmpty().withMessage('Name is required'),
    check('description').notEmpty().withMessage('Description is required'),
    check('starting_price').isFloat({ min: 0 }).withMessage('Starting price must be a positive number'),
    check('current_price').isFloat({ min: 0 }).withMessage('Current price must be a positive number'),
    check('end_time').isISO8601().withMessage('End time must be a valid date')
], itemController.createItems );

router.put("/items/:id", [
    isLoggedIn,
    isAdmin,
    // Validation middleware
    check('name').optional().isString().withMessage('Name must be a string'),
    check('description').optional().isString().withMessage('Description must be a string'),
    check('starting_price').optional().isFloat({ min: 0 }).withMessage('Starting price must be a positive number'),
    check('current_price').optional().isFloat({ min: 0 }).withMessage('Current price must be a positive number'),
    check('end_time').optional().isISO8601().withMessage('End time must be a valid date')
], itemController.updateItems );

router.delete("/items/:id", isLoggedIn, isAdmin, itemController.deleteItems);

module.exports = router;