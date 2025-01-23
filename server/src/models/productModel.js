// Require a mongoose
const mongoose = require('mongoose');

// Require a category model
const { validate } = require('./categoryModel');

const productSchema = new mongoose.Schema({
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Product brand is required.'],
        ref: 'Brand'
    },
    productId: {
        type: String,
        required: [true, 'Product Id is required.'],
        trim: true
    },
    name: {
        type: String,
        required: [true, 'Product name is required.'],
        trim: true
    },
    ict: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        required: false,
        min: 0,
        default: null
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Product category is required.'],
        ref: 'Category'
    },
    // subcategory: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: [true, 'Product subcategory is required.'],
    //     ref: 'Subcategory',
    //     validate: {
    //         validator: async function (subcategoryId) {
    //             const subcategory = await mongoose.model('Subcategory').findById(subcategoryId);
    //             const validCategory = subcategory && subcategory.category.toString() === this.category.toString();
    //             return validCategory;
    //         },
    //         message: 'Subcategory does not belong to the selected Category'
    //     }
    // },
    // distributor: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: [true, 'Product distributor is required.'],
    //     ref: 'Distributor'
    // },
    features: [{
        name: {
            type: String,
            required: [true, 'Feature name is required.'],
            trim: true
        },
        description: {
            type: String,
            required: [true, 'Feature descrition is required.'],
            trim: true
        }
    }],
    images: [{
        fileName: {
            type: String,
            trim: true
        }
    }]
});

module.exports = mongoose.model('Product', productSchema);