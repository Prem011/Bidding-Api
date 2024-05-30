const express = require("express");
const router = express();
const Bid = require("../models/bidModel");
const Item = require("../models/itemsModel");
const User = require("../models/userModel");
const passport = require("passport");
const LocalStrategy = require("passport-local");
passport.use(new LocalStrategy(User.authenticate()));
const isLoggedIn = require("../middlewares/isLoggedIn")
const {verifyToken} = require("../services/jwt");
const bidController = require("../controllers/bidController");


router.get("/items/:itemId/bids", isLoggedIn ,verifyToken, bidController.getAllBidsForItemsWithItemId);

router.post("/items/:itemId/bids", isLoggedIn, verifyToken, bidController.postBid);



module.exports = router;