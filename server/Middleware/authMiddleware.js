const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel'); // Update with your user model path

// Authentication Middleware
const authenticateToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, "regsecret");
    req.user = decoded;

    // Fetch user details from DB (optional but recommended)
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};



module.exports = { authenticateToken };
