// ✅ 1. เรียกใช้ mongoose
const mongoose = require('mongoose');

// ✅ 2. สร้าง Schema สำหรับสินค้าในโปรโมชั่น
const promotionItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NewProduct',  // ✅ ต้องตรงกับโมเดล newProductModel.js
        required: [true, 'Product ID is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1'],  // ✅ เพิ่ม validation กันจำนวนติดลบ
    },
});

// ✅ 3. สร้าง Schema หลักสำหรับโปรโมชั่น
const promotionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Promotion name is required'],
        trim: true,
    },
    items: {
        type: [promotionItemSchema],  // ✅ เชื่อมกับ promotionItemSchema
        validate: [array => array.length > 0, 'Promotion must have at least one item'],
    },
    price: {
        type: Number,
        required: [true, 'Total Price is required'],
        min: [0, 'Price must be at least 0'],  // ✅ กันราคาติดลบ
    },
    description: {
        type: String,
        trim: true,
    },
    poster: {
        type: String,
        required: [true, 'Promotion poster is required.'],
    },
}, { timestamps: true });  // ✅ เพิ่ม timestamps (createdAt, updatedAt)

// ✅ 4. ส่งออกโมเดลโปรโมชั่น
module.exports = mongoose.model('Promotion', promotionSchema);  // ✅ ใช้ชื่อขึ้นต้นตัวใหญ่ตาม convention
