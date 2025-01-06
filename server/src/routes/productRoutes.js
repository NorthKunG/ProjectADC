const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const cache = require('../middleware/cache');
const auth = require('../middleware/auth');

router.get('/', productController.getProducts);
router.post('/', /* auth ,*/ productController.createProduct);
router.get('/search', productController.searchProduct);
router.get('/:id', productController.getProductById);
router.delete('/:id', productController.deleteProduct);
router.put('/:id', productController.updateProduct);
router.get('/spec/:categoryId', productController.getSpecs);

module.exports = router;