const express = require('express');
const { addToCart, getCart , removeFromCart , clearCart } = require('../Controllers/CartController');
const router = express.Router();

// Add to Cart
router.post('/add', addToCart);

// Get Cart by User ID
router.get('/:userId', getCart);

// Remove from Cart
router.post('/remove', removeFromCart);

router.post('/clear', clearCart); // Add this line to your routes


module.exports = router;
