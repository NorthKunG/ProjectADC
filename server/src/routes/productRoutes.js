const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const cache = require('../middleware/cache');
const auth = require('../middleware/auth');

router.get('/list', productController.getProducts);
router.post('/', auth, productController.createProduct);
router.get('/item/:id', productController.getProductById);
router.delete('/:id', productController.deleteProduct);
router.put('/:id', productController.updateProduct);
router.get('/search', productController.searchProduct);
router.get('/list/category/:categoryId', productController.getProductByCategory);

module.exports = router;