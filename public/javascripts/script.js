const socket = io();

//handle connection
socket.on('connection', function(){
  console.log("Connected to socket.io server");
});

//handle bidding event
function placeBid(item_id, bid_amount){
    socket.emit("bid", {itemId: item_id, bidAmount: bid_amount});
}

//update - Notify all connected clients about a new bid on an item
socket.on("update", (data) => {
    console.log("New bid received : ", data);
})

//function to send notification/notify - Send notifications to users in real-time
function sendNotification(user_id, message) {
    socket.emit("notify", {user_id: user_id, message: message});
}

//handle the notification event to receive notifications
socket.on("notify", (data) => {
    console.log("New notification received : ", data);
})

// alert("hey");