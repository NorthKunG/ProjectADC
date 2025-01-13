// ดึง Dependencies จาก package
const fs = require('fs');
const multer = require('multer');
const path = require('path');

// ดึงโมเดลที่เกี่ยวข้องสินค้าจากโฟลเดอร์ models
const Subcategory = require('../models/subcategoryModel');
const Category = require('../models/categoryModel');

// ดู Subcategory ทั้งหมด
const getSubcategories = async (req, res) => {
    try {
        // เรียกดูข้อมูล Subcategory ทั้งหมด
        const subcategories = await Subcategory.find().populate('category');
        return res.status(200).json(subcategories);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// ดู Subcategory ทั้งหมดที่มี Category เดียวกัน
const getSubcategoriesByCategory = async (req, res) => {
    // รับข้อมูล categoryId จาก request params
    const { categoryId } = req.params;

    try {
        // ตรวจสอบว่ามี Category อยู่ในระบบหรือไม่
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'ไม่พบ Category นี้ในระบบ' });
        }

        // เรียกดูข้อมูล Subcategory ทั้งหมดที่มี categoryId เดียวกัน
        const subcategories = await Subcategory.find({ category: categoryId });
        return res.status(200).json(subcategories);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// ดูข้อมูล Subcategory จาก Id
const getSubcategory = async (req, res) => {
    // รับข้อมูล id จาก request params
    const { id } = req.params

    try {
        // เรียกดูข้อมูลจาก id
        const subcategory = await Subcategory.findById(id).populate('category');
        // ตรวจสอบว่ามี Subcategory นี้หรือไม่
        if (!subcategory) {
            return res.status(404).json({ message: 'ไม่พบ Subcategory นี้ในระบบ' });
        }
        return res.status(200).json(subcategory);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// เพิ่ม Subcategory
const addSubcategory = async (req, res) => {
    // รับข้อมูล name และ categoryId จาก request body
    const { name, categoryId } = req.body;

    try {
        // ตรวจสอบว่ามี Category อยู่ในระบบหรือไม่
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'ไม่พบ Category นี้ในระบบ' });
        }

        // ตรวจสอบว่ามีชื่อ Subcategory นี้ในระบบหรือไม่
        const subcategory = await Subcategory.findOne({ name: name });
        if (subcategory) {
            return res.status(400).json({ message: 'มีชื่อ Subcategory นี้ในระบบแล้ว' });
        }

        // เพิ่ม Subcategory ใหม่ลงในระบบ
        const addSubcategory = new Subcategory({
            name: name,
            category: categoryId
        });

        // บันทึก Subcategory
        const saveSubcategory = addSubcategory.save();
        return res.status(201).json({
            message: 'เพิ่ม Subcategory ใหม่ลงในระบบแล้ว',
            addSubcategory
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// ลบ Subcategory
const deleteSubcategory = async (req, res) => {
    // รับข้อมูล id จาก request params
    const { id } = req.params;

    try {
        // ตรวจสอบว่ามี Subcategory อยู่ในระบบหรือไม่
        const subcategory = await Subcategory.findById(id);
        if (!subcategory) {
            return res.status(404).json({ message: 'ไม่พบ Subcategory นี้ในระบบ' });
        }

        // ลบ Subcategory นี้ออกจากระบบ
        const deleteSubcategory = await Subcategory.findByIdAndDelete(id);
        return res.status(200).json({
            message: 'ลบ Subcategory ออกจากระบบแล้ว',
            deleteSubcategory
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// แก้ไข Subcategory
const updateSubcategory = async (req, res) => {
    // รับข้อมูล id จาก request params
    const { id } = req.params;

    // รับข้อมูล name และ categoryId จาก request body
    const { name, categoryId } = req.body;

    try {
        // ตรวจสอบว่ามี Subcategory นี้อยู่ในระบบหรือไม่
        const subcategory = await Subcategory.findById(id);
        if (!subcategory) {
            return res.status(404).json({ message: 'ไม่พบ Subcategory นี้ในระบบ ' });
        }

        // ตรวจสอบว่ามีชื่อ Subcategory อยู่ในระบบหรือไม่
        const subcategoryName = await Subcategory.findOne({ name: name });
        if (subcategoryName) {
            return res.status(404).json({ message: 'มีชื่อ Subcategory นี้ในระบบแล้ว' });
        }

        // ตรวจสอบว่ามี Category นี้มีในระบบหรือไม่
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'ไม่พบ Category นี้ในระบบ' });
        }

        // แก้ไขข้อมูล Subcategory นี้
        const updateSubcategory = await Subcategory.findByIdAndUpdate(
            id,
            { name, category: categoryId },
            { new: true, runVaildators: true }
        );
        return res.status(200).json({
            message: 'แก้ไขข้อมูล Subcategory นี้เรียบร้อยแล้ว',
            updateSubcategory
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// สร้างเส้นทางไปยังโฟลเดอร์ uploads
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// ตั้งค่าการอัปโหลดไฟล์ข้อมูล
const storage = multer.diskStorage({
    destiation: (req, file, cb) => {
        // กำหนดโฟลเดอร์ที่ใช้เก็บข้อมูล
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

// ระบบอัพโหลดข้อมูลผ่านไฟล์ .json
const uploadFile = async (req, res) => {
    // ใช้ multer สำหรับการอัปโหลดไฟล์
    uploadJson(req, res, async (error) => {
        if (error) {
            return res.status(404).json({ message: 'ระบบเกิดข้อผิดพลาด' });
        }

        // ตรวจสอบว่ามีไฟล์ที่อัปโหลดมาหรือไม่
        if (!req.file) {
            return res.status(400).json({ message: 'กรุณาอัปโหลดไฟล์ .json' });
        }

        // รับข้อมูลไฟล์จาก request file
        const filePath = req.file.path;

        try {
            // อ่านไฟล์
            const fileContent = fs.readFileSync(filePath, 'utf8');

            // แปลงข้อมูลให้เป็น JSON
            const parsedData = JSON.parse(fileContent);

            // ตรวจสอบข้อมูลในไฟล์ (optional)
            if (!Array.isArray(parsedData) || parsedData.length === 0) {
                // ลบไฟล์ออกเมื่อข้อมูลไม่ถูกต้อง
                fs.unlinkSync(filePath);
                return res.status(400).json({ message: 'ไฟล์ไม่มีข้อมูล หรือรูปแบบข้อมูลไม่ถูกต้อง' });
            }

            // ดึงข้อมูล Subcategory จาก Database
            const existingSubcategories = await Subcategory.find({}, { name: 1 });
            const existingNames = existingSubcategories.map(subcategory => subcategory.name);

            // ดึงข้อมูล Category จาก Database
            const categories = await Category.find({}, { _id: 1 });
            const categoryId = categories.map(category => category._id.toString());

            // ตรวจสอบข้อมูลว่ามี name หรือ category ที่ไม่มีหรือว่าง
            const emptyDatas = [];
            const emptyNames = [];
            const emptyCategories = [];

            // ตรวจสอบ Category ที่ไม่มีอยู่ระบบ
            const invalidCategories = [];

            // ตรวจสอบข้อมูลที่ซ้ำกัน
            const duplicateEntries = [];
            const newEntries = [];
            parsedData.forEach(item => {
                // ตรวจสอบว่ามีการใส่ข้อมูลหรือไม่
                if (!item.name && !item.category || !item.name && !item.category === "" || item.name === ""
                    && !item.category || item.name === "" && item.category === "") {
                    emptyDatas.push(item);
                }
                // ตรวจสอบว่ามีการใส่ข้อมูล name หรือไม่
                else if (!item.name || item.name === "") {
                    emptyNames.push(item);
                }
                // ตรวจสอบว่ามีการใส่ข้อมูล category หรือไม่
                else if (!item.category || item.category === "") {
                    emptyCategories.push(item);
                }
                // ตรวจสอบว่ามีข้อมูล category ในระบบหรือไม่
                else if (!categoryId.includes(item.category)) {
                    invalidCategories.push(item);
                }
                // ตรวจสอบว่าข้อมูลที่ใส่มามีซ้ำกับในระบบหรือไม่
                else if (existingNames.includes(item.name)) {
                    duplicateEntries.push(item.name);
                }
                // ดำเนินการตามปกติ
                else {
                    newEntries.push(item);
                }
            });

            // ตรวจสอบว่าข้อมูลทั้งหมดซ้ำกับในระบบหรือไม่
            if (newEntries.length === 0) {
                // ลบไฟล์หลังใช้งาน
                fs.unlinkSync(filePath);
                return res.status(400).json({ message: 'ข้อมูลประเภทของคุณทั้งหมดมีอยู่ในระบบแล้ว' });
            }

            // นำเข้าข้อมูลใหม่ทั้งหมด
            const addedSubcategories = await Subcategory.insertMany(newEntries);

            // ลบไฟล์หลังใช้งาน
            fs.unlinkSync(filePath);

            return res.status(200).json({
                message: 'เพิ่มข้อมูลประเภทลงในระบบ',
                totalAdded: `มีข้อมูลที่ถูกเพิ่มเข้าไปจำนวน: ${addedSubcategories.length} ตัว`,
                addedSubcategories,
                totalDuplicates: `มีข้อมูลที่ซ้ำกับในระบบจำนวน: ${duplicateEntries.length} ตัว`,
                duplicateEntries,
                totalEmptyDatas: `มีข้อมูลว่างจำนวน: ${emptyDatas.length} ตัว`,
                emptyDatas,
                totalEmptyNames: `มีข้อมูลที่ไม่ได้ใส่ name จำนวน: ${emptyNames.length} ตัว`,
                emptyNames,
                totalEmptyCategories: `มีข้อมูลที่ไม่ได้ใส่ category จำนวน: ${emptyCategories.length} ตัว`,
                emptyCategories,
                totalInvlidCategories: `มีข้อมูลที่ระบุ category ที่ไม่พบในระบบจำนวน: ${invalidCategories.length} ตัว`,
                invalidCategories
            });
        } catch (error) {
            // ลบไฟล์กรณีเกิดข้อผิดพลาด
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            return res.status(400).json({ message: error.message });
        }
    });
}

// ส่งออก Module
module.exports = {
    getSubcategories,
    getSubcategoriesByCategory,
    getSubcategory,
    addSubcategory,
    deleteSubcategory,
    updateSubcategory,
    uploadFile
}