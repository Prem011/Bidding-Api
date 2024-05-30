const express =  require('express');
const socket = require('socket.io');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');

var createError = require('http-errors');
var cookieParser = require('cookie-parser');

var usersRouter = require('./routes/users');
var bidsRouter = require('./routes/bid');
var itemsRouter = require('./routes/item');
var notificationsRouter = require('./routes/notification');
const passport = require('passport');
const session = require('express-session');
const user = require("./models/userModel");
const {PORT} = require("./config/dev.json")
// dotenv.config();

const app = express();


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

// db 
const db = require("./models/connect")

app.use(
session({
    saveUninitialized: true,
    resave: true,
    secret: "asdhbcfkjf",
})
);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

const server = http.createServer(app);
const io = socket(server);

io.on("connection", function(uniquesocket){
    console.log("Connected to socket.io server");

    //handle bidding events
    uniquesocket.on("bid", (data)=> {
        console.log("Received Bid", data);

        uniquesocket.broadcast.emit("bid", data);

        io.emit("update", {itemId : data.item_id, bidAmount: data.bid_amount})

        uniquesocket.io("notify", (data) => {
            io.to(data.user_id).emit("notification", {message : data.message})
        });
    })



    uniquesocket.on("disconnect", function(){
        console.log("Disconnected from socket.io server");
    })
})

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // For parsing application/json

app.use('/', usersRouter);
app.use('/', bidsRouter);
app.use("/", itemsRouter);
app.use("/", notificationsRouter)


app.listen( PORT, function(){
    console.log(`Server is running on port ${PORT}`);
});

module.exports =  app;