// ดึงโมเดล Subcategory จากไฟล์ subcategoryModel.js
const Subcategory = require('../models/subcategoryModel');

// ดึงโมเดล Category จากไฟล์ categoryModel.js
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
}

// ส่งออก Module
module.exports = {
    getSubcategories,
    getSubcategoriesByCategory,
    getSubcategory,
    addSubcategory,
    deleteSubcategory,
    updateSubcategory
}