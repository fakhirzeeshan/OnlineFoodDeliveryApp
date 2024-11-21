// controllers/UserController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const User = require('../Models/UserModel');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Uploads/'); // Specify the uploads directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append current timestamp to the original file name
    }
});

// Multer middleware
const upload = multer({ storage });

// Email and password validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


// Add a list of valid country codes
const countryCodes = {
    '+1': 'USA',
    '+61': 'Australia',
    '+44': 'UK',
    '+91': 'India',
    '+81': 'Japan',
    '+49': 'Germany',
    '+33': 'France',
    '+39': 'Italy',
    '+34': 'Spain',
};

// POST
// http://localhost:5000/api/users/register

// Register a new user with image upload
const register = async (req, res) => {
    const { username, useremail, userpassword, confirmpassword, userphone , countryCode  } = req.body;
    const userimage = req.file ? req.file.path : null; // Default path if no image uploaded

    // Validate email
    if (!emailRegex.test(useremail)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    // Validate password
    if (!passwordRegex.test(userpassword)) {
        return res.status(400).json({
            error: 'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.'
        });
    }

    // Check if passwords match
    if (userpassword !== confirmpassword) {
        return res.status(400).json({ error: 'Passwords do not match.' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ Useremail: useremail });
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists.' });
    }

      // Validate phone number
      if (!countryCodes[countryCode]) {
        return res.status(400).json({ error: 'Invalid country code.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userpassword, salt);

    // Create a new user
    const newUser = new User({
        Username: username,
        Useremail: useremail,
        Userpassword: hashedPassword,
        Userimage: userimage,
        Userphone: `${countryCode}${userphone}`,
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User registered successfully!', user: savedUser });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user: ' + error.message });
    }
};


// UPDATE 
// http://localhost:5000/api/users/:id

// Update user information with profile image
// UPDATE 
// http://localhost:5000/api/users/:id

// Update user information with profile image
const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { username, useremail, userpassword, confirmpassword, userphone, countryCode } = req.body;
    const userimage = req.file ? req.file.path : null; // Get the uploaded image path if updated

    // Validate email
    if (!emailRegex.test(useremail)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    // Check if the email already exists (excluding the current user)
    const existingUser = await User.findOne({ Useremail: useremail });
    if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({ error: 'Email already in use by another user.' });
    }

    // Validate phone number and country code
    if (!countryCodes[countryCode]) {
        return res.status(400).json({ error: 'Invalid country code.' });
    }

    if (!userphone) {
        return res.status(400).json({ error: 'Phone number is required.' });
    }

    // Prepare data to update
    let updateData = {
        Username: username,
        Useremail: useremail,
        Userphone: `${countryCode}${userphone}` // Concatenate country code and phone number
    };

    // Check if user wants to update password
    if (userpassword && confirmpassword) {
        if (!passwordRegex.test(userpassword)) {
            return res.status(400).json({
                error: 'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.'
            });
        }

        if (userpassword !== confirmpassword) {
            return res.status(400).json({ error: 'Passwords do not match.' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userpassword, salt);
        updateData.Userpassword = hashedPassword;
    }

    // If a new image is uploaded, update the image path
    if (userimage) {
        updateData.Userimage = userimage;
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json({ message: 'User updated successfully!', user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Error updating user: ' + error.message });
    }
};


// LOGIN
// http://localhost:5000/api/users/login

// User login
const login = async (req, res) => {
    const { useremail, userpassword } = req.body;

    // Validate email
    if (!emailRegex.test(useremail)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    try {
        const user = await User.findOne({ Useremail: useremail });
        if (!user) return res.status(400).json({ error: 'Invalid Email or Password.' });

        const isMatch = await bcrypt.compare(userpassword, user.Userpassword);
        if (!isMatch) return res.status(400).json({ error: 'Invalid Email or Password' });

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, 'regsecret', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful!', token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in: ' + error.message });
    }
};

// GET BY ID
// http://localhost:5000/api/users/:id

// Get user by ID
const getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found.' });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user: ' + error.message });
    }
};

// GET
// http://localhost:5000/api/users

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users: ' + error.message });
    }
};

// DELTE 
// http://localhost:5000/api/users/:id

// Delete user
const deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) return res.status(404).json({ error: 'User not found.' });

        res.status(200).json({ message: 'User deleted successfully!', user: deletedUser });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user: ' + error.message });
    }
};

module.exports = {
    register,
    updateUser,
    login,
    getUserById,
    getAllUsers,
    deleteUser,
    upload // Export the upload middleware for use in routes
};
