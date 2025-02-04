const express = require('express');
const router = express.Router();
const newProductController = require('../controllers/newProductController');
const auth = require('../middleware/auth');

// กำหนดตัวแปร
const adminAuth = auth.adminAuth;

router.get('/', newProductController.getProducts);
router.post('/', adminAuth, newProductController.addProduct);
router.delete('/:id', adminAuth, newProductController.deleteProduct);
router.put('/:id', adminAuth, newProductController.updateProduct);

module.exports = router;