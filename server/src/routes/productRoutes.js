const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const cache = require('../middleware/cache');
const auth = require('../middleware/auth');

router.get('/', productController.getProducts);
router.post('/', /* auth ,*/ productController.addProduct);
router.get('/search', productController.searchProductByName);
router.get('/filter', productController.filterProduct);
router.get('/compare', productController.compareProduct);
router.get('/noICT', productController.getProductNoIct);
router.get('/:id', productController.getProduct);
router.delete('/:id', productController.deleteProduct);
router.put('/:id', productController.updateProduct);
router.post('/uploadFile', productController.uploadFile);

module.exports = router;