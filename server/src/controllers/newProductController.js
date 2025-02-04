// ดึง Dependencies จาก package
const { uploadImages } = require('../utils/uploads');
const path = require('path');
const fs = require('fs');

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

// ดูข้อมูลสินค้าจาก Id
const getProduct = async (req, res) => {
    // รับข้อมูล id จาก request params
    const { id } = req.params;

    try {
        // ดูข้อมูลสินค้า
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: 'ไม่พบสินค้า' });
        return res.status(200).json(product);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// ลบข้อมูลสินค้า
const deleteProduct = async (req, res) => {
    // รับข้อมูล Id จาก request params
    const { id } = req.params;

    try {
        // ตรวจสอบว่ามีสินค้าหรือไม่
        const findProduct = await Product.findById(id);
        if (!findProduct) return res.status(404).json({ message: 'ไม่พบสินค้า' });

        // ลบสินค้า
        const deleteProduct = await Product.findByIdAndDelete(id);
        return res.status(200).json({ message: 'ลบสินค้าเรียบร้อยแล้ว', deleteProduct });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// แก้ไขสินค้า
const updateProduct = async (req, res) => {
    uploadImages.array('images', 5)(req, res, async (error) => {
        // รับข้อมูล `id` จาก request params
        const { id } = req.params;

        // ตรวจสอบว่ามีสินค้านี้หรือไม่
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: 'ไม่พบสินค้า' });

        // รับข้อมูลจาก request body
        const { brand, cscode, itemNumber, vendorItemId, itemDescription,
            price, category, subcategory, specICT, specifications } = req.body;

        try {
            // ✅ อัปเดตข้อมูลสินค้า (ถ้าไม่ได้ส่งค่ามาจะใช้ค่าตามเดิม)
            product.brand = brand || product.brand;
            product.cscode = cscode || product.cscode;
            product.itemNumber = itemNumber || product.itemNumber;
            product.vendorItemId = vendorItemId || product.vendorItemId;
            product.itemDescription = itemDescription || product.itemDescription;
            product.price = price !== undefined ? price : product.price;
            product.category = category || product.category;
            product.subcategory = subcategory || product.subcategory;
            product.specICT = specICT !== undefined ? specICT : product.specICT;
            product.specifications = specifications ? JSON.parse(specifications) : product.specifications;

            // ✅ ตรวจสอบว่ามีการอัปโหลดรูปใหม่หรือไม่
            if (Array.isArray(req.files) && req.files.length > 0) {
                // 🔥 ลบรูปเก่าทั้งหมดออกจากเซิร์ฟเวอร์ก่อน
                product.images.forEach((img) => {
                    const imagePath = path.join(__dirname, '../uploads/products', img.fileName);
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                    }
                });

                // 📌 บันทึกชื่อไฟล์ของรูปใหม่
                product.images = req.files.map((file) => ({ fileName: file.filename }));
            }

            // ✅ บันทึกข้อมูลที่แก้ไขลงในฐานข้อมูล
            await product.save();

            return res.status(200).json({ message: 'อัปเดตข้อมูลสินค้าสำเร็จแล้ว', product });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    });
};

// ส่งออก API
module.exports = {
    getProducts,
    addProduct,
    getProduct,
    deleteProduct,
    updateProduct
}