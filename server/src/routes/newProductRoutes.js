// ดึง Dependencies จาก package
const express = require('express');
const router = express.Router();

// ดึงตัวควบคุม newProductController จากไฟล์ newProductController.js
const newProductController = require('../controllers/newProductController');

// เรียกใช้งาน middleware
const { adminAuth } = require('../middleware/auth');

// เชื่อมต่อเส้นทาง (Path) กับ ตัวควบคุม (Controller)
router.get('/', newProductController.getProducts);
router.post('/', adminAuth, newProductController.addProduct);
router.get('/:id', newProductController.getProduct);
router.delete('/:id', adminAuth, newProductController.deleteProduct);
router.put('/:id', adminAuth, newProductController.updateProduct);
router.post('/uploadFile', adminAuth, newProductController.uploadFile);

// ส่งออก Module
module.exports = router;