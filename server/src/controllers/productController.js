// ดึง Dependencies จาก package
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

// ดึงโมเดลที่เกี่ยวข้องสินค้าจากโฟลเดอร์ models
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const Subcategory = require('../models/subcategoryModel');
const Distributor = require('../models/distributorModel');
const Brand = require('../models/brandModel');

// สร้าเส้นทางไปยังโฟลเดอร์ uploads
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// ตั้งค่าการอัพโหลดไฟล์สินค้า
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

// กรองไฟล์ภาพ
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        // cb(new Error('อนุญาติให้ใช้งานเฉพาะไฟล์รูปภาพเท่านั้น!'), false);
        return res.status(400).json({ message: 'อนุญาตให้ใช้งานเฉพาะไฟล์รูปภาพเท่านั้น!' });
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
        const products = await Product.aggregate([
            {
                $lookup: {
                    // ชื่อคอลเลกชันที่คุณต้องการ join (ในที่นี้คือ 'categories')
                    from: 'categories',
                    // ฟิลด์ใน `Product` ที่เก็บ `ObjectId` ของหมวดหมู่
                    localField: 'category',
                    // ฟิลด์ใน `Category` ที่จะจับคู่กับ `category`
                    foreignField: 'code',
                    // ชื่อฟิลด์ที่เก็บข้อมูลจาก `Category` 
                    as: 'categoryDetails'
                }
            },
            {
                // ถ้ามีหลายค่าหรือข้อมูล, ใช้ $unwind เพื่อทำให้เป็น single document
                $unwind: '$categoryDetails'
            },
            {
                $project: {
                    // แสดง brand สินค้า
                    brand: 1,
                    // แสดงชื่อสินค้า
                    name: 1,
                    // แสดงราคา
                    price: 1,
                    // แสดงชื่อหมวดหมู่ (ใช้ชื่อหมวดหมู่จาก `Category`)
                    category: '$categoryDetails.name',
                    // แสดง Features ของสินค้า
                    features: 1
                }
            }
        ]);

        // ตรวจสอบว่ามีสินค้าหรือไม่
        if (!products) {
            return res.status(404).send({ message: 'ไม่พบสินค้า' });
        }

        return res.status(200).json(products);
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

        // รับข้อมูลจาก request body
        const { brandName, productId, name, ict, description, price, cscode, features } = req.body;

        try {
            // ตรวจสอบว่ามีการระบุ Brand หรือไม่
            if (!brandName || brandName === "") {
                return res.status(400).json({ message: "กรุณาใส่ Brand สินค้าของคุณ" });
            }

            // ตรวจสอบว่ามี Brand นี้ในระบบหรือไม่
            const brand = await Brand.findOne({ name: brandName })
            if (!brand) {
                return res.status(400).json({ message: 'ไม่พบ Brand นี้ในระบบ' })
            }

            // ตรวจสอบว่ามีรห้สสินค้านี้มีในระบบหรือไม่
            const productFindId = await Product.findOne({ productId: productId });
            if (productFindId) {
                return res.status(400).json({ message: 'รห้สสินค้านี้มีอยู่ในระบบแล้ว' });
            }

            // ตรวจสอบว่ามีการใส่ชื่อสินค้าหรือไม่
            if (!name || name === "") {
                return res.status(400).json({ message: "กรุณาใส่ชื่อสินค้าของคุณ" });
            }

            // ตรวจสอบว่ามีสินค้าตัวนี้อยู่ในระบบหรือไม่
            const productFindName = await Product.findOne({ name: name });
            if (productFindName) {
                return res.status(400).json({ message: 'สินค้าชิ้นนี้มีอยู่ในระบบแล้ว' });
            }

            // ตรวจสอบว่ามีการใส่ Category ของสินค้าหรือไม่
            if (!cscode || cscode === "") {
                return res.status(400).json({ message: "กรุณาใส่หมวดหมู่สินค้าของคุณ" });
            }

            // ตรวจสอบว่ามี Category นี้ในระบบหรือไม่
            const category = await Category.findOne({ code: cscode });
            if (!category) {
                return res.status(404).json({ message: 'ไม่พบ Category นี้ในระบบ' });
            }

            // ตรวจสอบว่ามีการอัพโหลดไฟล์รูปภาพสินค้าหรือไม่
            if (req.files && req.files.length > 0) {
                // รับข้อมูล fileName จาก request file
                const fileNames = req.files.map(file => ({ fileName: file.filename }));

                // เพิ่มสินค้าใหม่ลงในระบบ
                const addProduct = new Product({
                    brand: brandName,
                    productId,
                    name,
                    ict,
                    price,
                    description: description,
                    category: cscode,
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
                    brand: brandName,
                    productId,
                    name,
                    ict,
                    price,
                    description: description,
                    category: cscode,
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
        const product = await Product.aggregate([
            {
                $match: {
                    // แปลง id ที่รับมาให้เป็น ObjectId
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    // ชื่อคอลเลกชันที่ต้องการ join (ในที่นี้คือ 'categories')
                    from: 'categories',
                    // ฟิลด์ใน `Product` ที่เก็บ `ObjectId` ของหมวดหมู่
                    localField: 'category',
                    // ฟิลด์ใน `Category` ที่จะจับคู่กับ `category`
                    foreignField: 'code',
                    // ชื่อฟิลด์ที่เก็บข้อมูลจาก `Category`
                    as: 'categoryDetails'
                }
            },
            {
                // ถ้ามีหลายค่าหรือข้อมูล, ใช้ $unwind เพื่อทำให้เป็น single document
                $unwind: {
                    path: '$categoryDetails',
                    preserveNullAndEmptyArrays: true // เพื่อให้ยังแสดงสินค้าแม้ไม่มี category
                }
            },
            {
                $project: {
                    // แสดง brand สินค้า
                    brand: 1,
                    // แสดงชื่อสินค้า
                    name: 1,
                    // แสดงราคา
                    price: 1,
                    // แสดงชื่อหมวดหมู่ (ใช้ชื่อหมวดหมู่จาก `Category`)
                    category: '$categoryDetails.name',
                    // แสดง Features ของสินค้า
                    features: 1
                }
            }
        ]);

        // ตรวจสอบว่ามีสินค้าชิ้นในระบบหรือไม่
        if (!product || product.length === 0) {
            return res.status(404).json({ message: 'ไม่พบสินค้าชิ้นนี้ในระบบ' });
        }

        return res.status(200).json(product[0]); // ส่งคืนสินค้าชิ้นเดียว
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// แสดงสินค้าที่ไม่ติดมาตรฐาน ICT
const getProductNoIct = async (req, res) => {
    try {
        // เรียกดูข้อมูลสินค้าไม่ติดมาตรฐาน ICT
        const products = await Product.find({ ict: false });

        // ตรวจสอบว่ามีสินค้าหรือไม่
        if (products.length === 0) {
            return res.status(500).json({ message: 'ไม่พบสินค้าในระบบ' });
        }
        return res.status(200).json({
            count: products.length,
            products
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
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

        // รับข้อมูลจาก request body
        const { productId, name, ict, description, price, categoryId, subcategoryId, distributorId, features } = req.body;

        try {
            // ตรวจสอบว่ามีการระบุ productId หรือไม่
            if (!productId || productId === "") {
                return res.status(400).json({ message: "กรุณาใส่รหัสสินค้าของคุณ" });
            }

            // ตรวจสอบว่ามีรห้สสินค้านี้มีในระบบหรือไม่
            const productFindId = await Product.findOne({ productId: productId });
            if (productFindId) {
                return res.status(400).json({ message: 'รห้สสินค้านี้มีอยู่ในระบบแล้ว' });
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
                        productId,
                        name,
                        ict,
                        description,
                        price,
                        category: categoryId,
                        subcategory: subcategoryId,
                        distributor: distributorId,
                        features,
                        images: fileName
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
                        productId,
                        name,
                        ict,
                        description,
                        price,
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
    // รับข้อมูลจาก request query
    const { minPrice, maxPrice, brand, ict, category } = req.query;

    try {
        // สร้างตัวกรองแบบ dynamic
        const filters = {};

        // กรองตามช่วงราคา
        if (minPrice && maxPrice) {
            filters.price = {
                $gte: parseFloat(minPrice), // มากกว่าหรือเท่ากับ minPrice
                $lte: parseFloat(maxPrice), // น้อยกว่าหรือเท่ากับ maxPrice
            }
        }

        // กรองตาม brand
        if (brand) {
            filters.brand = brand;
        }

        // กรองตาม ict (ตรวจสอบว่าเป็น boolean)
        if (ict !== undefined) {
            filters.ict = ict === 'true';
        }

        // กรองตาม category
        if (category) {
            filters.category = category;
        }

        const products = await Product.aggregate([
            {
                $match: filters
            },
            {
                $lookup: {
                    // ชื่อคอลเลกชันที่คุณต้องการ join (ในที่นี้คือ 'categories')
                    from: 'categories',
                    // ฟิลด์ใน `Product` ที่เก็บ `ObjectId` ของหมวดหมู่
                    localField: 'category',
                    // ฟิลด์ใน `Category` ที่จะจับคู่กับ `category`
                    foreignField: 'code',
                    // ชื่อฟิลด์ที่เก็บข้อมูลจาก `Category` 
                    as: 'categoryDetails'
                }
            },
            {
                // ถ้ามีหลายค่าหรือข้อมูล, ใช้ $unwind เพื่อทำให้เป็น single document
                $unwind: '$categoryDetails'
            },
            {
                $project: {
                    // แสดง brand สินค้า
                    brand: 1,
                    // แสดงชื่อสินค้า
                    name: 1,
                    // แสดงราคา
                    price: 1,
                    // แสดงชื่อหมวดหมู่ (ใช้ชื่อหมวดหมู่จาก `Category`)
                    category: '$categoryDetails.name',
                    // แสดง Features ของสินค้า
                    features: 1
                }
            }
        ]);

        // ตรวจสอบว่ามีสินค้าหรือไม่
        if (!products || products.length === 0) {
            return res.status(404).send({ message: 'ไม่พบสินค้า' });
        }

        return res.status(200).json({ count: products.length, products });
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

// การตั้งค่า Multer เพื่อเก็บไฟล์ในหน่วยความจำ
const uploadJson = multer({ storage: multer.memoryStorage() }).single('file');

// ระบบอัพโหลดข้อมูลผ่านไฟล์ .json
const uploadFile = async (req, res) => {
    // ใช้ multer สำหรับการอัปโหลดไฟล์
    uploadJson(req, res, async (error) => {
        if (error) {
            return res.status(404).json({ message: 'ระบบเกิดข้อผิดพลาด' });
        }

        // ตรวจสอบว่าไฟล์ถูกส่งมาหรือไม่
        if (!req.file) {
            return res.status(400).json({ message: 'กรุณาอัปโหลดไฟล์ .json' });
        }

        // ตรวจสอบประเภทของไฟล์
        if (req.file.mimetype !== 'application/json') {
            return res.status(400).json({ message: 'อนุญาตเฉพาะไฟล์ .json เท่านั้น' });
        }

        try {
            // อ่านข้อมูลจากไฟล์ในหน่วยความจำ
            const fileContent = req.file.buffer.toString('utf-8');

            // แปลงข้อมูลให้เป็น JSON
            const parsedData = JSON.parse(fileContent);

            // ตรวจสอบข้อมูลในไฟล์ (optional)
            if (!Array.isArray(parsedData) || parsedData.length === 0) {
                return res.status(400).json({ message: 'ไฟล์ไม่มีข้อมูลสินค้า หรือรูปแบบข้อมูลไม่ถูกต้อง' });
            }

            // ดึงข้อมูล ProductId จาก Database
            const existingProductIds = await Product.find({}, { productId: 1 });
            const existingIds = existingProductIds.map(productId => productId.productId);

            // ดึงข้อมูล Name จาก Database
            const existingProducts = await Product.find({}, { name: 1 });
            const existingNames = existingProducts.map(product => product.name);

            // ดึงข้อมูล Category จาก Database
            const categories = await Category.find({}, { code: 1 });
            const categoryId = categories.map(category => category.code);

            // ดึงข้อมูล Subcategory จาก Database
            // const subcategories = await Subcategory.find({}, { _id: 1 });
            // const subcategoryId = subcategories.map(subcategory => subcategory._id.toString());

            // ดึงข้อมูล Distributor จาก Database
            // const distributors = await Distributor.find({}, { _id: 1 });
            // const distributorId = distributors.map(distributor => distributor._id.toString());

            // ตรวจสอบว่ามีการใส่ข้อมูลหรือไม่
            const emptyDatas = [];

            // ตรวจสอบข้อมูลที่ซ้ำกัน
            const duplicateEntries = [];
            const newEntries = [];
            const invalidDatas = [];
            parsedData.forEach(item => {
                // ตรวจสอบว่ามีการใส่ข้อมูลหรือไม่
                if (!item.productId || !item.name || !item.category) {
                    emptyDatas.push(item)
                }
                // ตรวจสอบว่ามีรหัสสินค้าซ้ำหรือไม่
                else if (existingIds.includes(item.productId)) {
                    duplicateEntries.push(item.productId);
                }
                // ตรวจสอบว่ามีชื่อสินค้าซ้ำหรือไม่
                else if (existingNames.includes(item.name)) {
                    duplicateEntries.push(item.name);
                }
                // ตรวจสอบว่ามีข้อมูลในระบบหรือไม่
                else if (!categoryId.includes(item.category) /* || !subcategoryId.includes(item.subcategory) ||
                    !distributorId.includes(item.distributor) */) {
                    invalidDatas.push(item.name);
                }
                // ดำเนินการตามปกติ
                else {
                    newEntries.push(item);
                }
            });

            // ตรวจสอบว่าข้อมูลทั้งหมดซ้ำกับใน Database
            if (newEntries.length === 0) {
                console.log(invalidDatas)
                return res.status(400).json({ message: 'ข้อมูลสินค้าของคุณทั้งหมดมีอยู่ในระบบแล้ว' });
            }

            // นำเข้าข้อมูลใหม่ทั้งหมด
            const addedProducts = await Product.insertMany(newEntries);

            return res.status(200).json({
                message: 'เพิ่มสินค้าลงในระบบแล้ว',
                total: parsedData.length,
                totalAdded: `มีข้อมูลที่ถูกเพิ่มเข้าไปจำนวน: ${newEntries.length} ตัว`,
                addedProducts,
                totalDuplicateEntries: `มีข้อมูลที่ซ้ำกับในระบบจำนวน: ${duplicateEntries.length} ตัว`,
                duplicateEntries,
                totalEmptyDatas: `มีข้อมูลที่ใส่ข้อมูลไม่ครบจำนวน: ${emptyDatas.length} ตัว`,
                emptyDatas,
                totalInvalidData: `มีข้อมูลที่ไม่ถูกต้องจำนวน: ${invalidDatas.length} ตัว`,
                invalidDatas
            });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    });
};

// Exports an api
module.exports = {
    getProducts,
    addProduct,
    getProduct,
    getProductNoIct,
    deleteProduct,
    updateProduct,
    searchProductByName,
    filterProduct,
    compareProduct,
    uploadFile,
}