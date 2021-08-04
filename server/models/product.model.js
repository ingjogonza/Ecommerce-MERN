const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'No puede enviar un producto sin titulo']
    },
    price: {
        type: Number,
        required: [true, 'No se puede crear un producto sin precio']
    },
    description: {
        type: String,
        required: [true, 'No puede enviar un producto descripcion']
    },
    image: {
        type: String,
        required: [true, 'No puede enviar un producto sin imagen']
    },
    onsale: {
        type: Boolean,
        default: true
    }    
},
{timestamps: true}
);

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;