// ดึง Dependencies จาก package
const multer = require('multer');
const path = require('path');

// กำหนดโฟลเดอร์อัปโหลด
const uploadDir = path.join(__dirname, "../uploads/products");

// กำหนด Storage ของ Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
        cb(null, filename);
    }
});

// ฟังก์ชันตรวจสอบไฟล์ (อนุญาตเฉพาะรูปภาพ)
const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("อนุญาตเฉพาะไฟล์รูปภาพเท่านั้น"), false);
    }
    cb(null, true);
};

// ตั้งค่า Multer สำหรับอัปโหลดหลายไฟล์
const uploadImages = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // จำกัดขนาดไฟล์ 5MB
});

module.exports = { uploadImages };