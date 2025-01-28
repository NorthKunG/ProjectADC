// ดึงตัวควบคุม User จากไฟล์ usersController.js
const userController = require('../controllers/userController');

// ดึง middleware มาใช้งาน
const auth = require('../middleware/auth');

// ดึง Dependencies จาก package
const express = require('express');
const router = express.Router();

// กำหนดตัวแปร
const adminAuth = auth.adminAuth;

// เชื่อมต่อเส้นทาง (Path) กับ ตัวควบคุม (Controller)
router.get('/', adminAuth, userController.getUsers);

// ส่งออก Module
module.exports = router;