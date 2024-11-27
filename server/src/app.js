// require('dotenv').config();
// require('./config/database').connect();
const express = require('express');
const cors = require('cors');
// const productRoutes = require('./routes/productRoutes');
// const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// app.use('/api/products', productRoutes);
// app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    req.status(err.status || 500).json({
        message: err.message || 'เกิดข้อผิดพลาด'
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));