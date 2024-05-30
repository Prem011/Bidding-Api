const Item = require("../models/itemsModel");
const User = require("../models/userModel");
const paginateItems = require("../middlewares/pagination");

exports.getAllItems =  async function (req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const searchQuery = req.query.q || ''; // Search query
        const status = req.query.status || ''; // Status filter (e.g., active, ended)

        if (page < 1 || limit < 1) {
            return res.status(400).json({ message: 'Page and limit must be positive integers' });
        }

        // Construct query based on search and status parameters
        const query = {};
        if (searchQuery) {
            query.$or = [
                { name: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search by name
                { description: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search by description
            ];
        }
        if (status) {
            query.status = status;
        }

        // Paginate items based on query
        const paginate = await paginateItems(page, limit, query);

        res.status(200).json({ message: 'Retrieve auction items with pagination', items: paginate.results, pagination: paginate });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', error: err });
    }
}

exports.getItemById =  async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Ensure pagination parameters are positive integers
        if (page < 1 || limit < 1) {
            return res.status(400).json({ message: 'Page and limit must be positive integers' });
        }

        const paginate = await paginateItems(page, limit);

        res.status(200).json({ message: " Retrieve a single auction item by ID successfully. " }); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', error: err });
    }
}

exports.createItems = async function(req, res) {
    // Handle validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const item = new Item({
            name: req.body.name,
            description: req.body.description,
            starting_price: req.body.starting_price,
            current_price: req.body.current_price,
            image_url: req.file.filename,
            end_time: req.body.end_time
        });

        await item.save();
        res.status(201).json({ message: 'Item successfully created', item: item });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', error: err });
    }
}

exports.updateItems = async function(req, res, next) {
    // Handle validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Update item fields
        item.name = req.body.name || item.name;
        item.description = req.body.description || item.description;
        item.starting_price = req.body.starting_price || item.starting_price;
        item.current_price = req.body.current_price || item.current_price;
        item.end_time = req.body.end_time || item.end_time;

        await item.save();
        res.status(200).json({ message: 'Item successfully updated', item: item });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', error: err });
    }
}

exports.deleteItems =  async function(req, res, next) {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Item successfully deleted', item: item });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', error: err });
    }
}