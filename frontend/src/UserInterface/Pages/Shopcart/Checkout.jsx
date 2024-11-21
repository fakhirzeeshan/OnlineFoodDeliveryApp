import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import CheckoutCrouselBanner from '../../Components/Shopcart/CheckoutCrouselBanner';
import Footer from '../../Components/Footer'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState('CARD');
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [shippingCharges, ] = useState(10.00);
    const [billingInfo, setBillingInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: ''
    });

    const notifyIfCartEmpty = () => toast.error("Your cart is empty. Please add items before placing an order.");
    const notifyOrderSuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    const userId = localStorage.getItem('userId');
    console.log("Retrieved userId from localStorage:", userId);

    useEffect(() => {
        const fetchCartItems = async () => {
            console.log("Fetching cart for user ID:", userId); // Log userId
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/carts/${userId}`);
                    setCartItems(response.data.foodItems || []); // Handle undefined case
                    const total = response.data.foodItems?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
                    console.log("Total Amount Calculated:", total);
                    setTotalAmount(total + shippingCharges);
                } catch (error) {
                    console.error("Error fetching cart items:", error);
                }
            } else {
                console.error("User ID is not available.");
            }
        };
        fetchCartItems();
    }, [userId , shippingCharges]);

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        console.log("Cart Items before placing order:", cartItems); // Log the items

        if (cartItems.length === 0) {
            notifyIfCartEmpty();
            return; // Exit the function if there are no items
        }

        // Retrieve token from localStorage
        const token = localStorage.getItem('token');

        try {
            const orderData = {
                userId,
                paymentMethod,
                foodItems: cartItems.map(item => ({
                    foodId: item.foodId,
                    foodname: item.foodname,
                    quantity: item.quantity,
                    price: item.price,
                    name: item.foodname,
                    selectedCrust: item.selectedCrust,
                    selectedSize: item.selectedSize,
                })),
                totalAmount: totalAmount,
                billingInfo
            };

            const config = {
                headers: {
                    Authorization: `Bearer ${token}` // Add the token to headers
                }
            };

            if (paymentMethod === 'CARD') {
                // Place Order for CARD
                const response = await axios.post('http://localhost:5000/api/orders/place-order', orderData, config);
                notifyOrderSuccess(response.data.message);

                // Clear the cart using the new clear endpoint
                await axios.post('http://localhost:5000/api/carts/clear', { userId }, config);

                // Create a Stripe checkout session
                const stripeSessionResponse = await axios.post('http://localhost:5000/api/orders/create-checkout-session', {
                    items: orderData.foodItems,
                    totalAmount: totalAmount,
                    shippingCharges: shippingCharges,
                    successUrl: `${window.location.origin}/success`,
                    cancelUrl: `${window.location.origin}/cancel`,
                }, config);

                // Redirect to Stripe checkout
                window.location.href = stripeSessionResponse.data.url;
            } else if (paymentMethod === 'CASH_ON_DELIVERY') {
                // Place order for Cash on Delivery
                const response = await axios.post('http://localhost:5000/api/orders/place-order', orderData, config);
                notifyOrderSuccess(response.data.message);

                // Clear the cart using the new clear endpoint
                await axios.post('http://localhost:5000/api/carts/clear', { userId }, config);

                // Navigate to success page
                window.location.href = '/success'; // Adjust this path as needed
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred while placing the order.";
            notifyError(errorMessage);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBillingInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };

    return (
        <>
            <Navbar />
            <CheckoutCrouselBanner />
            <section className="checkout-section fix section-padding border-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <form onSubmit={handlePlaceOrder}>
                                <div className="row g-4">
                                    <div className="col-md-7 col-lg-8 col-xl-9">
                                        <div className="checkout-single-wrapper">
                                            <div className="checkout-single boxshado-single">
                                                <h4>Billing Address</h4>
                                                <div className="checkout-single-form">
                                                    <div className="row g-4">
                                                        <div className="col-lg-6">
                                                            <div className="input-single">
                                                                <input
                                                                    type="text"
                                                                    name="firstName"
                                                                    value={billingInfo.firstName}
                                                                    onChange={handleInputChange}
                                                                    required
                                                                    placeholder="First Name"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="input-single">
                                                                <input
                                                                    type="text"
                                                                    name="lastName"
                                                                    value={billingInfo.lastName}
                                                                    onChange={handleInputChange}
                                                                    required
                                                                    placeholder="Last Name"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="input-single">
                                                                <input
                                                                    type="email"
                                                                    name="email"
                                                                    value={billingInfo.email}
                                                                    onChange={handleInputChange}
                                                                    required
                                                                    placeholder="Your Email"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="input-single">
                                                                <select
                                                                    className="country-select"
                                                                    value={paymentMethod}
                                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                                    required
                                                                >
                                                                    <option value="CARD">CARD</option>
                                                                    <option value="CASH_ON_DELIVERY">CASH ON DELIVERY</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <div className="input-single">
                                                                <textarea
                                                                    name="address"
                                                                    value={billingInfo.address}
                                                                    onChange={handleInputChange}
                                                                    placeholder="Address"
                                                                    required
                                                                ></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="checkout-single boxshado-single">
                                                <h4>Order Summary</h4>
                                                <ul>
                                                    {cartItems.length > 0 ? (
                                                        cartItems.map((item) => (
                                                            <li key={item.foodId}>
                                                                <div className='col-md-4'>
                                                                    <img src={item.image} height={50} width={80} alt="" />
                                                                </div>
                                                                {item.foodname} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                                                            </li>
                                                        ))
                                                    ) : (
                                                        <li>No items in cart.</li>
                                                    )}
                                                </ul>
                                                <p>Shipping Charges: ${shippingCharges.toFixed(2)}</p>
                                                <p><strong>Total: ${totalAmount.toFixed(2)}</strong></p>
                                            </div>

                                            <div className="mt-4">
                                                <button type="submit" className="theme-btn border-radius-none">
                                                    {paymentMethod === 'CARD' ? 'Pay with Stripe' : 'Place Order'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <ToastContainer />
        </>
    );
};

export default Checkout;
