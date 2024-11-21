const Chef = require('../models/ChefModel');
const path = require('path');
const multer = require('multer');

// Configure multer for file uploads (Chef images)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/ChefImages/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to file name
    }
});

const upload = multer({ storage });

// CREATE: Add a new chef
const createChef = async (req, res) => {
    const { chefname, chefbio, chefspecialty } = req.body;
    const chefimage = req.file ? req.file.path : '';

    const newChef = new Chef({
        chefname,
        chefbio,
        chefspecialty,
        chefimage
    });

    try {
        const savedChef = await newChef.save();
        res.status(201).json({ message: 'Chef created successfully', chef: savedChef });
    } catch (error) {
        res.status(500).json({ error: 'Error creating chef: ' + error.message });
    }
};

// GET: Fetch all chefs
const getAllChefs = async (req, res) => {
    try {
        const chefs = await Chef.find();
        res.status(200).json(chefs);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching chefs: ' + error.message });
    }
};

// GET: Fetch a chef by ID
const getChefById = async (req, res) => {
    const chefId = req.params.id;

    try {
        const chef = await Chef.findById(chefId);
        if (!chef) {
            return res.status(404).json({ error: 'Chef not found' });
        }
        res.status(200).json(chef);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching chef: ' + error.message });
    }
};

// UPDATE: Update a chef's details
const updateChef = async (req, res) => {
    const chefId = req.params.id;
    const { chefname, chefbio, chefspecialty } = req.body;
    const chefimage = req.file ? req.file.path : null;

    try {
        let updateData = { chefname, chefbio, chefspecialty };

        if (chefimage) {
            updateData.chefimage = chefimage;
        }

        const updatedChef = await Chef.findByIdAndUpdate(chefId, updateData, { new: true });

        if (!updatedChef) {
            return res.status(404).json({ error: 'Chef not found' });
        }

        res.status(200).json({ message: 'Chef updated successfully', chef: updatedChef });
    } catch (error) {
        res.status(500).json({ error: 'Error updating chef: ' + error.message });
    }
};

// DELETE: Remove a chef
const deleteChef = async (req, res) => {
    const chefId = req.params.id;

    try {
        const deletedChef = await Chef.findByIdAndDelete(chefId);
        if (!deletedChef) {
            return res.status(404).json({ error: 'Chef not found' });
        }
        res.status(200).json({ message: 'Chef deleted successfully', chef: deletedChef });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting chef: ' + error.message });
    }
};

module.exports = {
    createChef,
    getAllChefs,
    getChefById,
    updateChef,
    deleteChef,
    upload
};
