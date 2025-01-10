// ดึง Dependencies จาก package
const fs = require('fs');
const multer = require('multer');
const path = require('path');

// ดึงโมเดลที่เกี่ยวข้องสินค้าจากโฟลเดอร์ models
const Category = require('../models/categoryModel');

// สร้าเส้นทางไปยังโฟลเดอร์ uploads
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// ตั้งค่าการอัพโหลดไฟล์
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // กำหนดโฟลเดอร์ที่ใช้เก็บไฟล์
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // สร้างชื่อไฟล์ที่ไม่ซ้ำกันโดยใช้ไทม์สแตมป์และตัวเลขสุ่ม
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

// การจัดการการอัปโหลดไฟล์ .json
const uploadJson = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/json') {
            cb(null, true);
        } else {
            cb(new Error('Only .json files are allowed'), false);
        }
    }
}).single('file');

// ดูข้อมูลหมวดหมู่สินค้าทั้งหมด
const getCategories = async (req, res) => {
    try {
        // เรียกดูข้อมูลหมวดหมู่สินค้าทั้งหมด
        const getCategories = await Category.find();
        return res.status(200).json({
            count: getCategories.length,
            getCategories
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// เพิ่มข้อมูลหมวดหมู่สินค้า
const addCategory = async (req, res) => {
    // รับข้อมูล name จาก request body
    const { name } = req.body;

    try {
        // ตรวจสอบว่ามีชื่อหมวดหมู่สินค้านี้ในระบบหรือไม่
        const category = await Category.findOne({ name: name });
        if (category) {
            return res.status(400).json({ message: 'ชื่อหมวดหมู่สินค้านี้มีในระบบแล้ว' });
        }

        // เพิ่มข้อมูลหมวดหมู่สินค้าลงในระบบ
        const addCategory = new Category({ name: name });

        // บันทึกหมวดหมู่สินค้า
        const saveCategory = addCategory.save();
        return res.status(201).json({
            message: 'เพิ่มข้อมูลหมวดหมู่สินค้าเรียบร้อยแล้ว',
            addCategory
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// ดูข้อมูลหมวดหมู่สินค้าผ่าน Id
const getCategory = async (req, res) => {
    // รับข้อมูล id จาก request params
    const { id } = req.params;

    try {
        // ตรวจสอบว่ามีหมวดหมู่สินค้าชิ้นนี้หริอไม่
        const category = await Category.findById(id);
        if (!category) {
            return res.status(400).json({ message: 'ไม่พบหมวดหมู่สินค้านี้ในระบบ' });
        }
        return res.status(200).json(category);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// ลบหมวดหมู่สินค้า
const deleteCategory = async (req, res) => {
    // รับข้อมูล id จาก request params
    const { id } = req.params;

    try {
        // ตรวจสอบว่ามีหมวดหมู่สินค้าชิ้นนี้หริอไม่
        const category = await Category.findById(id);
        if (!category) {
            return res.status(400).json({ message: 'ไม่พบหมวดหมู่สินค้านี้ในระบบ' });
        }

        // ลบข้อมูลหมวดหมู่สินค้า
        const deleteCategory = await Category.findByIdAndDelete(id);
        return res.status(200).json({
            message: 'ลบข้อมูลหมวดหมู่สินค้านี้เรียบร้อยแล้ว',
            deleteCategory
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// แก้ไขข้อมูลหมวดหมู่สินค้า
const updateCategory = async (req, res) => {
    // รับข้อมูล id จาก request params
    const { id } = req.params;
    // รับข้อมูล name จาก request body
    const { name } = req.body;

    try {
        // ตรวจสอบว่ามีหมวดหมู่สินค้าชิ้นนี้หริอไม่
        const category = await Category.findById(id);
        if (!category) {
            return res.status(400).json({ message: 'ไม่พบหมวดหมู่สินค้านี้ในระบบ' });
        }

        // ตรวจสอบว่ามีชื่อหมวดหมู่สินค้านี้ในระบบหรือไม่
        const findCategoryName = await Category.findOne({ name: name });
        if (findCategoryName) {
            return res.status(400).json({ message: 'ชื่อหมวดหมู่สินค้านี้มีในระบบแล้ว' });
        }

        // แก้ไขข้อมูลหมวดหมู่สินค้า
        const updateCategory = await Category.findByIdAndUpdate(
            id,
            { name: name },
            { new: true, runValidators: true }
        );
        return res.status(200).json({
            message: 'แก้ไขข้อมูลหมวดหมู่สินค้าเรียบร้อยแล้ว',
            updateCategory
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// ระบบอัพโหลดข้อมูลผ่านไฟล์ .json
const uploadFile = async (req, res) => {
    // ใช้ multer สำหรับการอัปโหลดไฟล์
    uploadJson(req, res, async (error) => {
        if (error) {
            return res.status(404).json({ message: 'ระบบเกิดข้อผิดพลาด' });
        }

        // ตรวจสอบว่ามีไฟล์ที่อัปโหลดมาหรือไม่
        if (!req.file) {
            return res.status(400).json({ message: 'กรุณาอัปโหลดไฟล์ .txt' });
        }

        // รับข้อมูลไฟล์จาก request file
        const filePath = req.file.path;

        try {
            // อ่านไฟล์
            const fileContent = fs.readFileSync(filePath, 'utf8');

            // แปลงข้อมูลจาก JSON string เป็น object/array
            const parsedData = JSON.parse(fileContent);

            // ตรวจสอบข้อมูลในไฟล์ (optional)
            if (!Array.isArray(parsedData) || parsedData.length === 0) {
                // ลบไฟล์ออกเมื่อข้อมูลไม่ถูกต้อง
                fs.unlinkSync(filePath);
                return res.status(400).json({ message: 'ไฟล์ไม่มีข้อมูลหมวดหมู่สินค้าหรือรูปแบบข้อมูลไม่ถูกต้อง' });
            }

            // ดึงข้อมูลจาก Database
            const existingCategories = await Category.find({}, { name: 1 }); // ดึงเฉพาะชื่อหมวดหมู่
            const existingNames = existingCategories.map(category => category.name);

            // ตรวจสอบข้อมูลที่ซ้ำกัน
            const duplicateEntries = [];
            const newEntries = [];
            parsedData.forEach(item => {
                if (existingNames.includes(item.name)) {
                    duplicateEntries.push(item.name);
                } else {
                    newEntries.push(item);
                }
            });

            // ตรวจสอบว่าข้อมูลทั้งหมดซ้ำกับใน Database
            if (newEntries.length === 0) {
                // ลบไฟล์หลังใช้งาน
                fs.unlinkSync(filePath);
                return res.status(400).json({ message: 'ข้อมูลหมวดหมู่ของคุณทั้งหมดมีอยู่ในระบบแล้ว' });
            }

            // นำเข้าข้อมูลใหม่ทั้งหมด
            const addedCategories = await Category.insertMany(newEntries);

            // ลบไฟล์หลังใช้งาน
            fs.unlinkSync(filePath);

            return res.status(200).json({
                message: 'เพิ่มหมวดหมู่สินค้าลงในระบบแล้ว',
                addedCategories,
                duplicateEntries,
                totalAdded: addedCategories.length,
                totalDuplicates: duplicateEntries.length
            });
        } catch (error) {
            // ลบไฟล์กรณีเกิดข้อผิดพลาด
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            return res.status(400).json({ message: error.message });
        }
    });
};

// ส่งออกตัว module
module.exports = {
    getCategories,
    addCategory,
    getCategory,
    deleteCategory,
    updateCategory,
    uploadFile
}