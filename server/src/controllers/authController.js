const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const login = async (req, res) => {
    try {
        const user = await User.findOne(req.body.email);
        if (!user || !(await user.matchPassword(req.body.password))) {
            res.status(400).json({
                status: 'error',
                message: 'Email or password is incorrect'
            });
            return;
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
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

const register = async (req, res) => {
    try {
        const user = await User.findOne(req.body.email);
        if (user) {
            res.status(400).json({
                status: 'error',
                message: 'Email is already'
            });
            return;
        }
        const createUser = await User.create(req.body);
        res.status(200).json({
            status: 'success',
            message: 'Register successfully'
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

module.exports = {
    login,
    register
}//