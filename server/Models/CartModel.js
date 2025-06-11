const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    foodItems: [{
        foodId: { type: String, required: true },
        foodname: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 1 },
        selectedCrust: { type: String, required: true },
        selectedSize: { type: String, required: true },
        image: { type: String, required: true } // Add image field here
    }]
});

module.exports = mongoose.model('Cart', cartSchema);
