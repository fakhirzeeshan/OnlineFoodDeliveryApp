const express = require('express');
const { createChef, getAllChefs, getChefById, updateChef, deleteChef, upload } = require('../Controllers/ChefController');

const router = express.Router();

// Create a new chef with image upload
router.post('/create', upload.single('chefimage'), createChef);

// Get all chefs
router.get('/', getAllChefs);

// Get chef by ID
router.get('/:id', getChefById);

// Update chef details
router.put('/:id', upload.single('chefimage'), updateChef);

// Delete a chef
router.delete('/:id', deleteChef);

module.exports = router;
