// Require a category model
const Category = require('../models/categoryModel');

// Get all category
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            status: 'success',
            data: categories
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

// Create a new category
const createCategory = async (req, res) => {
    try {
        const createCategory = await Category.create(req.body);
        res.status(200).json({
            status: 'success',
            message: 'Create a new category successfully'
        });
        return;
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        })
    }
};

// Get a category by id
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: category
        });
        return;
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

// Delete a category by id
const deleteCategory = async (req, res) => {
    try {
        const deleteCategory = await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'success',
            message: 'Delete a category successfully',
            data: deleteCategory
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

// Update a category by id
const updateCategory = async (req, res) => {
    try {
        const updateCategory = await Category.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({
            status: 'success',
            message: 'Update a category successfully',
            data: updateCategory
        });
        return;
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

// Export an api
module.exports = {
    getCategories,
    createCategory,
    getCategoryById,
    deleteCategory,
    updateCategory
}