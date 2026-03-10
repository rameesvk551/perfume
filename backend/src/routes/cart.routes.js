const express = require('express');
const router = express.Router();
const { getCart, addToCart, removeFromCart } = require('../controllers/cart.controller');
const { protect } = require('../middleware/auth.middleware');

router.route('/').get(protect, getCart).post(protect, addToCart);
router.route('/:productId').delete(protect, removeFromCart);

module.exports = router;
