// Require a mongoose
const mongoose = require('mongoose');

// Order item schema
const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product ID is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    }
});

// Order schema
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    items: [orderItemSchema],
    totalPrice: {
        type: Number,
        required: [true, 'Total Price is required']
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered'],
        default: 'Pending'
    }
});

// Export a model
module.exports = mongoose.model('Order', orderSchema);