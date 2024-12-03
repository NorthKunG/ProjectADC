// Require an order model
const Order = require('../models/orderModel');

// Require a cart model
const Cart = require('../models/cartModel');

// Require a product model
const Product = require('../models/productModel');

// Create a new order
const newOrder = async (req, res) => {
    try {
        // Pull user cart data
        const cart = await Cart.findOne({ userId: req.userId }).populate('items.productId');
        if (!cart || cart.items.length === 0) {
            res.status(400).json({
                status: 'error',
                message: 'Cart is empty'
            });
            return;
        }

        // Create an order list
        const orderItems = cart.items.map(item => ({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price
        }));

        const newOrder = new Order({
            userId: req.userId,
            items: orderItems,
            totalPrice: cart.totalPrice
        });

        // Save an order
        await newOrder.save();

        // Remove user cart
        await Cart.findOneAndDelete({ userId: req.userId });

        res.status(200).json({
            status: 'success',
            message: 'Order created successfully',
            order: newOrder
        });
        return;
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
        return;
    }
};

// Get an order
const getOrder = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.userId }).populate('items.productId');
        res.status(200).json({
            status: 'success',
            order: orders
        });
        return;
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
        return;
    }
};

module.exports = {
    newOrder,
    getOrder
}