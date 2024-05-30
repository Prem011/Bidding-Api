const mongoose = require("mongoose");
const {DB} = require("../config/dev.json");

const DB_URL = DB.URL;

mongoose.connect(DB_URL).then(function(){
  console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.log("Error connecting to MongoDB");
    console.log(err);
})