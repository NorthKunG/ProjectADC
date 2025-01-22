// Require an order model
const Promotion = require('../models/promotionModel');

// Require a cart model
const Cart = require('../models/cartModel');

// Require a product model
const Product = require('../models/productModel');

// Create a new order
const addedPromotion = async (req, res) => {
    // รับข้อมูลข้อมูลจาก request body
    const { name, price } = req.body;

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
            price: price
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