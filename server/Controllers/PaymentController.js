// // controllers/PaymentController.js

// const Payment = require('../Models/PaymentModel');
// const Order = require('../Models/OrderModel');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Stripe Secret Key

// // Create a Payment Intent and Handle Payment
// exports.createPayment = async (req, res) => {
//     try {
//         const { paymentMethodId, orderId, amount } = req.body;

//         if (!paymentMethodId || !orderId || !amount) {
//             return res.status(400).json({ error: 'Missing required fields' });
//         }

//         // Additional logging to debug
//         console.log(`Received orderId: ${orderId}, paymentMethodId: ${paymentMethodId}, amount: ${amount}`);


//         // Find the order to ensure it exists
//         const order = await Order.findById(orderId);
//         if (!order) {
//             return res.status(404).json({ error: 'Order not found' });
//         }

//         // Create a payment intent with Stripe
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: amount * 100, // amount in cents
//             currency: 'usd',
//             payment_method: paymentMethodId,
//             confirm: true, // Immediately confirm the payment
//         });

//         // Save the payment information to the database
//         const payment = new Payment({
//             userId: req.user.id,
//             orderId: orderId,
//             amount: amount,
//             paymentStatus: 'paid',
//             stripePaymentId: paymentIntent.id,
//             paymentMethod: 'card',
//         });

//         await payment.save();
//         await Order.findByIdAndUpdate(orderId, { status: 'paid' });

//         return res.status(200).json({ success: true, message: 'Payment successful!', paymentIntent });
//     } catch (error) {
//         console.error('Error processing payment:', error);
//         return res.status(500).json({ success: false, message: 'Payment failed!', error: error.message });
//     }
// };

// // Get Payment History for a User
// exports.getPaymentHistory = async (req, res) => {
//     try {
//         const payments = await Payment.find({ userId: req.user.id }).populate('orderId');
//         res.status(200).json({ success: true, payments });
//     } catch (error) {
//         console.error('Error fetching payment history:', error);
//         return res.status(500).json({ success: false, message: 'Error fetching payment history!' });
//     }
// };
