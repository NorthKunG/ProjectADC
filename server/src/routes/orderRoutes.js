// Require an express
const express = require('express');

// Pull a router function from express
const router = express.Router();

// Require a middleware auth
const auth = require('../middleware/auth');

// Require a order controller
const orderController = require('../controllers/orderController');

// Routers
router.post('/new', auth, orderController.newOrder);
router.get('/', auth, orderController.getOrder);

// Export a route
module.exports = router;