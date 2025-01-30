// ดึง Dependencies จาก package
const uploadImages = require('../utils/uploadImages');

// ดึงโมเดลที่เกี่ยวข้องสินค้าจากโฟลเดอร์ models
const Product = require('../models/newProductModel');

// ดูข้อมูลทั้งหมด
const getProducts = async (req, res) => {
    try {
        // เรียกข้อมูลทั้งหมด
        const products = await Product.find();

        // ตรวจสอบว่ามีข้อมูลหรือไม่
        if (products.length === 0) {
            return res.status(404).json({ message: 'ไม่พบสินค้า' });
        }
        return res.status(200).json({ count: products.length, products });
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
};

// เพิ่มข้อมูลสินค้า
const addProduct = async (req, res) => {
    uploadImages.array('images', 5)(req, res, async (error) => {
        if (error) {
            return res.status(400).json({ message: error.message });
        }

        // รับข้อมูลจาก request body
        const { brand, cscode, itemNumber, vendorItemId, itemDescription,
            price, category, subcategory, specICT, specifications } = req.body;

        if (!brand || !cscode || !itemNumber || !itemDescription || !category) {
            return res.status(400).json({ message: 'กรุณากรอกข้อมูลสินค้าครบถ้วน' });
        }

        try {
            // ดึงชื่อไฟล์ที่อัปโหลด
            const imagePaths = req.files.map(file => ({ fileName: `/uploads/${file.filename}` }));

            // สร้างสินค้าใหม่
            const newProduct = new Product({
                brand,
                cscode,
                itemNumber,
                vendorItemId,
                itemDescription,
                price,
                category,
                subcategory: subcategory || null,
                specICT: specICT === 'true', // รับค่า boolean จาก form-data
                specifications: specifications ? JSON.parse(specifications) : [],
                images: imagePaths
            });

            // บันทึกข้อมูล
            await newProduct.save();

            return res.status(201).json({
                message: 'เพิ่มสินค้าเรียบร้อยแล้ว',
                newProduct
            });
        } catch (error) {
            return res.status(400).json({ message: 'เกิดข้อผิดพลาด', error: error.message });
        }
    });
};

// ส่งออก API
module.exports = {
    getProducts,
    addProduct
}