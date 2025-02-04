// ดึง Dependencies จาก package
const multer = require('multer');
const path = require('path');

// นำเข้าพาธโฟลเดอร์อัปโหลดรูป
const productUploadDir = require('./productUploadDir');

// นำเข้าตัวกรองไฟล์รูปภาพ
const { ImageFileFilter } = require('./fileFilter');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, productUploadDir); // บันทึกไฟล์ลงใน /uploads/images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // ตั้งชื่อไฟล์ให้ไม่ซ้ำกัน
    }
});

const uploadImages = multer({ storage, fileFilter: ImageFileFilter }); // รองรับการอัปโหลดไฟล์เดียว

module.exports = uploadImages;