import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import ShopsingleBanner from '../../Components/Shopcart/ShopsingleBanner';
import { Link, useParams } from 'react-router-dom';
import Footer from '../../Components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Shopsingle = () => {
    const [Foods, setFoods] = useState(null); // Set initial state to null for conditional rendering
    const [selectedCrust, setSelectedCrust] = useState('Original Crust'); // Default value
    const [selectedSize, setSelectedSize] = useState('Small - 22cm'); // Default value
    const [quantity, setQuantity] = useState(1); // Default quantity
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const FetchFood = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/foods/${id}`);
                setFoods(response.data);
                console.log(response.data);
            } catch (err) {
                console.error("Error fetching food", err);
            }
        };
        FetchFood();
    }, [id]);

    const handleAddToCart = async (e) => {
        e.preventDefault(); // Prevent default form submission
    
        const userId = localStorage.getItem('userId'); // Get user ID from local storage
    
        if (!userId) {
            console.log('User ID is not defined');
            return; // Exit the function if user is not logged in
        }
    
        const cartItem = {
            userId,
            foodId: Foods._id,
            foodname: Foods.foodname, // Ensure foodname is set
            price: Foods.price, // Ensure price is set
            quantity,
            selectedCrust,
            selectedSize,
            image: Foods.image // Include food image
        };
    
        console.log(cartItem); // Log cartItem to check its structure
    
        try {
            const response = await axios.post('http://localhost:5000/api/carts/add', cartItem);
            alert("Added to cart: " + Foods.foodname); // Show success message with food name
            navigate('/cart')
            console.log(response.data)
        } catch (err) {
            console.error("Error adding to cart:", err.response ? err.response.data : err.message);
        }
    };
    
    
    

    const handleQuantityChange = (e) => {
        const value = Math.max(1, Math.min(10, e.target.value)); // Limit quantity between 1 and 10
        setQuantity(value);
    };

    if (!Foods) return <p>Loading...</p>; // Display loading while data is being fetched

    return (
        <>
            {/* Navbar */}
            <Navbar />

            {/* Carousel Banner */}
            <ShopsingleBanner />

            <section className="product-details-section section-padding">
                <div className="container">
                    <div className="product-details-wrapper style-2">
                        <div className="row g-4">
                            <div className="col-xl-4 col-lg-6">
                                <div className="product-image-items">
                                    <div className="product-image">
                                        <img
                                            src={Foods.image ? `http://localhost:5000/${Foods.image}` : "details-1.png"}
                                            alt={Foods.foodname}
                                            className="w-100"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-5 col-lg-6">
                                <div className="product-details-content">
                                    <div className="star pb-3">
                                        <span>-5%</span>
                                        <Link href="#"><i className="fas fa-star"></i></Link>
                                        <Link href="#"><i className="fas fa-star"></i></Link>
                                        <Link href="#"><i className="fas fa-star"></i></Link>
                                        <Link href="#"><i className="fas fa-star"></i></Link>
                                        <Link href="#" className="color-bg"><i className="fas fa-star"></i></Link>
                                        <Link href="#" className="text-color">( 2 Reviews )</Link>
                                    </div>
                                    <h3 className="pb-3">{Foods.foodname}</h3>
                                    <div className="price-list d-flex align-items-center mb-4">
                                        <span>${Foods.price}</span>
                                        <del>${(Foods.price * 1.05).toFixed(2)}</del>
                                    </div>
                                    <p className="mb-4">{Foods.description}</p>
                                    <div className="social-icon d-flex align-items-center">
                                        <Link href="#"><i className="fab fa-facebook-f"></i></Link>
                                        <Link href="#"><i className="fab fa-twitter"></i></Link>
                                        <Link href="#"><i className="fab fa-vimeo-v"></i></Link>
                                        <Link href="#"><i className="fab fa-pinterest-p"></i></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4">
                                <div className="product-form-wrapper">
                                    <div className="delivery-time">Delivery: <span>35 minutes</span></div>
                                    <form onSubmit={handleAddToCart} id="contact-forms" method="POST">
                                        <div className="form-clt">
                                            <label className="select-crust">Select Crust</label>
                                            <select value={selectedCrust} onChange={(e) => setSelectedCrust(e.target.value)}>
                                                <option value="Original Crust">Original Crust</option>
                                                <option value="Thick Crust">Thick Crust</option>
                                                <option value="Double Crust">Double Crust</option>
                                            </select>
                                        </div>
                                        <div className="form-clt">
                                            <label className="select-crust">Select Size</label>
                                            <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                                                <option value="Small - 22cm">Small - 22cm</option>
                                                <option value="Medium - 29cm">Medium - 29cm</option>
                                                <option value="Large - 35cm">Large - 35cm</option>
                                            </select>
                                        </div>
                                        <div className="form-clt">
                                            <label className="select-crust">Quantity</label>
                                            <div className="quantity-basket">
                                                <p className="qty">
                                                    <button type="button" className="qtyminus" onClick={() => setQuantity(q => Math.max(1, q - 1))}>&minus;</button>
                                                    <input type="number" name="qty" id="qty2" min="1" max="10" step="1" value={quantity} onChange={handleQuantityChange} />
                                                    <button type="button" className="qtyplus" onClick={() => setQuantity(q => Math.min(10, q + 1))}>&plus;</button>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="form-clt">
                                            <button type="submit" className="theme-btn">
                                                <i className="far fa-shopping-bag"></i>
                                                <span className="button-text">Add To Cart</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </>
    );
};

export default Shopsingle;
