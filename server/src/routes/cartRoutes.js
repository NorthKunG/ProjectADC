// ✅ นำเข้า Express
const express = require('express');

// ✅ ดึง Router จาก Express
const router = express.Router();
    
// ✅ นำเข้า Middleware `auth`
const { auth } = require('../middleware/auth');

// ✅ นำเข้า Controller ของ Cart
const cartController = require('../controllers/cartController');

// ✅ Routes ที่ถูกต้อง
router.post('/', auth, cartController.addItem); // ✅ เพิ่มสินค้าเข้า Cart
router.get('/', auth, cartController.getCartById); // ✅ ดึงข้อมูล Cart
router.delete('/removeItem', auth, cartController.removeFromCart); // ✅ ลบสินค้าต้องใช้ `/removeItem`
router.put('/', auth, cartController.updateCart); // ✅ เพิ่ม `auth` เพื่อป้องกันแก้ตะกร้าคนอื่น

// ✅ Export Routes
module.exports = router;
