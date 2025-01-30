// ดึง Dependencies จาก package
const express = require('express');
const router = express.Router();

// ดึง Middleware จาก โฟลเดอร์ middleware
const cache = require('../middleware/cache');
const auth = require('../middleware/auth');

// กำหนดตัวแปร
const authAdmin = auth.adminAuth;

// ดึงตัวควบคุม CSCode จาก ไฟล์ cscodeController.js
const cscodeController = require('../controllers/cscodeController');

// เชื่อมต่อเส้นทาง (Path) กับ ตัวควบคุม (Controller)
router.post('/', authAdmin, cscodeController.addCSCode);
router.post('/uploads/file/json', authAdmin, cscodeController.uploadFileJson);

// ส่งออก Module
module.exports = router;