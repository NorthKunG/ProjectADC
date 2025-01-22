// Require an order model
const Promotion = require('../models/promotionModel');

// Require a cart model
const Cart = require('../models/cartModel');

// ดึง Dependencies จาก package
const fs = require('fs');
const multer = require('multer');
const path = require('path');

// สร้าเส้นทางไปยังโฟลเดอร์ uploads
const uploadDir = path.join(__dirname, '..', 'uploads/promotion/');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// ตั้งค่าการอัพโหลดไฟล์สินค้า
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // กำหนดโฟลเดอร์ที่ใช้เก็บรูปสินค้า
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // สร้างชื่อไฟล์ที่ไม่ซ้ำกันโดยใช้ไทม์สแตมป์และตัวเลขสุ่ม
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

// กรองไฟล์ภาพ
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        // cb(new Error('อนุญาติให้ใช้งานเฉพาะไฟล์รูปภาพเท่านั้น!'), false);
        return res.status(400).json({ message: 'อนุญาตให้ใช้งานเฉพาะไฟล์รูปภาพเท่านั้น!' });
    }
};

// สร้างการจัดการการอัพโหลด
const upload = multer({
    storage,
    fileFilter
}).single('image');

// Create a new order
const addedPromotion = async (req, res) => {
    // ใช้งาน multer
    upload(req, res, async (error) => {
        if (error) {
            throw error;
            return res.status(404).json({ message: 'ระบบเกิดข้อผิดพลาด' });
        }

        // รับข้อมูลจาก request body
        const { name, price } = req.body;

        // ตรวจสอบว่ามีการใส่โปสเตอร์โปรโมชั่นหรือไม่
        if (!req.file) {
            return res.status(400).json({ message: 'กรุณาใส่โปสเตอร์ของโปรโมชั่นนี้' });
        }

        // รับข้อมูลจาก request file
        const poster = req.file.filename;

        try {
            // ดึงข้อมูลตะกร้าสินค้าจากฐานข้อมูล
            const cart = await Cart.findOne({ userId: req.userId }).populate('items.productId');
            if (!cart || cart.items.length === 0) {
                return res.status(400).json({ message: 'รถเข็นว่างเปล่า' });
            }

            // ตรวจสอบว่ามีการชื่อหรือไม่
            if (!name) {
                return res.status(400).json({ message: 'กรุณาระบุชื่อของโปรโมชั่นนี้' });
            }

            // ตรวจสอบว่ามีการใส่ราคาหรือไม่
            if (!price) {
                return res.status(400).json({ message: 'กรุณาระบุราคาของโปรโมชั่นนี้' });
            }

            // สร้างรายการโปรโมชั่นขาย
            const promotionItems = cart.items.map(item => ({
                productId: item.productId._id,
                quantity: item.quantity,
                price: item.productId.price
            }));

            // เพิ่มรายการโปรโมชั่นขาย
            const addedPromotion = new Promotion({
                name: name,
                items: promotionItems,
                price: price,
                poster: poster
            });

            // บันทึกโปรโมชั่น
            await addedPromotion.save();

            // Remove user cart
            await Cart.findOneAndDelete({ userId: req.userId });

            return res.status(200).json({
                message: 'สร้างโปรโมชั่นสำเร็จ',
                addedPromotion
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    });
};

// Get an order
const getPromotions = async (req, res) => {
    try {
        const promotions = await Promotion.find().populate('items.productId');
        return res.status(200).json({
            promotions
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
        return;
    }
};

module.exports = {
    addedPromotion,
    getPromotions
}