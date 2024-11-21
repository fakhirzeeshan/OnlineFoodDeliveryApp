const Food = require('../Models/FoodModel');

// Create a new food item
exports.createFood = async (req, res) => {
    const { foodname, description, price, category } = req.body;
    const image = req.file.path; // Assuming you're using multer for file uploads

    try {
        const newFood = new Food({ foodname, description, price, image, category });
        await newFood.save();
        res.status(201).json({ message: 'Food item created successfully', food: newFood });
    } catch (error) {
        res.status(400).json({ error: 'Error creating food item: ' + error.message });
    }
};

// Get all food items
exports.getAllFoods = async (req, res) => {
    try {
        // const foods = await Food.find().populate('chefId', 'chefname'); // Populate chef name
        const foods = await Food.find();
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching food items: ' + error.message });
    }
};

// Get a specific food item by ID
exports.getFoodById = async (req, res) => {
    try {
        // const food = await Food.findById(req.params.id).populate('chefId', 'chefname');
        const food = await Food.findById(req.params.id);
        if (!food) {
            return res.status(404).json({ error: 'Food item not found' });
        }
        res.status(200).json(food);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching food item: ' + error.message });
    }
};

// Update a food item
exports.updateFood = async (req, res) => {
    const { foodname, description, price, category } = req.body;
    const updatedData = {
        foodname,
        description,
        price,
        category,
    };

    if (req.file) {
        updatedData.image = req.file.path; // Update image if provided
    }

    try {
        const food = await Food.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!food) {
            return res.status(404).json({ error: 'Food item not found' });
        }
        res.status(200).json({ message: 'Food item updated successfully', food });
    } catch (error) {
        res.status(400).json({ error: 'Error updating food item: ' + error.message });
    }
};

// Delete a food item
exports.deleteFood = async (req, res) => {
    try {
        const food = await Food.findByIdAndDelete(req.params.id);
        if (!food) {
            return res.status(404).json({ error: 'Food item not found' });
        }
        res.status(200).json({ message: 'Food item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting food item: ' + error.message });
    }
};
