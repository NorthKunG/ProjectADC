// ดึงโมเดลที่เกี่ยวข้องสินค้าจากโฟลเดอร์ models
const Category = require('../models/categoryModel');

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
}

// ส่งออกตัว module
module.exports = {
    getCategories,
    addCategory,
    getCategory,
    deleteCategory,
    updateCategory
}