exports.getNotifications = async function(req, res){
    try{
        
        const userId = req.user._id;

        const notifications = await Notification.find({ userId: userId});

        res.status(200).json(notifications);    
    }catch(err){
        res.status(500).json({Message : "internal server error", Error: err});
    }
}

exports.markAsRead = async (req, res, next) => {
    try {

        const userId = req.user._id; 

        //mark as read
        await Notification.updateMany({ userId: userId }, { $set: { read: true } });
        
        res.status(200).json({ message: 'Notifications marked as read' });

    } catch (err) {
        
        console.log(err);
        res.status(500).json({ message: 'Internal server error', error: err });
    }
}