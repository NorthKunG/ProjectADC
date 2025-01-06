// Require a fs
const fs = require('fs');

// Require a multer
const multer = require('multer');

// Require a path
const path = require('path');

// Require a product model
const Product = require('../models/productModel');

// Require a category model
const Category = require('../models/categoryModel');

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

// Search product
const searchProduct = async (req, res) => {
    try {
        const { name, category } = req.query;

        // Build query
        const query = {};

        if (name) {
            // Case-insensitive search
            query.name = { $regex: name, $options: 'i' };
        }

        // Check for category filter
        if (category) {
            // Find category ID from categories collection
            const categoryDoc = await Category.findOne({ name: { $regex: category, $options: 'i' } });
            if (!categoryDoc) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Category not found'
                });
            }
            query.category = categoryDoc._id;
        }

        // Fetch data from MongoDB with population
        const products = await Product.find(query).populate('category');

        return res.status(200).json({
            status: 'success',
            count: products.length,
            products
        });
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

// Get specs from category
const getSpecs = async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId);
        const categoryId = category._id.toString();
        switch (categoryId) {
            case '674d499e3d521dac72299519': {
                return res.json({
                    spec: [
                        { equipment: 'Equipment A' },
                        { equipment: 'Equipment B' },
                        { equipment: 'Equipment C' }
                    ]
                });

                // <input type="text" name="spec[i][equipment]" value={`spec[i][equipment]`} required /> ไม่สามารถแก้ไขได้
                // <input type="text" name="spec[i][name]" required />
            }

            case '674d49a33d521dac7229951b': {
                return res.json({
                    spec: [
                        { equipment: 'Equipment D' },
                        { equipment: 'Equipment E' },
                        { equipment: 'Equipment F' }
                    ]
                });
            }
        }
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
}

// Exports an api
module.exports = {
    getProducts,
    createProduct,
    getProductById,
    deleteProduct,
    updateProduct,
    searchProduct,
    getSpecs
}