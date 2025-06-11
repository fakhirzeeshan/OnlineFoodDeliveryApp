import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import ShopcartCrouselBanner from '../../Components/Shopcart/ShopcartCrouselBanner';
import Footer from '../../Components/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Shopcart = () => {
    const [cartItems, setCartItems] = useState([]);
    const notify = () => toast.error("Your cart is empty. Please add items before proceeding to checkout.");
    

    // Fetch cart items from the backend when the component mounts
    useEffect(() => {
        const fetchCartItems = async () => {
            const userId = localStorage.getItem('userId'); // Retrieve user ID from local storage
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/carts/${userId}`);
                    setCartItems(response.data.foodItems); // Update state with cart 
                    console.log(response.data)
                } catch (error) {
                    console.error("Error fetching cart items:", error);
                }
            }
        };
        fetchCartItems();
    }, []);

    // Function to update the quantity of a cart item
    // const updateQuantity = async (foodId, newQuantity) => {
    //     if (newQuantity < 1) return; // Prevent quantity from going below 1

    //     const userId = localStorage.getItem('userId');
    //     try {
    //         await axios.put(`http://localhost:5000/api/carts/update/${userId}/${foodId}`, { quantity: newQuantity });
    //         setCartItems(prevItems =>
    //             prevItems.map(item =>
    //                 item.foodId === foodId ? { ...item, quantity: newQuantity } : item
    //             )
    //         );
    //     } catch (error) {
    //         console.error("Error updating quantity:", error);
    //     }
    // };

    // Function to remove an item from the cart
    const handleRemoveItem = async (foodId) => {
        const userId = localStorage.getItem('userId'); // Get user ID from local storage

        try {
            const response = await axios.post('http://localhost:5000/api/carts/remove', { userId, foodId });
            setCartItems(response.data.foodItems); // Update the cart items in state
        } catch (err) {
            console.error("Error removing item from cart:", err.response ? err.response.data : err.message);
        }
    };

    // Function to calculate total price
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <>
            {/* Navbar */}
            <Navbar />

            {/* Shop Carousel Banner */}
            <ShopcartCrouselBanner />

            <section className="cart-section section-padding fix">
                <div className="container">
                    <div className="main-cart-wrapper">
                        <div className="row">
                            <div className="col-12">
                                <div className="cart-wrapper">
                                    <div className="cart-items-wrapper">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th>Subtotal</th>
                                                    <th>Remove</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cartItems.map(item => (
                                                    <tr key={item.foodId} className="cart-item">
                                                        <td className="cart-item-info">
                                                            <img src={`http://localhost:5000/${item.image}`} height={100} width={100} alt={item.foodname} />
                                                        </td>
                                                        <td className="cart-item-price">
                                                            $ <span className="base-price">{item.price.toFixed(2)}</span>
                                                        </td>
                                                        <td>
                                                            <div className="cart-item-quantity">
                                                                <span className="cart-item-quantity-amount">{item.quantity}</span>
                                                                {/* <div className="cart-item-quantity-controller">
                                                                    <button onClick={() => updateQuantity(item.foodId, item.quantity - 1)} className="cart-decrement">
                                                                        <i className="far fa-caret-down"></i>
                                                                    </button>
                                                                    <button onClick={() => updateQuantity(item.foodId, item.quantity + 1)} className="cart-increment">
                                                                        <i className="far fa-caret-up"></i>
                                                                    </button>
                                                                </div> */}
                                                            </div>
                                                        </td>
                                                        <td className="cart-item-price">
                                                            $ <span className="total-price">{(item.price * item.quantity).toFixed(2)}</span>
                                                        </td>
                                                        <td className="cart-item-remove">
                                                            <button onClick={() => handleRemoveItem(item.foodId)}>
                                                                <i className="fas fa-times"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="cart-wrapper-footer">
                                        <form action="https://modinatheme.com/html/foodking-html/shop-cart.html">
                                            <input type="text" name="promo-code" id="promoCode" placeholder="Promo code" />
                                            <button type="submit" className="theme-btn border-radius-none">
                                                Apply Code
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6"></div>
                            <div className="col-xl-6">
                                <div className="cart-pragh-box">
                                    <div className="cart-graph">
                                        <h4>Cart Total</h4>
                                        <ul>
                                            <li>
                                                <span>Subtotal</span>
                                                <span>${calculateTotal().toFixed(2)}</span>
                                            </li>
                                            <li>
                                                <span>Shipping</span>
                                                <span>$10</span>
                                            </li>
                                            <li>
                                                <span>Total</span>
                                                <span>${(calculateTotal() + 10).toFixed(2)}</span> {/* Including shipping */}
                                            </li>
                                        </ul>
                                        <div className="chck">
                                            <Link
                                                to='/checkout'
                                                className={`theme-btn border-radius-none ${cartItems.length === 0 ? 'disabled' : ''}`}
                                                onClick={(e) => {
                                                    if (cartItems.length === 0) {
                                                        e.preventDefault(); // Prevent navigation
                                                        notify("Your cart is empty. Please add items before proceeding to checkout.");
                                                    }
                                                }}
                                            >
                                                Proceed to Checkout
                                            </Link>
                                            
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
            <ToastContainer/>
        </>
    );
};

export default Shopcart;
