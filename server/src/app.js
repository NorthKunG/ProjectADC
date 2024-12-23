require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const cors = require('cors');

// Require a body-parser
const bodyParser = require('body-parser');

const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const authRoutes = require('./routes/authRoutes');

// Require a cart routes
const cartRoutes = require('./routes/cartRoutes');

// Require an order routes
const orderRoutes = require('./routes/orderRoutes');

// Require a distributor routes
const distributorRoutes = require('./routes/distributorRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);

// Use api cart
app.use('/api/carts', cartRoutes);

// Use api order
app.use('/api/orders', orderRoutes);

// Use api distributor
app.use('/api/distributors', distributorRoutes);

app.use((err, req, res, next) => {
    req.status(err.status || 500).json({
        message: err || 'เกิดข้อผิดพลาด'
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));