// ดึง Dependencies จาก package
const fs = require('fs');
const multer = require('multer');
const path = require('path');

// ดึงโมเดลที่เกี่ยวข้องสินค้าจากโฟลเดอร์ models
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const Subcategory = require('../models/subcategoryModel');

// สร้าเส้นทางไปยังโฟลเดอร์ uploads
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// ตั้งค่าการอัพโหลดรูปสินค้า
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // กำหนดโฟลเดอร์ที่ใช้เก็บรูปสินค้า
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // สร้างชื่อไฟล์ที่ไม่ซ้ำกันโดยใช้ไทม์สแตมป์และตัวเลขสุ่ม
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

// Filter ไฟล์ภาพ
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

// สร้างการจัดการการอัพโหลด
const upload = multer({
    storage,
    fileFilter
}).single('image');

// ดูข้อมูลสินค้าทั้งหมด
const getProducts = async (req, res) => {
    try {
        // เรียกดูข้อมูลสินค้าทั้งหมด
        const products = await Product.find().populate('category').populate('subcategory');
        return res.status(200).json(
            { count: products.length },
            products
        );
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// เพิ่มสินค้า
const addProduct = async (req, res) => {
    // ใช้งาน multer
    upload(req, res, async (error) => {
        if (error) {
            return res.status(404).json({ message: 'ระบบเกิดข้อผิดพลาด' });
        }

        // รับข้อมูล name, price categoryId, subcategoryId และ features จาก request body
        const { name, price, categoryId, subcategoryId, features } = req.body;

        try {
            // ตรวจสอบว่ามีสินค้าตัวนี้อยู่ในระบบหรือไม่
            const product = await Product.findOne({ name: name });
            if (product) {
                return res.status(400).json({ message: 'สินค้าชิ้นนี้มีอยู่ในระบบแล้ว' });
            }

            // ตรวจสอบว่ามี Category นี้ในระบบหรือไม่
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(400).json({ message: 'ไม่พบ Category นี้ในระบบ' });
            }

            // ตรวจสอบว่ามี Subcategory นี้ในระบบหรือไม่
            const subcategory = await Subcategory.findById(subcategoryId);
            if (!subcategory) {
                return res.status(400).json({ message: 'ไม่พบ Subcategory นี้ในระบบ' });
            }

            // ตรวจสอบว่ามีการอัพโหลดไฟล์รูปภาพสินค้าหรือไม่
            if (req.file) {
                // รับข้อมูล fileName จาก request file
                const fileName = req.file.filename;

                // เพิ่มสินค้าใหม่ลงในระบบ
                const addProduct = new Product({
                    name,
                    price,
                    category: categoryId,
                    subcategory: subcategoryId,
                    features,
                    image: fileName
                });

                // บันทึกสินค้า
                const saveProduct = addProduct.save();
                return res.status(201).json({
                    message: 'เพิ่มสินค้าชิ้นลงในระบบแล้ว',
                    addProduct
                });
            } else {
                // เพิ่มสินค้าใหม่ลงในระบบ
                const addProduct = new Product({
                    name,
                    price,
                    category: categoryId,
                    subcategory: subcategoryId,
                    features,
                });

                // บันทึกสินค้า
                const saveProduct = addProduct.save();
                return res.status(201).json({
                    message: 'เพิ่มสินค้าชิ้นลงในระบบแล้ว',
                    addProduct
                });
            }
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    });
};

// เรียกดูข้อมูลสินค้าผ่าน Id
const getProduct = async (req, res) => {
    // รับข้อมูล id จาก request params
    const { id } = req.params;

    try {
        // เรียกดูข้อมูลสินค้าโดยใช้ id
        const product = await Product.findById(id);
        // ตรวจสอบว่ามีสินค้าชิ้นในระบบหรือไม่
        if (!product) {
            return res.status(404).json({ message: 'ไม่พบสินค้าชิ้นนี้ในระบบ' });
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// ลบสินค้า
const deleteProduct = async (req, res) => {
    // รับข้อมูล id จาก request params
    const { id } = req.params;

    try {
        // ตรวจสอบว่ามีสินค้าชิ้นนี้ในระบบหรือไม่
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'ไม่พบสินค้าชิ้นนี้ในระบบ' });
        }

        // ลบสินค้าชิ้นนี้ออกจากระบบ
        const deleteProduct = await Product.findByIdAndDelete(id);
        return res.status(200).json({
            message: 'ลบสินค้าชิ้นนี้ออกจากระบบแล้ว',
            deleteProduct
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// แก้ไขข้อมูลสินค้า
const updateProduct = async (req, res) => {
    // รับข้อมูล id จาก request params
    const { id } = req.params;

    // ใช้งาน multer
    upload(req, res, async (error) => {
        if (error) {
            return res.status(404).json({ message: 'ระบบเกิดข้อผิดพลาด' });
        }

        // รับข้อมูล name, price, categoryId, subcategoryId, features จาก request body
        const { name, price, categoryId, subcategoryId, features } = req.body;

        try {
            // ตรวจสอบว่ามีสินค้าตัวนี้อยู่ในระบบหรือไม่
            const product = await Product.findOne({ name: name });
            if (product) {
                return res.status(400).json({ message: 'สินค้าชิ้นนี้มีอยู่ในระบบแล้ว' });
            }

            // ตรวจสอบว่ามี Category นี้ในระบบหรือไม่
            const category = await Category.findOne({ category: categoryId });
            if (!category) {
                return res.status(400).json({ message: 'ไม่พบ Category นี้ในระบบ' });
            }

            // ตรวจสอบว่ามี Subcategory นี้ในระบบหรือไม่
            const subcategory = await Subcategory.findOne({ subcategory: subcategoryId });
            if (!subcategory) {
                return res.status(400).json({ message: 'ไม่พบ Subcategory นี้ในระบบ' });
            }

            // ตรวจสอบว่ามีการอัพโหลดไฟล์รูปภาพสินค้าหรือไม่
            if (req.file) {
                // รับข้อมูล fileName จาก request file
                const fileName = req.file.filename;

                // แก้ไขข้อมูลสินค้า
                const updateProduct = await Product.findByIdAndUpdate(
                    id,
                    {
                        name, price,
                        category: categoryId,
                        subcategory: subcategoryId,
                        features,
                        image: fileName
                    },
                    { new: true, runVaildators: true }
                );
                return res.status(200).json({
                    message: 'แก้ไขข้อมูลสินค้านี้เรียบร้อยแล้ว',
                    updateProduct
                });
            } else {
                // แก้ไขข้อมูลสินค้า
                const updateProduct = await Product.findByIdAndUpdate(
                    id,
                    {
                        name, price,
                        category: categoryId,
                        subcategory: subcategoryId,
                        features
                    },
                    { new: true, runVaildators: true }
                );
                return res.status(200).json({
                    message: 'แก้ไขข้อมูลสินค้านี้เรียบร้อยแล้ว',
                    updateProduct
                });
            }
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    });
}

// ค้นหาสินค้าผ่านชื่อ
const searchProductByName = async (req, res) => {
    // รับข้อมูล name จาก req.query
    const { name } = req.query;

    try {
        // สร้าง Query Object ตาม name ที่ให้มา
        let query = {};

        // ปรับการค้นหาโดยไม่คำนึงถึงตัวพิมพ์เล็ก/ใหญ่
        query.name = { $regex: name, $options: 'i' };

        // ดำเนินการค้นหาข้อมูล
        const products = await Product.find(query);
        // ตรวจสอบว่ามีสินค้าหรือไม่
        if (products.length === 0) {
            return res.status(404).json({ message: 'ไม่พบสินค้าที่คุณค้นหา' });
        }
        return res.status(200).json({
            count: products.length,
            products
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// กรองสินค้าผ่าน ราคา, Category และ Subcategory
const filterProduct = async (req, res) => {
    // รับข้อมูล price, categoryId และ subcategoryId จาก request body
    const { minPrice, maxPrice, categoryId, subcategoryId } = req.query;

    try {
        // กรองสินค้าที่อยู่ระหว่างราคาต่ำที่สุดและราคาสูงสุด
        if (minPrice && maxPrice && !categoryId && !subcategoryId) {
            // ตรวจสอบว่ามีสินค้าหรือไม่
            const products = await Product.find({
                price: { $gte: minPrice, $lte: maxPrice }
            }).populate('category').populate('subcategory');
            if (products.length === 0) {
                return res.status(404).json({ message: 'ไม่พบสินค้าที่คุณค้นหา' });
            }
            return res.status(200).json({
                count: products.length,
                products
            });
        }

        // กรองสินค้าที่อยู่ระหว่างราคาต่ำที่สุดและราคาสูงสุดโดยที่อยู่ใน Category เดียวกัน
        if (minPrice && maxPrice && categoryId && !subcategoryId) {
            // ตรวจสอบว่ามี Category นี้ในระบบหรือไม่
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({ message: 'ไม่พบ Category นี้ในระบบ' });
            }

            // ตรวจสอบว่ามีสินค้าหรือไม่
            const products = await Product.find({
                price: { $gte: minPrice, $lte: maxPrice },
                category: categoryId
            }).populate('category').populate('subcategory');
            if (products.length === 0) {
                return res.status(404).json({ message: 'ไม่พบสินค้าที่คุณค้นหา' });
            }
            return res.status(200).json({
                count: products.length,
                products
            });
        }

        // กรองสินค้าที่อยู่ระหว่างราคาต่ำที่สุดและราคาสูงสุดโดยยังที่อยู่ใน Category และ Subcategory เดียวกัน
        if (minPrice && maxPrice && categoryId && subcategoryId) {
            // ตรวจสอบว่ามี Category นี้ในระบบหรือไม่
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({ message: 'ไม่พบ Category นี้ในระบบ' });
            }

            // ตรวจสอบว่ามี Subcategory นี้ในระบบหรือไม่
            const subcategory = await Subcategory.findById(subcategoryId);
            if (!subcategory) {
                return res.status(404).json({ message: 'ไม่พบ Subcategory นี้ในระบบ' });
            }

            // ตรวจสอบว่ามีสินค้าหรือไม่
            const products = await Product.find({
                price: { $gte: minPrice, $lte: maxPrice },
                category: categoryId,
                subcategory: subcategoryId
            }).populate('category').populate('subcategory');
            if (products.length === 0) {
                return res.status(404).json({ message: 'ไม่พบสินค้าที่คุณค้นหา' });
            }
            return res.status(200).json({
                count: products.length,
                products
            });
        }

        // กรองสินค้าที่อยู่ใน Category และ Subcategory เดียวกัน
        if (categoryId && subcategoryId) {
            // ตรวจสอบว่ามี Category นี้ในระบบหรือไม่
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({ message: 'ไม่พบ Category นี้ในระบบ' });
            }

            // ตรวจสอบว่ามี Subcategory นี้ในระบบหรือไม่
            const subcategory = await Subcategory.findById(subcategoryId);
            if (!subcategory) {
                return res.status(404).json({ message: 'ไม่พบ Subcategory นี้ในระบบ' });
            }

            // ตรวจสอบว่ามีสินค้าหรือไม่
            const products = await Product.find({
                category: categoryId,
                subcategory: subcategoryId
            });
            if (products.length === 0) {
                return res.status(404).json({ message: 'ไม่พบสินค้าที่คุณค้นหา' });
            }
            return res.status(200).json({
                count: products.length,
                products
            });
        }

        // กรองสินค้าที่อยู่ใน Category เดียวกัน
        if (categoryId && !subcategoryId) {
            // ตรวจสอบว่ามี Category นี้ในระบบหรือไม่
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({ message: 'ไม่พบ Category นี้ในระบบ' });
            }

            // ตรวจสอบว่ามีสินค้าหรือไม่
            const products = await Product.find({ category: categoryId });
            if (products.length === 0) {
                return res.status(404).json({ message: 'ไม่พบสินค้าที่คุณค้นหา' });
            }
            return res.status(200).json({
                count: products.length,
                products
            });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// Exports an api
module.exports = {
    getProducts,
    addProduct,
    getProduct,
    deleteProduct,
    updateProduct,
    searchProductByName,
    filterProduct
}