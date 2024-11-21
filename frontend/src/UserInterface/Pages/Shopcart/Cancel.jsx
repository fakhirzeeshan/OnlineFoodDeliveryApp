// src/pages/Cancel.js
import React from 'react';
import { motion } from 'framer-motion';
import './Cancel.css'; // Create a CSS file for styles
import { Link } from 'react-router-dom';

const Cancel = () => (
    <div className="cancel-container">
        <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            Payment Cancelled
        </motion.h1>
        <motion.p
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            We're sorry to see you go. If you have any questions, feel free to reach out.
        </motion.p>
        <Link to="/" className="continue-shopping-link"> {/* Add Link to continue shopping */}
            Continue Shopping
        </Link>
    </div>
);

export default Cancel;
