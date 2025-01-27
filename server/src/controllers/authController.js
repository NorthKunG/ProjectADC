// Require a jsonwebtoken
const jwt = require('jsonwebtoken');

// Require a user model
const User = require('../models/userModel');

// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            res.status(400).json({
                status: 'error',
                message: 'Email or password is incorrect'
            });
            return;
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '6h' });
        res.status(200).json({
            status: 'success',
            token
        });
        return;
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
        return;
    }
};

// Register
const register = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, address } = req.body;

        // Check require fields
        if (!name || !email || !password || !phoneNumber || !address) {
            res.status(400).json({
                status: 'error',
                message: 'All fields are required'
            });
            return;
        }

        // Create a new user
        const newUser = new User({ name, email, password, phoneNumber, address });
        await newUser.save();

        res.status(201).json({
            status: 'success',
            message: 'User registered successfully'
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
        return;
    }
};

// Add new address
const newAddress = async (req, res) => {
    try {
        const { newAddress } = req.body;

        // Check a new address
        if (!newAddress) {
            res.status(400).json({
                status: 'error',
                message: 'New address is required'
            });
            return;
        }

        // Puu user data from token
        const userId = req.userId;
        console.log(userId);

        // Update address in field address
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
            return;
        }

        // Add new address to array
        user.address.push(newAddress);
        await user.save();

        res.status(200).json({
            status: 'success',
            message: 'Address added successfully',
            user: user.name,
            address: user.address
        });
        return;
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
        return;
    }
};

// ดูข้อมูลผู้ใช้ทั้งหมด
const getUsers = async (req, res) => {
    // เรียกดูข้อมูลผู้ใช้ทั้งหมด
    const users = await User.find();
    return res.status(200).json({
        count: users.length,
        users
    });
}

// Export an api
module.exports = {
    login,
    register,
    newAddress,
    getUsers
}