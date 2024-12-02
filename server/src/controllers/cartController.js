// Require a cart model
const Cart = require('../models/cartModel');

// Require a product model
const Product = require('../models/productModel');

// Get a cart by id
const getCartById = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.userId }).populate('items.productId');
        if (!cart || cart.items.length === 0) {
            res.status(404).json({
                status: 'error',
                message: 'Cart is empty'
            });
            return;
        }

        res.status(200).json({
            status: 'success',
            cart,
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

// Add an item to a cart
const addItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const product = await Product.findById(productId);

        // Check product in stock
        if (!product || product.inStock === false) {
            res.status(400).json({
                status: 'error',
                message: 'Product not available or insufficient stock'
            });
            return;
        }

        // Find a cart by user id
        let cart = await Cart.findOne({ userId: req.userId });
        if (!cart) cart = new Cart({ userId: req.userId });

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        cart.totalPrice += product.price * quantity;
        await cart.save();

        res.status(200).json({
            status: 'success',
            message: 'Product added to cart', cart
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Remove an item from cart
const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;

        // Check product id in request body
        if (!productId) {
            res.status(400).json({
                status: 'error',
                message: 'Product ID is required'
            });
            return;
        }

        // Find user cart
        const cart = await Cart.findOne({ userId: req.userId }).populate('items.productId', 'price');
        if (!cart) {
            res.status(404).json({
                status: 'error',
                message: 'Cart not found'
            });
            return;
        }

        // Remove product from items by filter
        const updatedItems = cart.items.filter(item => item.productId._id.toString() !== productId);

        // Product list
        cart.items = updatedItems;

        // Calculate total price
        cart.totalPrice = cart.items.reduce((total, item) => {
            return total + item.productId.price * item.quantity;
        }, 0);

        // Save updated
        await cart.save();

        res.status(200).json({
            status: 'success',
            message: 'Product removed from cart and total price updated',
            cart
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
        return;
    }
};

// Update quantity items and total price
const updateCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Check product id and quantity
        if (!productId || !quantity || quantity <= 0) {
            res.status(400).json({
                status: 'error',
                message: 'Product ID and quantity are required, and quantity must be greater than 0',
            });
            return;
        }

        // Find user cart
        const cart = await Cart.findOne({ userId: req.userId }).populate('items.productId', 'price');
        if (!cart) {
            res.status(404).json({
                status: 'error',
                message: 'Cart not found'
            });
            return;
        }

        // Find product in update cart
        const itemIndex = cart.items.findIndex(item => item.productId._id.toString() === productId);
        if (itemIndex === -1) {
            res.status(404).json({
                status: 'error',
                message: 'Product not found in cart'
            });
            return;
        }

        // Update product quantity
        cart.items[itemIndex].quantity = quantity;

        // Calculate total price
        cart.totalPrice = cart.items.reduce((total, item) => {
            return total + item.productId.price * item.quantity;
        }, 0);

        // Save updated
        await cart.save();

        res.status(200).json({
            status: 'success',
            message: 'Cart updated successfully',
            cart,
        });
        return
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
        return;
    }
};

// Export an api
module.exports = {
    addItem,
    getCartById,
    removeFromCart,
    updateCart
}