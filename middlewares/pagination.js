const Item = require('../models/itemsModel');

async function paginateItems(page, limit) {
  try {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await Item.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      };
    }

    results.results = await Item.find().skip(startIndex).limit(limit).exec();

    return results;
  } catch (error) {
    throw new Error('Pagination error: ' + error.message);
  }
}

module.exports = paginateItems;
