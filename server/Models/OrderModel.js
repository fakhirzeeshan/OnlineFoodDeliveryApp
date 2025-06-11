const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    foodItems: [
        {
            foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
            foodname: String,
            quantity: Number,
            price: Number,
            selectedCrust: String,
            selectedSize: String,
        }
    ],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['CARD', 'CASH_ON_DELIVERY'], required: true },
    billingInfo: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true },
    },
    status: { type: String, default: 'PENDING' }, // e.g. PENDING, COMPLETED, CANCELLED
    timestamp: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
