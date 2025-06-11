import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ProfileImage.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
    const [userProfile, setUserProfile] = useState(null); // Store user profile information
    const userId = localStorage.getItem('userId'); // Get user ID from localStorage
    const notify = () => toast.error("Yout cart is empty. please add items before proceeding to checkout");

    // Check login status and fetch user profile
    useEffect(() => {
        setIsLoggedIn(!!userId); // Update isLoggedIn based on userId
        if (userId) {
            const fetchUserProfile = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/users/${userId}`); // Adjust URL to fetch user profile
                    setUserProfile(response.data); // Assuming response.data contains user profile data
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                }
            };
            fetchUserProfile();
        }
    }, [userId]);

    // Fetch cart items from the backend
    useEffect(() => {
        const fetchCartItems = async () => {
            const userId = localStorage.getItem('userId');
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/carts/${userId}`);
                    setCartItems(response.data.foodItems || []);
                } catch (error) {
                    console.error("Error fetching cart items:", error);
                }
            }
        };
        fetchCartItems();
    }, []);

    // Calculate total price of cart items
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('userId'); // Clear userId from localStorage
        localStorage.removeItem('token'); // Clear token from localStorage
        setIsLoggedIn(false); // Update login state
        setUserProfile(null); // Clear user profile 
    };

    return (
        <>
            <div className="fix-area">
                <div className="offcanvas__info">
                    <div className="offcanvas__wrapper">
                        <div className="offcanvas__content">
                            <div className="offcanvas__top mb-5 d-flex justify-content-between align-items-center">
                                <div className="offcanvas__logo">
                                    <Link to="/">
                                        <img src="/assets/img/logo/logo-grubgo.webp" alt="logo-img" />
                                    </Link>
                                </div>
                                <div className="offcanvas__close">
                                    <button>
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="mobile-menu fix mb-3"></div>
                            <div className="offcanvas__contact">
                                <div className="header-button mt-4">
                                    <Link to="/cart" className="theme-btn">
                                        <span className="button-content-wrapper d-flex align-items-center justify-content-center">
                                            <span className="button-icon"><i className="fal fa-shopping-cart"></i></span>
                                            <span className="button-text">CART</span>
                                        </span>
                                    </Link>
                                    <br /><br />
                                    {isLoggedIn ? (
                                        <div className="dropdown">
                                            <button className="theme-btn dropdown-toggle text-black" type="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                                {/* Display user profile image or a default icon */}
                                                {userProfile ? (
                                                    <img src={userProfile.Userimage} alt="User Profile" className="profile-image" />
                                                ) : (
                                                    <i className="fal fa-user"></i>
                                                )}

                                            </button>
                                            <ul className="dropdown-menu" aria-labelledby="profileDropdown">
                                                <li>
                                                    <Link to="/user-profile" className="dropdown-item">Your Profile</Link>
                                                </li>
                                                <li>
                                                    <Link to="/user-orders" className="dropdown-item">Your Orders</Link>
                                                </li>
                                                <li>
                                                    <Link to="/user-reservations" className="dropdown-item">Your Reservations</Link>
                                                </li>
                                                <li>
                                                    <button onClick={handleLogout} className="dropdown-item">Logout</button>
                                                </li>
                                            </ul>
                                        </div>
                                    ) : (
                                        <Link to="/login" className="theme-btn">
                                            <span className="button-content-wrapper align-items-center">
                                                <span className="button-icon"><i className="fal fa-users"></i></span>
                                                <span className="button-text">LOGIN</span>
                                            </span>
                                        </Link>
                                    )}
                                </div>
                                <div className="social-icon d-flex align-items-center">
                                    <Link href="#"><i className="fab fa-facebook-f"></i></Link>
                                    <Link href="#"><i className="fab fa-twitter"></i></Link>
                                    <Link href="#"><i className="fab fa-youtube"></i></Link>
                                    <Link href="#"><i className="fab fa-linkedin-in"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="offcanvas__overlay"></div>
            <header>
                <div id="header-sticky" className="header-2">
                    <div className="container-fluid">
                        <div className="mega-menu-wrapper">
                            <div className="header-main">
                                <div className="header-left">
                                    <div className="logo">
                                        <Link to="/" className="header-logo">
                                            <img src="/assets/img/logo/logo-3-GRUBGO.webp" alt="logo-img" />
                                        </Link>
                                    </div>
                                    <div className="logo-2">
                                        <Link to="/" className="header-logo">
                                            <img src="/assets/img/logo/logo-grubgo.webp" alt="logo-img" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="header-right d-flex justify-content-end align-items-center">
                                    <div className="mean__menu-wrapper d-none d-lg-block">
                                        <div className="main-menu">
                                            <nav id="mobile-menu">
                                                <ul>
                                                    <li className="has-dropdown active">
                                                        <Link to="/">Home Page</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/aboutus">About Us</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/contact">Contact</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/chefs">Chefs</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/reservation">Reservation</Link>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>

                                    <div className="menu-cart">
                                        <div className="cart-box">
                                            <ul>
                                                {cartItems.length > 0 ? (
                                                    cartItems.map((item) => (
                                                        <li key={item.foodId}>
                                                            <img src={`http://localhost:5000/${item.image}`} alt={item.foodname} />
                                                            <div className="cart-product">
                                                                <a href="#0">{item.foodname}</a>
                                                                <span>${item.price.toFixed(2)} x {item.quantity}</span>
                                                            </div>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li className="border-none">Your cart is empty</li>
                                                )}
                                            </ul>
                                            <div className="shopping-items d-flex align-items-center justify-content-between">
                                                <span>Shopping: ${calculateTotal()}</span>
                                                <span>Total: ${calculateTotal()}</span>
                                            </div>
                                            <div className="cart-button d-flex justify-content-between mb-4">
                                                <Link to="/cart" className="theme-btn">View Cart</Link>
                                                <Link
                                                    to='/checkout'
                                                    className={`theme-btn  ${cartItems.length === 0 ? 'disabled' : ''}`}
                                                    onClick={(e) => {
                                                        if (cartItems.length === 0) {
                                                            e.preventDefault(); // Prevent navigation
                                                            notify("Your cart is empty. Please add items before proceeding to checkout.");
                                                        }
                                                    }}
                                                >
                                                    Checkout
                                                </Link>
                                            </div>
                                        </div>
                                        <Link to="/cart" className="cart-icon">
                                            <i className="far fa-shopping-cart"></i>
                                        </Link>
                                    </div>
                                    <div className="header-button">
                                        {isLoggedIn ? (
                                            <div className="dropdown">
                                                <button className="dropdown-toggle text-black" type="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {/* Display user profile image or a default icon */}
                                                    {userProfile ? (
                                                        <img src={userProfile.Userimage} alt="User Profile" className="profile-image" />
                                                    ) : (
                                                        <i className="fal fa-user"></i>
                                                    )}

                                                </button>
                                                <ul className="dropdown-menu" aria-labelledby="profileDropdown">
                                                    <li>
                                                        <Link to="/user-profile" className="dropdown-item">Your Profile</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/user-orders" className="dropdown-item">Your Orders</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/user-reservations" className="dropdown-item">Your Reservations</Link>
                                                    </li>
                                                    <li>
                                                        <button onClick={handleLogout} className="dropdown-item">Logout</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        ) : (
                                            <Link to="/login" className="theme-btn bg-transparent">
                                                <span className="button-content-wrapper d-flex align-items-center">
                                                    <span className="button-icon"><i className="fal fa-users"></i></span>
                                                    <span className="button-text">LOGIN</span>
                                                </span>
                                            </Link>
                                        )}
                                    </div>
                                    <div className="header__hamburger d-lg-none my-auto">
                                        <div className="sidebar__toggle">
                                            <img src="/assets/img/logo/bar.svg" alt="bar-icon" className="bar-1" />
                                            <img src="/assets/img/logo/bar-2.svg" alt="bar-icon" className="bar-2" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <ToastContainer/>
        </>
    );
};

export default Navbar;
