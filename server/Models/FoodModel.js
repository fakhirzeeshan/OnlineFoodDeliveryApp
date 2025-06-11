const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    foodname: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    // chefId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Chef', // Reference to the Chef model
    //     required: true,
    // },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

module.exports = mongoose.model('Food', foodSchema);
