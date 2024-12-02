// Require a product model
const Product  = require('../models/productModel');

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate('category')
            .sort('-createAt');
        res.status(200).json({
            status: 'success',
            data: products
        });
        return;
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
        return;
    }
};

// Create a new product
const createProduct = async (req, res) => {
    try {
        const { name, price, category } = req.body;
        const createProduct = await Product.create({ name, price, category });
        res.status(200).json({
            status: 'success',
            message: 'Create a new product successfully!',
            data: createProduct
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

// Get a product by id
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: product
        });
        return;
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
        return
    }
};

// Delete a product by id
const deleteProduct = async (req, res) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'success',
            message: 'Delete a product successfully',
            data: deleteProduct
        });
        return;
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
        return;
    }
};

// Update a product by id
const updateProduct = async (req, res) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({
            status: 'success',
            message: 'Update a product successfully'
        });
        return;
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
        return;
    }
};

// Exports an api
module.exports = {
    getProducts,
    createProduct,
    getProductById,
    deleteProduct,
    updateProduct
}