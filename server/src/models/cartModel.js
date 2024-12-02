// Require a mongoose
const mongoose = require('mongoose');

// Cart item schema
const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        default: 1
    }
});

// Cart schema
const cartSchema = mongoose.Schema({
    items: [cartItemSchema],
    totalPrice: {
        type: Number,
        default: 0
    }
});

// Export a model
module.exports = mongoose.Schema('Cart', cartSchema);