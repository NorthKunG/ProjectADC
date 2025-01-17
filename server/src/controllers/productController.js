// ดึง Dependencies จาก package
const fs = require('fs');
const multer = require('multer');
const path = require('path');

// ดึงโมเดลที่เกี่ยวข้องสินค้าจากโฟลเดอร์ models
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const Subcategory = require('../models/subcategoryModel');
const Distributor = require('../models/distributorModel');

// สร้าเส้นทางไปยังโฟลเดอร์ uploads
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// ตั้งค่าการอัพโหลดไฟล์สินค้า
const storage = multer.diskStorage({
    destiation: (req, file, cb) => {
        // กำหนดโฟลเดอร์ที่ใช้เก็บรูปสินค้า
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // สร้างชื่อไฟล์ที่ไม่ซ้ำกันโดยใช้ไทม์สแตมป์และตัวเลขสุ่ม
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

// กรองไฟล์ภาพ
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        // cb(new Error('อนุญาติให้ใช้งานเฉพาะไฟล์รูปภาพเท่านั้น!'), false);
        return res.status(400).json({ message: 'อนุญาติให้ใช้งานเฉพาะไฟล์รูปภาพเท่านั้น!' });
    }
};

// สร้างการจัดการการอัพโหลด
const upload = multer({
    storage,
    fileFilter
}).array('images', 4);

// ดูข้อมูลสินค้าทั้งหมด
const getProducts = async (req, res) => {
    try {
        // เรียกดูข้อมูลสินค้าทั้งหมด
        const products = await Product.find().populate('category').populate('subcategory').populate('distributor');
        return res.status(200).json({
            count: products.length,
            products
        });
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

        // รับข้อมูล name, price, ict, categoryId, subcategoryId, distributorId และ features จาก request body
        const { name, price, ict, categoryId, subcategoryId, distributorId, features } = req.body;

        try {
            // ตรวจสอบว่ามีการใส่ชื่อสินค้าหรือไม่
            if (!name || name === "") {
                return res.status(400).json({ message: "กรุณาใส่ชื่อสินค้าของคุณ" });
            }

            // ตรวจสอบว่ามีสินค้าตัวนี้อยู่ในระบบหรือไม่
            const product = await Product.findOne({ name: name });
            if (product) {
                return res.status(400).json({ message: 'สินค้าชิ้นนี้มีอยู่ในระบบแล้ว' });
            }

            // ตรวจสอบว่าระบุว่าอยู่ในมาตรฐาน ICT หรือไม่
            if (!ict || ict === "") {
                return res.status(400).json({ message: 'โปรดระบุว่าสินค้าชิ้นนี้อยู่ในมาตรฐาน ICT หรือไม่' });
            }

            // ตรวจสอบว่าระบุข้อมูลถูกต้องหรือไม่
            if (ict != "Yes" || ict != "No") {
                return res.status(400).json({ message: 'คุณระบุการกำหนดมาตรฐาน ICT ไม่ถูต้อง' });
            }

            // ตรวจสอบว่ามีการใส่ Category ของสินค้าหรือไม่
            if (!categoryId || categoryId === "") {
                return res.status(400).json({ message: "กรุณาใส่หมวดหมู่สินค้าของคุณ" });
            }

            // ตรวจสอบว่ามี Category นี้ในระบบหรือไม่
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({ message: 'ไม่พบ Category นี้ในระบบ' });
            }

            // ตรวจสอบว่ามีการใส่ Subcategory ของสินค้าหรือไม่
            if (!subcategoryId || subcategoryId === "") {
                return res.status(400).json({ message: 'กรุณาใส่ประเภทสินค้าของคุณ' });
            }

            // ตรวจสอบว่ามี Subcategory นี้ในระบบหรือไม่
            const subcategory = await Subcategory.findById(subcategoryId);
            if (!subcategory) {
                return res.status(404).json({ message: 'ไม่พบ Subcategory นี้ในระบบ' });
            }

            // ตรวจสอบว่า Subcategory นี้อยู่ใน Category ที่ระบุหรือไม่
            if (!subcategory.category.equals(categoryId)) {
                return res.status(400).json({ message: 'Subcategory ของคุณไม่ตรงกับ Category ที่คุณระบุ' });
            }

            // ตรวจสอบว่ามีการใส่ผู้จัดจำหน่ายหรือไม่
            if (!distributorId || distributorId === "") {
                return res.status(400).json({ message: 'กรุณาใส่ผู้จัดจำหน่ายสินค้าของคุณ' });
            }

            // ตรวจสอบว่ามีผู้จัดจำหน่ายรายนี้ในระบบหรือไม่
            const distributor = await Distributor.findById(distributorId);
            if (!distributor) {
                return res.status(404).json({ message: 'ไม่พบผู้จัดจำหน่ายรายนี้ในระบบ' });
            }

            // ตรวจสอบว่ามีการอัพโหลดไฟล์รูปภาพสินค้าหรือไม่
            if (req.files && req.files.length > 0) {
                // รับข้อมูล fileName จาก request file
                const fileNames = req.files.map(file => ({ fileName: file.filename }));

                // เพิ่มสินค้าใหม่ลงในระบบ
                const addProduct = new Product({
                    name,
                    ict,
                    price,
                    category: categoryId,
                    subcategory: subcategoryId,
                    distributor: distributorId,
                    features,
                    images: fileNames
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
                    distributor: distributorId,
                    features
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
        const product = await Product.findById(id).populate('category').populate('subcategory').populate('distributor');
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

        // รับข้อมูล name, price, categoryId, subcategoryId, distributorId และ features จาก request body
        const { name, price, categoryId, subcategoryId, distributorId, features } = req.body;

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

            // ตรวจสอบว่ามีผู้จัดจำหน่ายรายนี้ในระบบหรือไม่
            const distributor = await Distributor.findById(distributorId);
            if (!distributor) {
                return res.status(404).json({ message: 'ไม่พบผู้จัดจำหน่ายรายนี้ในระบบ' });
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
                        distributor: distributorId,
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
                        distributor: distributorId,
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
    const { minPrice, maxPrice, ict, categoryId, subcategoryId, distributorId } = req.query;

    try {
        // กรองสินค้าที่อยู่ระหว่างราคาต่ำที่สุดและราคาสูงสุด
        if (minPrice && maxPrice && !categoryId && !subcategoryId && !distributorId) {
            // ตรวจสอบว่ามีสินค้าหรือไม่
            const products = await Product.find({
                price: { $gte: minPrice, $lte: maxPrice }
            }).populate('category').populate('subcategory').populate('distributor');
            if (products.length === 0) {
                return res.status(404).json({ message: 'ไม่พบสินค้าที่คุณค้นหา' });
            }
            return res.status(200).json({
                count: products.length,
                products
            });
        }

        // กรองสินค้าที่อยู่ระหว่างราคาต่ำที่สุดและราคาสูงสุดโดยที่อยู่ใน Category เดียวกัน
        if (minPrice && maxPrice && categoryId && !subcategoryId && !distributorId) {
            // ตรวจสอบว่ามี Category นี้ในระบบหรือไม่
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({ message: 'ไม่พบ Category นี้ในระบบ' });
            }

            // ตรวจสอบว่ามีสินค้าหรือไม่
            const products = await Product.find({
                price: { $gte: minPrice, $lte: maxPrice },
                category: categoryId
            }).populate('category').populate('subcategory').populate('distributor');
            if (products.length === 0) {
                return res.status(404).json({ message: 'ไม่พบสินค้าที่คุณค้นหา' });
            }
            return res.status(200).json({
                count: products.length,
                products
            });
        }

        // กรองสินค้าที่อยู่ระหว่างราคาต่ำที่สุดและราคาสูงสุดโดยยังที่อยู่ใน Category และ Subcategory เดียวกัน
        if (minPrice && maxPrice && categoryId && subcategoryId && !distributorId) {
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
            }).populate('category').populate('subcategory').populate('distributor');
            if (products.length === 0) {
                return res.status(404).json({ message: 'ไม่พบสินค้าที่คุณค้นหา' });
            }
            return res.status(200).json({
                count: products.length,
                products
            });
        }

        // กรองสินค้าที่อยู่ระหว่างราคาต่ำที่สุดและราคาสูงสุดโดยมีผู้จัดจำหน่ายรายเดียวกัน
        if (minPrice && maxPrice && !categoryId && !subcategoryId && distributorId) {
            // ตรวจสอบว่ามีผู้จัดหน่ายรายนี้ในระบบหรือไม่
            const distributor = await Distributor.findById(distributorId);
            if (!distributor) {
                return res.status(404).json({ message: 'ไม่พบผู้จัดหน่ายรายนี้ในระบบ' });
            }

            // ตรวจสอบว่ามีสินค้าหรือไม่
            const products = await Product.find({
                price: { $gte: minPrice, $lte: maxPrice },
                distributor: distributorId
            }).populate('category').populate('subcategory').populate('distributor');
            if (products.length === 0) {
                return res.status(404).json({ message: 'ไม่พบสินค้าที่คุณค้นหา' });
            }
            return res.status(200).json({
                count: products.length,
                products
            });
        }

        // กรองสินค้าที่อยู่ระหว่างราคาต่ำที่สุดและราคาสูงสุดโดยยังที่อยู่ใน Category และมีผู้จัดจำหน่ายรายเดียวกัน
        if (minPrice && maxPrice && categoryId && !subcategoryId && distributorId) {
            // ตรวจสอบว่ามี Category นี้ในระบบหรือไม่
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({ message: 'ไม่พบ Category นี้ในระบบ' });
            }

            // ตรวจสอบว่ามีผู้จัดหน่ายรายนี้ในระบบหรือไม่
            const distributor = await Distributor.findById(distributorId);
            if (!distributor) {
                return res.status(404).json({ message: 'ไม่พบผู้จัดหน่ายรายนี้ในระบบ' });
            }

            // ตรวจสอบว่ามีสินค้าหรือไม่
            const products = await Product.find({
                price: { $gte: minPrice, $lte: maxPrice },
                category: categoryId,
                distributor: distributorId
            }).populate('category').populate('subcategory').populate('distributor');
            if (products.length === 0) {
                return res.status(404).json({ message: 'ไม่พบสินค้าที่คุณค้นหา' });
            }
            return res.status(200).json({
                count: products.length,
                products
            });
        }

        // กรองสินค้าที่อยู่ระหว่างราคาต่ำที่สุดและราคาสูงสุดโดยยังที่อยู่ใน Category, Subcategory และมีผู้จัดจำหน่ายรายเดียวกัน
        if (minPrice && maxPrice && categoryId && subcategoryId && distributorId) {
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

            // ตรวจสอบว่ามีผู้จัดหน่ายรายนี้ในระบบหรือไม่
            const distributor = await Distributor.findById(distributorId);
            if (!distributor) {
                return res.status(404).json({ message: 'ไม่พบผู้จัดหน่ายรายนี้ในระบบ' });
            }

            // ตรวจสอบว่ามีสินค้าหรือไม่
            const products = await Product.find({
                price: { $gte: minPrice, $lte: maxPrice },
                category: categoryId,
                subcategory: subcategoryId,
                distributor: distributorId
            }).populate('category').populate('subcategory').populate('distributor');
            if (products.length === 0) {
                return res.status(404).json({ message: 'ไม่พบสินค้าที่คุณค้นหา' });
            }
            return res.status(200).json({
                count: products.length,
                products
            });
        }

        // กรองสินค้าที่อยู่ใน Category, Subcategory และมีผู้จัดจำหน่ายรายเดียวกัน
        if (!minPrice && !maxPrice && categoryId && subcategoryId && distributorId) {
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

            // ตรวจสอบว่ามีผู้จัดหน่ายรายนี้ในระบบหรือไม่
            const distributor = await Distributor.findById(distributorId);
            if (!distributor) {
                return res.status(404).json({ message: 'ไม่พบผู้จัดหน่ายรายนี้ในระบบ' });
            }

            // ตรวจสอบว่ามีสินค้าหรือไม่
            const products = await Product.find({
                category: categoryId,
                subcategory: subcategoryId,
                distributor: distributorId
            }).populate('category').populate('subcategory').populate('distributor');
            if (products.length === 0) {
                return res.status(404).json({ message: 'ไม่พบสินค้าที่คุณค้นหา' });
            }
            return res.status(200).json({
                count: products.length,
                products
            });
        }

        // กรองสินค้าที่อยู่ใน Category และ Subcategory เดียวกัน
        if (categoryId && subcategoryId && !distributorId) {
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
            }).populate('category').populate('subcategory').populate('distributor');
            if (products.length === 0) {
                return res.status(404).json({ message: 'ไม่พบสินค้าที่คุณค้นหา' });
            }
            return res.status(200).json({
                count: products.length,
                products
            });
        }

        // กรองสินค้าที่อยู่ใน Category เดียวกัน
        if (!minPrice && !maxPrice && categoryId && !subcategoryId && !distributorId) {
            // ตรวจสอบว่ามี Category นี้ในระบบหรือไม่
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({ message: 'ไม่พบ Category นี้ในระบบ' });
            }

            // ตรวจสอบว่ามีสินค้าหรือไม่
            const products = await Product.find({ category: categoryId }).populate('category').populate('subcategory')
                .populate('distributor');
            if (products.length === 0) {
                return res.status(404).json({ message: 'ไม่พบสินค้าที่คุณค้นหา' });
            }
            return res.status(200).json({
                count: products.length,
                products
            });
        }

        // กรองสินค้าที่อยู่ใน Category และมีผู้จัดจำหน่ายรายเดียวกัน
        if (!minPrice && !maxPrice && categoryId && !subcategoryId && distributorId) {
            // ตรวจสอบว่ามี Category นี้ในระบบหรือไม่
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({ message: 'ไม่พบ Category นี้ในระบบ' });
            }

            // ตรวจสอบว่ามีผู้จัดหน่ายรายนี้ในระบบหรือไม่
            const distributor = await Distributor.findById(distributorId);
            if (!distributor) {
                return res.status(404).json({ message: 'ไม่พบผู้จัดหน่ายรายนี้ในระบบ' });
            }

            // ตรวจสอบว่ามีสินค้าหรือไม่
            const products = await Product.find({
                category: categoryId,
                distributor: distributorId
            }).populate('category').populate('subcategory').populate('distributor');
            if (products.length === 0) {
                return res.status(404).json({ message: 'ไม่พบสินค้าที่คุณค้นหา' });
            }
            return res.status(200).json({
                count: products.length,
                products
            });
        }

        // กรองสินค้าที่มีผู้จัดจำหน่ายรายเดียวกัน
        if (!minPrice && !maxPrice && !categoryId && !subcategoryId && distributorId) {
            // ตรวจสอบว่ามีผู้จัดหน่ายรายนี้ในระบบหรือไม่
            const distributor = await Distributor.findById(distributorId);
            if (!distributor) {
                return res.status(404).json({ message: 'ไม่พบผู้จัดหน่ายรายนี้ในระบบ' });
            }

            // ตรวจสอบว่ามีสินค้าหรือไม่
            const products = await Product.find({
                distributor: distributorId
            }).populate('category').populate('subcategory').populate('distributor');
            if (products.length === 0) {
                return res.status(404).json({ message: 'ไม่พบสินค้าที่คุณค้นหา' });
            }
            return res.status(200).json({
                count: products.length,
                products
            });
        }

        // กรองสินค้าที่มีการระบุมาตรฐาน ICT โดยไม่สนหมวดหมู่ ประเภท และผู่จัดจำหน่าย
        if (ict === "Yes" && !categoryId && !subcategoryId && !distributorId) {
            // ตรวจสอบว่ามีสินค้าหรือไม่
            const products = await Product.find({
                ict: ict
            }).populate('category').populate('subcategory').populate('distributor');
            if (products.length === 0) {
                return res.status(404).json({ message: 'ไม่สินค้าที่คุณค้นหา' });
            }
            return res.status(200).json({
                count: products.length,
                products
            });
        }

        // กรองสินค้าที่มีการระบุมาตรฐาน ICT และอยู่ในหมวดหมู่เดียวกัน
        if (ict === "Yes" && categoryId && !subcategoryId && !distributorId) {
            // ตรวจสอบว่ามี Category นี้ในระบบหรือไม่
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({ message: 'ไม่พบ Category นี้ในระบบ' });
            }

            // ตรวจสอบว่ามีสินค้าหรือไม่
            const products = await Product.find({
                ict: ict,
                category: categoryId
            }).populate('category').populate('subcategory').populate('distributor');
            if (products.length === 0) {
                return res.status(404).json({ message: 'ไม่สินค้าที่คุณค้นหา' });
            }
            return res.status(200).json({
                count: products.length,
                products
            });
        }

        // กรองสินค้าที่มีการระบุมาตรฐาน ICT และอยู่ในหมวดหมู่และประเภทเดียวกัน
        if (ict === "Yes" && categoryId && subcategoryId && !distributorId) {
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
                ict: ict,
                category: categoryId,
                subcategory: subcategoryId
            }).populate('category').populate('subcategory').populate('distributor');
            if (products.length === 0) {
                return res.status(404).json({ message: 'ไม่สินค้าที่คุณค้นหา' });
            }
            return res.status(200).json({
                count: products.length,
                products
            });
        }

        // กรองสินค้าที่มีการระบุมาตรฐาน ICT และอยู่ในหมวดหมู่ ประเภทและผู้จัดจำหน่ายเดียวกัน
        if (ict === "Yes" && categoryId && subcategoryId && distributorId) {
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

            // ตรวจสอบว่ามีผู้จัดหน่ายรายนี้ในระบบหรือไม่
            const distributor = await Distributor.findById(distributorId);
            if (!distributor) {
                return res.status(404).json({ message: 'ไม่พบผู้จัดหน่ายรายนี้ในระบบ' });
            }

            // ตรวจสอบว่ามีสินค้าหรือไม่
            const products = await Product.find({
                ict: ict,
                category: categoryId,
                subcategory: subcategoryId,
                distributor: distributorId
            }).populate('category').populate('subcategory').populate('distributor');
            if (products.length === 0) {
                return res.status(404).json({ message: 'ไม่สินค้าที่คุณค้นหา' });
            }
            return res.status(200).json({
                count: products.length,
                products
            });
        }

        // กรองสินค้าที่มีการระบุมาตรฐาน ICT และอยู่ในหมวดหมู่และผู้จัดจำหน่ายเดียวกัน
        if (ict === "Yes" && categoryId && !subcategoryId && distributorId) {
            // ตรวจสอบว่ามี Category นี้ในระบบหรือไม่
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({ message: 'ไม่พบ Category นี้ในระบบ' });
            }

            // ตรวจสอบว่ามีผู้จัดหน่ายรายนี้ในระบบหรือไม่
            const distributor = await Distributor.findById(distributorId);
            if (!distributor) {
                return res.status(404).json({ message: 'ไม่พบผู้จัดหน่ายรายนี้ในระบบ' });
            }

            // ตรวจสอบว่ามีสินค้าหรือไม่
            const products = await Product.find({
                ict: ict,
                category: categoryId,
                distributor: distributorId
            }).populate('category').populate('subcategory').populate('distributor');
            if (products.length === 0) {
                return res.status(404).json({ message: 'ไม่สินค้าที่คุณค้นหา' });
            }
            return res.status(200).json({
                count: products.length,
                products
            });
        }

        // กรองสินค้าที่มีการระบุมาตรฐาน ICT และผู้จัดจำหน่ายเดียวกัน
        if (ict === "Yes" && !categoryId && !subcategoryId && distributorId) {
            // ตรวจสอบว่ามีผู้จัดหน่ายรายนี้ในระบบหรือไม่
            const distributor = await Distributor.findById(distributorId);
            if (!distributor) {
                return res.status(404).json({ message: 'ไม่พบผู้จัดหน่ายรายนี้ในระบบ' });
            }

            // ตรวจสอบว่ามีสินค้าหรือไม่
            const products = await Product.find({
                ict: ict,
                distributor: distributorId
            }).populate('category').populate('subcategory').populate('distributor');
            if (products.length === 0) {
                return res.status(404).json({ message: 'ไม่สินค้าที่คุณค้นหา' });
            }
            return res.status(200).json({
                count: products.length,
                products
            });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// ระบบเปรียบเทียบสินค้า
const compareProduct = async (req, res) => {
    // รับข้อมูล product1, product2, จาก request query
    const { name1, name2 } = req.query;

    try {
        // ตรวจสอบว่าเป็นสินค้าตัวเดียวกันหรือไม่
        if (name1 === name2) {
            return res.status(400).json({ message: 'คุณไม่สามารถเปรียบเทียบสินค้าตัวเดียวกันได้' });
        }

        // ตรวจสอบว่ามีสินค้าชิ้นนี้หรือไม่
        const product1 = await Product.findOne({ name: name1 });
        if (!product1) {
            return res.status(404).json({ message: `ไม่พบสินค้าชิ้นนี้ '${name1}'` });
        }

        // ตรวจสอบว่ามีสินค้าชิ้นนี้หริอไม่
        const product2 = await Product.findOne({ name: name2 });
        if (!product2) {
            return res.status(404).json({ message: `ไม่พบสินค้าชิ้นนี้ '${name2}'` });
        }

        // ตรวจสอบว่าสินค้าชิ้นที่ 1 กับสินค้าชิ้นที่ 2 อยู่ใน Catetgory เดียวกันหรือไม่
        if (!product1.category.equals(product2.category)) {
            return res.status(400).json({ message: 'สินค้าทั้ง 2 ชิ้นไม่ได้อยู่ในหมวดหมู่เดียวกันจึงไม่สามารถเปรียบเทียบกันได้' });
        }

        // ตรวจสอบว่าสินค้าชิ้นที่ 1 กับสินค้าชิ้นที่ 2 อยู่ใน Subcategory เดียวกันหรือไม่
        if (!product1.subcategory.equals(product2.subcategory)) {
            return res.status(400).json({ message: 'สินค้าทั้ง 2 ชิ้นไม่ได้อยู่ในประเภทเดียวกันจึงไม่สามารถเปรียบเทียบกันได้' });
        }

        // ตรวจสอบว่าสินค้าทั้ง 2 ตัวมีจำนวน features เท่ากันหรือไม่
        if (product1.features.length !== product2.features.length) {
            return res.status(400).json({ message: 'Features ของสินค้าทั้ง 2 ไม่เท่ากันจึงไม่สามารถเปรียบเทียบกันได้' });
        }

        // ตรวจสอบว่าชื่อ features ของสินค้าทั้ง 2 เหมือนกันหรือไม่
        for (let i = 0; i < Math.max(product1.features.length, product2.features.length); i++) {
            // แทนค่า feature สินค้าทั้ง 2
            const feature1 = product1.features[i];
            const feature2 = product2.features[i];

            // ตรวจสอบว่าฟีเจอร์ทั้งสองมีค่าอยู่
            if (!feature1 || !feature2 || feature1['name'] !== feature2['name']) {
                return res.status(400).json({ message: 'Features ของสินค้าทั้ง 2 ไม่เหมือนกันจึงไม่สามารถเปรียบเทียบกันได้' });
            }
        }

        // เก็บรายการความแตกต่างทั้งหมด
        const differences = [];

        // ตรวจสอบว่ามีสินค้าทั้ง 2 ต่างกันอย่างไรบ้าง
        for (let i = 0; i < Math.max(product1.features.length, product2.features.length); i++) {
            // แทนค่า feature สินค้าทั้ง 2
            const feature1 = product1.features[i];
            const feature2 = product2.features[i];

            // ตรวจสอบว่าฟีเจอร์ทั้งสองมีค่าอยู่
            if (!feature1 || !feature2 || feature1['description'] !== feature2['description']) {
                differences.push({
                    feature1: feature1,
                    feature2: feature2
                });
            }
        }
        return res.status(200).json({
            message: 'Features ของสินค้าทั้ง 2 มีความแตกต่างกัน',
            differences: differences
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// การจัดการการอัปโหลดไฟล์ .json
const uploadJson = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/json') {
            cb(null, true);
        } else {
            // cb(new Error('Only .json files are allowed'), false);
            return res.status(400).json({ message: 'อนุญาตเฉพาะไฟล์ .json เท่านั้น' });
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
                return res.status(400).json({ message: 'ไฟล์ไม่มีข้อมูลสินค้า หรือรูปแบบข้อมูลไม่ถูกต้อง' });
            }

            // ดึงข้อมูล Name จาก Database
            const existingProducts = await Product.find({}, { name: 1 });
            const existingNames = existingProducts.map(product => product.name);

            // ดึงข้อมูล Category จาก Database
            const categories = await Category.find({}, { _id: 1 });
            const categoryId = categories.map(category => category._id.toString());

            // ดึงข้อมูล Subcategory จาก Database
            const subcategories = await Subcategory.find({}, { _id: 1 });
            const subcategoryId = subcategories.map(subcategory => subcategory._id.toString());

            // ดึงข้อมูล Distributor จาก Database
            const distributors = await Distributor.find({}, { _id: 1 });
            const distributorId = distributors.map(distributor => distributor._id.toString());

            // ตรวจสอบว่ามีการใส่ข้อมูลหรือไม่
            const emptyDatas = [];

            // ตรวจสอบข้อมูลที่ซ้ำกัน
            const duplicateEntries = [];
            const newEntries = [];
            const invalidDatas = [];
            parsedData.forEach(item => {
                // ตรวจสอบว่ามีการใส่ข้อมูลหรือไม่
                if (!item.name || !item.ict || !item.category || !item.subcategory || !item.distributor) {
                    emptyDatas.push(item.name)
                }
                // ตรวจสอบว่ามีข้อมูลซ้ำหรือไม่
                else if (existingNames.includes(item.name)) {
                    duplicateEntries.push(item.name);
                }
                // ตรวจสอบว่ามีข้อมูลในระบบหรือไม่
                else if (!categoryId.includes(item.category) || !subcategoryId.includes(item.subcategory) ||
                    !distributorId.includes(item.distributor)) {
                    invalidDatas.push(item.name);
                }
                // ดำเนินการตามปกติ
                else {
                    newEntries.push(item);
                }
            });

            // ตรวจสอบว่าข้อมูลทั้งหมดซ้ำกับใน Database
            if (newEntries.length === 0) {
                // ลบไฟล์หลังใช้งาน
                fs.unlinkSync(filePath);
                return res.status(400).json({ message: 'ข้อมูลสินค้าของคุณทั้งหมดมีอยู่ในระบบแล้ว' });
            }

            // นำเข้าข้อมูลใหม่ทั้งหมด
            const addedProducts = await Product.insertMany(newEntries);

            // ลบไฟล์หลังใช้งาน
            fs.unlinkSync(filePath);

            return res.status(200).json({
                message: 'เพิ่มสินค้าลงในระบบแล้ว',
                totalAdded: `มีข้อมูลที่ถูกเพิ่มเข้าไปจำนวน: ${newEntries.length} ตัว`,
                addedProducts,
                totalDuplicateEntries: `มีข้อมูลที่ซ้ำกับในระบบจำนวน: ${duplicateEntries.length} ตัว`,
                duplicateEntries,
                totalEmptyDatas: `มีข้อมูลที่ใส่ข้อมูลไม่ครบจำนวน: ${emptyDatas.length} ตัว`,
                emptyDatas,
                totalInvalidData: `มีข้อมูลที่ไม่ถูกต้องจำนวน: ${invalidDatas.length} ตัว`
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

// Exports an api
module.exports = {
    getProducts,
    addProduct,
    getProduct,
    deleteProduct,
    updateProduct,
    searchProductByName,
    filterProduct,
    compareProduct,
    uploadFile
}