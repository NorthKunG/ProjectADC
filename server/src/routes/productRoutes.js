const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const cache = require('../middleware/cache');
const auth = require('../middleware/auth');

router.get('/', cache(300), productController.getProducts);
router.post('/', auth, productController.createProduct);
router.get('/:id', productController.getProductById);
router.delete('/:id', productController.deleteProduct);
router.put('/:id', productController.updateProduct);

module.exports = router;