// ดึงโมเดลที่เกี่ยวข้องสินค้าจากโฟลเดอร์ models
const Distributor = require('../models/distributorModel');

// ดูผู้จัดจำหน่ายทั้งหมด
const getDistributors = async (req, res) => {
    try {
        // เรียกดูข้อมูลผู้จัดจำหน่ายทั้งหมด
        const distributors = await Distributor.find();
        return res.status(200).json({
            count: distributors.length,
            distributors
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// เพิ่มผู้จัดจำหน่าย (Add Distributor)
const addDistributor = async (req, res) => {
    // รับข้อมูล name, email, address และ contactNumber
    const { name, email, address, contactNumber } = req.body;

    try {
        // ตรวจสอบว่ามีการใส่ชื่อของผู้จัดจำหน่ายหรือไม่
        if (!name || name === "") {
            return res.status(400).json({ message: 'กรุณาใส่ชื่อของผู้จัดจำหน่าย' });
        }

        // ตรวจสอบว่ามีการใส่อีเมล์ของผู้จัดจำหน่ายหรือไม่
        if (!email || email === "") {
            return res.status(400).json({ message: 'กรุณาใส่อีเมล์ของผู้จัดจำหน่าย' });
        }

        // ตรวจสอบว่ามีการใส่ที่อยู่ของผู้จัดจำหน่ายหรือไม่
        if (!address || address === "") {
            return res.status(400).json({ message: 'กรุณาใส่ที่อยู่ของผู้จัดจำหน่าย' });
        }

        // ตรวจสอบว่ามีการใส่หมายเลขติดต่อของผู้จัดจำหน่ายหรือไม่
        if (!contactNumber || contactNumber === "") {
            return res.status(400).json({ message: 'กรุณาใส่หมายเลขติดต่อของผู้จัดจำหน่าย' });
        }

        // ตรวจสอบว่าผู้ติดต่อคนนี้มีอยู่ในระบบแล้วหรือไม่
        const distributorName = await Distributor.findOne({ name: name });
        if (distributorName) {
            return res.status(400).json({ message: 'ผู้ติดต่อคนนี้มีอยู่ในระบบแล้ว' });
        }

        // เพิ่มข้อมูลผู้จัดจำหน่าย
        const addDistributor = new Distributor({
            name,
            email,
            address,
            contactNumber
        });

        // บันทึกข้อมูลผู้จัดจำหน่าย
        const savedDistributor = addDistributor.save();
        return res.status(201).json({
            message: 'เพิ่มผู้จัดจำหน่ายรายนี้เรียบร้อยแล้ว',
            addDistributor
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// ดูข้อมูลผู้จัดจำหน่ายผ่าน Id
const getDistributor = async (req, res) => {
    // รับข้อมูล id จาก request params
    const { id } = req.params;

    try {
        // เรียกข้อมูลผู้จัดจำหน่ายจาก id
        const distributor = await Distributor.findById(id);
        // ตรวจสอบว่ามีผู้จัดจำหน่ายรายนี้ในระบบหรือไม่
        if (!distributor) {
            return res.status(404).json({ message: 'ไม่พบผู้จัดจำหน่ายรายนี้ในระบบ' });
        }
        return res.status(200).json(distributor);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// ลบผู้จัดจำหน่าย
const deleteDistributor = async (req, res) => {
    // รับข้อมูล id จาก request params
    const { id } = req.params;

    try {
        // ตรวจสอบว่ามีผู้จัดจำหน่ายรายนี้ในระบบหรือไม่
        const distributor = await Distributor.findById(id);
        if (!distributor) {
            return res.status(404).json({ message: 'ไม่พบผู้จัดจำหน่ายรายนี้ในระบบ' });
        }

        // ลบข้อมูลผู้จัดจำหน่ายรายนี้
        const deleteDistributor = await Distributor.findByIdAndDelete(id);
        return res.status(200).json({
            message: 'ลบผู้จัดจำหน่ายรายนี้ออกจากระบบเรียบร้อยแล้ว',
            deleteDistributor
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// แก้ไขข้อมูลผู้จัดจำหน่าย
const updateDistributor = async (req, res) => {
    // รับข้อมูล id จาก request params
    const { id } = req.params;
    // รับข้อมูล name, email, address และ contactNumber จาก request body
    const { name, email, address, contactNumber } = req.body;

    try {
        // ตรวจสอบว่ามีผู้จัดจำหน่ายรายนี้ในระบบหรือไม่
        const distributor = await Distributor.findById(id);
        if (!distributor) {
            return res.status(404).json({ message: 'ไม่พบผู้จัดจำหน่ายรายนี้ในระบบ' });
        }

        // ตรวจสอบว่ามีชื่อของผู้จัดจำหน่ายรายนี้ในระบบหรือไม่
        const findDistributorName = await Distributor.findOne({ name: name });
        if (findDistributorName) {
            return res.status(400).json({ message: 'มีชื่อของผู้จัดจำหน่ายรายนี้ในระบบแล้ว' })
        }

        // ตรวจสอบว่ามีอีเมล์ของผู้จัดจำหน่ายรายนี้ในระบบหรือไม่
        const findDistributorEmail = await Distributor.findOne({ email: email });
        if (findDistributorEmail) {
            return res.status(400).json({ message: 'มีอีเมล์ของผู้จัดจำหน่ายรายนี้ในระบบแล้ว' });
        }

        // แก้ไขข้อมูลผู้จัดจำหน่าย
        const updateDistributor = await Distributor.findByIdAndUpdate(
            id,
            {
                name: name,
                email: email,
                address: address,
                contactNumber: contactNumber,

            },
            { new: true, runValidators: true }
        );
        return res.status(200).json({ 
            message: 'แก้ไขข้อมูลผู้จัดจำหน่ายรายนี้เรียบร้อยแล้ว',
            updateDistributor
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


// ส่งออก Module
module.exports = {
    getDistributors,
    addDistributor,
    getDistributor,
    deleteDistributor,
    updateDistributor
}