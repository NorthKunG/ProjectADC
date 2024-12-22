// Require a fs
const fs = require('fs');

// Require a multer
const multer = require('multer');

// Require a path
const path = require('path');

// Require a product model
const Product  = require('../models/productModel');

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Setting upload image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set folder for collect image
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Create unique filename using timestamp and random number
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

// Filter image file
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

// Create upload management
const upload = multer({
    storage,
    fileFilter
}).single('image');

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate('category')
            .populate('distributor')
            .sort('-createAt');
        return res.status(200).json({
            status: 'success',
            data: products
        });
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

// Create a new product
const createProduct = async (req, res) => {
    // Use multer for upload file
    upload(req, res, async (error) => {
        if (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message
            });
        }

        try {
            // Check upload file or not
            const fileName = req.file.filename

            // Create a new product
            const newProduct = await Product({
                ...req.body,
                image: fileName
            });
            const savedProduct = await newProduct.save();
            return res.status(201).json({
                status: 'success',
                message: 'Create a new product successfully!',
                data: savedProduct
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    });
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