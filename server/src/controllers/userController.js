// ดึงโมเดลที่เกี่ยวข้องสินค้าจากโฟลเดอร์ models
const User = require('../models/userModel');

// ดูข้อมูลผู้ใช้งานทั้งหมด
const getUsers = async (req, res) => {
    try {
        // เรียกข้อมูลผู้ใช้งานทั้งหมด
        const users = await User.find();
        
        // ตรวจสอบว่ามีข้อมูลผู้ใช้งานหรือไม่
        if (!users) {
            return res.status(404).json({ message: 'ไม่พบข้อมูลผู้ใช้งาน' });
        }
        return res.status(200).json({
            count: users.length,
            users
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// ส่งออกโมดูล
module.exports = {
    getUsers
}