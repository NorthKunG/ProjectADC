const express = require('express');
const router = express.Router();
// const categoryController = require('../controllers/categoryController');
// const cache = require('../middleware/cache')';
// const auth = require('../middleware/auth');

router.get('/', categoryController.getCategory);
router.post('/', auth(), categoryController.createCategory);
router.get('/:id', categoryController.getCategoryById);
router.delete('/:id', categoryController.deleteCategory);
router.put('/:id', categoryController.updateCategory);

module.exports = router;