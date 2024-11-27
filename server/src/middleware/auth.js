const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
        return;
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Please login'
        });
        return;
    }
};

module.exports = auth;