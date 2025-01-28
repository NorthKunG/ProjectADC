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

// ดูโปรไฟล์
const getProfile = async (req, res) => {
    // ใช้ userId จาก decoded token
    const user = await User.findById(req.userId);

    try {
        if (!user) {
            return res.status(404).json({ message: 'ไม่พบผู้ใช้' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// แก้ไขโปรไฟล์
const editProfile = async (req, res) => {
    // ใช้ userId จาก decoded token
    const user = await User.findById(req.userId);

    if (!user) {
        return res.status(404).json({ message: 'ไม่พบผู้ใช้' });
    }

    // รับข้อมูลจาก request body
    const { name, companyName, phoneNumber, taxNumber } = req.body;

    try {
        // อัพเดตข้อมูลโปรไฟล์
        user.username = name || user.username; // ตรวจสอบค่าที่ได้มา ถ้าไม่มีจะใช้ค่าตามเดิม
        user.companyName = companyName || user.companyName;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.taxNumber = taxNumber || user.taxNumber;

        // บันทึกข้อมูลที่แก้ไขลงในฐานข้อมูล
        await user.save();

        // ส่ง response กลับไปว่าแก้ไขสำเร็จ
        return res.status(200).json({
            message: 'อัปเดตโปรไฟล์สำเร็จแล้ว',
            user: {
                username: user.username,
                companyName: user.companyName,
                phoneNumber: user.phoneNumber,
                taxNumber: user.taxNumber
            }
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// ส่งออกโมดูล
module.exports = {
    getUsers,
    getProfile,
    editProfile
}