const express = require('express');
const router = express.Router();
const reservationController = require('../Controllers/ReservationController');
const { authenticateToken } = require('../Middleware/authMiddleware');
const {authorizeRole} = require('../Middleware/roleMiddleware')

// User-side routes
router.post('/', authenticateToken, reservationController.createReservation);
router.get('/user/:userId', authenticateToken, reservationController.getUserReservations);

// Admin-side routes
router.get('/' , reservationController.getAllReservations);
router.put('/:reservationId/status', reservationController.updateReservationStatus);
router.delete('/:reservationId', reservationController.deleteReservation);

module.exports = router;
