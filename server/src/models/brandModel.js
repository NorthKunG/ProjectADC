// ดึง Dependencies จาก package
const mongoose = require('mongoose');

// Schema brand
const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Brand name is required.'],
        unique: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export a model
module.exports = mongoose.model('Brand', brandSchema);