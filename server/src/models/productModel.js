const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Category is required'],
        ref: 'Category'
    },
    distributor: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Distributor is required'],
        ref: 'Distributor'
    },
    image: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);