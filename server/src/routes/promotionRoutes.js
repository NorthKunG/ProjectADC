// Require an express
const express = require('express');

// Pull a router function from express
const router = express.Router();

// Require a middleware auth
const auth = require('../middleware/auth');

// Require a promotion controller
const promotionController = require('../controllers/promotionController');

// Routers
router.post('/', auth, promotionController.addedPromotion);
router.get('/', auth, promotionController.getPromotions);
router.delete('/:id', auth, promotionController.deletePromotion);
router.put('/:id', auth, promotionController.updatePromotion);
router.post('/:id', auth, promotionController.addProductToPromotion);

// Export a route
module.exports = router;