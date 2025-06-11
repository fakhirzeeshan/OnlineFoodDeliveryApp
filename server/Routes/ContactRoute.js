const express = require('express');
const router = express.Router();
const contactController = require('../Controllers/ContactController');

// Route to submit a new contact message
router.post('/contact', contactController.createContact);

// Optional route to get all contact messages (e.g., for admin view)
router.get('/contacts', contactController.getAllContacts);

module.exports = router;
