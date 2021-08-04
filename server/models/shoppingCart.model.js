const mongoose = require('mongoose');

const ShoppingCartSchema = new mongoose.Schema({
    user_id: String,
    list_products: [{}],
    status: String,
    qty: Number,
    total: Number,
    user_details: {
        username: String,
        email: String,
        address: String,
        cellphone: String
    }
},
{timestamps: true}
);

const ShoppingCart = mongoose.model('ShoppingCart', ShoppingCartSchema);

module.exports = ShoppingCart;