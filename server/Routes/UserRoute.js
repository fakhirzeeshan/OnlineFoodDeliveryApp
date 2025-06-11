// routes/UserRoutes.js

const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');

// Multer middleware
const upload = UserController.upload;

// User routes
router.post('/register', upload.single('userimage'), UserController.register);
router.put('/:id', upload.single('userimage'), UserController.updateUser);
router.post('/login', UserController.login);
router.get('/:id', UserController.getUserById);
router.get('/', UserController.getAllUsers);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
