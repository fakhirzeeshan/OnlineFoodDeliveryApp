// src/pages/Success.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Success.css'; // Create a CSS file for styles

const Success = () => (
    <div className="success-container">
        <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            Payment Successful!
        </motion.h1>
        <motion.p
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            Thank you for your purchase.
        </motion.p>
        <Link to="/" className="continue-shopping-link"> {/* Add Link to continue shopping */}
            Continue Shopping
        </Link>
    </div>
);

export default Success;
