const express = require('express');
const router = express.Router();
const { placeOrder, getUserOrders, getAllOrders, updateOrderStatus, createCheckoutSession} = require('../Controllers/OrderController');
const { authenticateToken , verifyToken  } = require('../Middleware/authMiddleware');
const {authorizeRole} = require('../Middleware/roleMiddleware')

// User-side routes
router.post('/place-order',  authenticateToken, placeOrder);         // Place order for a specific user
router.get('/user/:userId', authenticateToken, getUserOrders);      // Get user's orders

// Admin-side routes
router.get('/', getAllOrders);                      // Get all orders for admin
router.patch('/:orderId' , updateOrderStatus);       // Update order status

router.post('/create-checkout-session' , createCheckoutSession);      

module.exports = router;
