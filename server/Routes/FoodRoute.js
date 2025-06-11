const express = require('express');
const { createFood, getAllFoods, getFoodById, updateFood, deleteFood } = require('../Controllers/FoodController');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Set destination for uploaded files

// Create food item
router.post('/create', upload.single('image'), createFood);

// Get all food items
router.get('/', getAllFoods);

// Get a specific food item
router.get('/:id', getFoodById);

// Update a food item
router.put('/:id', upload.single('image'), updateFood);

// Delete a food item
router.delete('/:id', deleteFood);

module.exports = router;
