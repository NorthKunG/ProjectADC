// Require a mongoose
const mongoose = require('mongoose');

// Require a category model
const { validate } = require('./categoryModel');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required.'],
        tirm: true
    },
    price: {
        type: Number,
        required: [true, 'Product price is required.'],
        min: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Product category is required.'],
        ref: 'Category'
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Product subcategory is required.'],
        ref: 'Subcategory',
        validate: {
            validator: async function (subcategoryId) {
                const subcategory = await mongoose.model('Subcategory').findById(subcategoryId);
                const validCategory = subcategory && subcategory.category.toString() === this.category.toString();
                return validCategory;
            },
            message: 'Subcategory does not belong to the selected Category'
        }
    },
    features: [{
        name: {
            type: String,
            required: [true, 'Feature name is required.'],
            trim: true
        },
        description: {
            type: String,
            required: [true, 'Feature descrition is required.'],
            tirm: true
        }
    }],
    image: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('Product', productSchema);