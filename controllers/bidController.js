exports.getAllBidsForItemsWithItemId =  async function(req, res){

    try{
        
        const itemId = req.params.itemId;

        // Validate itemId format
        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(400).json({ message: "Invalid item ID format" });
        }


        //find items by id to ensure it exists
        const item = await Item.findById(itemId);

        if(!item){
            return res.status(404).json({ message : "Item not found"});
        }
        
        const bids = await Bid.find({ itemId: itemId });

        // res.render("bids", { bids });

        res.status(200).json(bids);

        }
    catch(err){
        console.log(err);
        res.status(500).json({ message : "Internal Server Error", error: err });
    }
    
}

exports.postBid =  async function(req, res, next){

    try{
        const itemId = req.params.itemId;
        const { bid_amount } = req.body;
        const userId = req.user._id;

        const item = await Item.findById(itemId);
        if(!item){
            return res.status(404).json({ message : "Item not found"});
        }

        //checking if thee bid amount is higher than the current price
        if(bid_amount <= item.current_price){
            return res.status(400).json({ message : "bid amount must be greater than current price"});
        }

        //create a new bid
        const bid = new Bid({
            itemId: itemId,
            userId: userId,
            bid_amount: bid_amount  
        })

        //save the bid
        await bid.save();

        //update the item's current price
        item.current_price = bid_amount;
        await item.save();

        res.status(201).json({ message : "bid placed successfully", bid});

    }
    catch(err){
        console.log(err);
        res.status(500).json({ message : "Internal Server Error", error: err });
    }
    
}