const express = require("express");
const router = express();
const Notification = require("../models/notificationModel");
const isLoggedIn = require("../middlewares/isLoggedIn");
const Message = require("tedious/lib/message");
const {verifyToken} = require("../services/jwt");
const notificationController = require("../controllers/notificationController");

router.get("/notifications", verifyToken,  notificationController.getNotifications )

router.post('/notifications/mark-read',verifyToken , isLoggedIn, notificationController.markAsRead );


module.exports = router;