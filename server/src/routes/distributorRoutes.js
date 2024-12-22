// Require an express
const express = require('express');

// Pull router function from express
const router = express.Router();

// Require a middleware auth
const auth = require('../middleware/auth');

// Require a distributor controller
const distributorController = require('../controllers/distributorController');

// Routers
router.get('/', distributorController.getDistributors);
router.post('/', distributorController.createDistributor);
router.get('/:id', distributorController.getDistributorById);

// Export a route
module.exports = router;