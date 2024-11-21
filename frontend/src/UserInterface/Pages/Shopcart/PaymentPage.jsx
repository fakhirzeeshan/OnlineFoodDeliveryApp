// import React, { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// // Load Stripe
// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// const CheckoutForm = ({ orderId, amount }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();
//   const [error, setError] = useState(null);
//   const [processing, setProcessing] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) return;

//     setProcessing(true);
//     setError(null);

//     const cardElement = elements.getElement(CardElement);

//     const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: cardElement,
//     });

//     if (paymentError) {
//       setError(paymentError.message);
//       setProcessing(false);
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/api/payments/create', {
//         orderId,
//         paymentMethodId: paymentMethod.id,
//         amount: amount * 100, // amount in cents
//       });

//       if (response.data.success) {
//         alert('Payment successful!');
//         navigate('/'); // Redirect to confirmation page
//       } else {
//         alert('Payment failed! Please try again.');
//       }
//     } catch (error) {
//       console.error('Error processing payment:', error);
//       setError('Payment processing failed. Please try again later.');
//     } finally {
//       setProcessing(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       {error && <div className="error">{error}</div>}
//       <button disabled={processing || !stripe} className="theme-btn">
//         {processing ? 'Processing...' : 'Pay Now'}
//       </button>
//     </form>
//   );
// };

// const Payment = ({ orderId, amount }) => {
//   return (
//     <Elements stripe={stripePromise}>
//       <CheckoutForm orderId={orderId} amount={amount} />
//     </Elements>
//   );
// };

// export default Payment;
