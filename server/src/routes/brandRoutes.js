// ดึงตัวควบคุม Brand จากไฟล์ brandController.js
const brandController = require('../controllers/brandController');

// ดึง Dependencies จาก package
const express = require('express');
const router = express.Router();

// เชื่อมต่อเส้นทาง (Path) กับ ตัวควบคุม (Controller)
router.post('/uploadFile', brandController.uploadFile);
router.get('/', brandController.getBrands);

// ส่งออก Module
module.exports = router;