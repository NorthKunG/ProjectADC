// ดึง Dependencies จาก package
const fs = require('fs');
const multer = require('multer');
const path = require('path');

// ดึงโมเดลที่เกี่ยวข้องสินค้าจากโฟลเดอร์ models
const CSCode = require('../models/csCodeModel');

// การตั้งค่า Multer เพื่อเก็บไฟล์ในหน่วยความจำ
const settingMulter = multer({ storage: multer.memoryStorage() }).single('file');

// ระบบอัพโหลดข้อมูลผ่านไฟล์ .json
const uploadFileJson = async (req, res) => {
    // ใช้ multer สำหรับการอัปโหลดไฟล์
    settingMulter(req, res, async (error) => {
        // ตรวจสอบข้อผิดพลาด
        if (error) {
            return res.status(400).json({ message: 'ระบบเกิดข้อผิดพลาด' });
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

            // ดึงรายการ code จากไฟล์ที่อัปโหลด
            const codesFromFile = parsedData.map(item => item.code);

            // ค้นหา CSCode ที่มีอยู่ในฐานข้อมูลแล้ว
            const existingCSCodes = await CSCode.find({ code: { $in: codesFromFile } });

            // ดึงรายการ code ที่มีอยู่แล้ว
            const existingCodesSet = new Set(existingCSCodes.map(item => item.code));

            // กรองเฉพาะ CSCode ที่ยังไม่มีในฐานข้อมูล
            const newCSCodes = parsedData.filter(item => !existingCodesSet.has(item.code));

            if (newCSCodes.length === 0) {
                return res.status(400).json({ message: 'ไม่มีข้อมูลใหม่ที่จะเพิ่ม เนื่องจากทั้งหมดมีอยู่แล้ว' });
            }

            // นำเข้าข้อมูลใหม่ทั้งหมด
            const addedCSCodes = await CSCode.insertMany(parsedData);

            return res.status(200).json({
                message: 'เพิ่มข้อมูลใหม่ลงในระบบเรียบร้อยแล้ว',
                addedCount: addedCSCodes.length,
                skippedCount: parsedData.length - addedCSCodes.length
            });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    });
};

// เพิ่มข้อมูล
const addCSCode = async (req, res) => {
    // รับข้อมูลจาก request body
    const { code, description } = req.body;

    try {
        // ตรวจสอบว่ามีการใส่คำอธิบายหรือไม่
        if (!description) {
            const description = '-'
        }

        // ตรวจสอบว่ามี CSCode นี้อยู่แล้วหรือไม่
        const existingCSCode = await CSCode.findOne({ code });
        if (existingCSCode) {
            return res.status(400).json({ message: "CSCode นี้มีอยู่แล้ว" });
        }

        // สร้าง CSCode ใหม่
        const addedCSCode = new CSCode({ code, description });

        // บันทึก CSCode ใหม่
        const savedCSCode = await addedCSCode.save();

        return res.status(200).json({ message: 'เพิ่มข้อมูลใหม่ลงในระบบเรียบร้อยแล้ว', savedCSCode });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// ดูข้อมูลทั้งหมด
const getCSCodes = async (req, res) => {
    try {
        // เรียกข้อมูลทั้งหมด
        const CSCodes = await CSCode.find();

        // ตรวจสอบว่ามีข้อมูลหรือไม่
        if (CSCodes.length === 0) {
            return res.status(400).json({ message: 'ไม่พบข้อมูล CSCode' });
        }
        return res.status(200).json({ count: CSCodes.length, CSCodes });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// ส่งออก API
module.exports = {
    uploadFileJson,
    addCSCode,
    getCSCodes
}