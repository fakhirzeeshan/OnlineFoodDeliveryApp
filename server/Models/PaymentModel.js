// // models/PaymentModel.js

// const mongoose = require('mongoose');

// const PaymentSchema = new mongoose.Schema({
//     userId: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'User', 
//         required: true 
//     },
//     orderId: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'Order', 
//         required: true 
//     },
//     amount: { 
//         type: Number, 
//         required: true 
//     },
//     paymentStatus: { 
//         type: String, 
//         enum: ['pending', 'paid', 'failed'], 
//         default: 'pending' 
//     },
//     paymentMethod: { 
//         type: String, 
//         default: 'card' 
//     },
//     stripePaymentId: { 
//         type: String 
//     },
//     paymentDate: { 
//         type: Date, 
//         default: Date.now 
//     }
// });

// module.exports = mongoose.model('Payment', PaymentSchema);
