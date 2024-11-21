import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MenuSection.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MenuSection = () => {
    const [foods, setFoods] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState('Pizza');
    const [showModal, setShowModal] = useState(false);
    const [selectedFood, setSelectedFood] = useState(null);
    const [selectedCrust, setSelectedCrust] = useState('Original Crust');
    const [selectedSize, setSelectedSize] = useState('Small - 22cm');
    const [quantity, setQuantity] = useState(1);
    const notify = () => toast.error("you have to log in first")
    const notifyAddtoCart = () => toast.success(`Added to cart : ${selectedFood.foodname}`)

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/foods");
                setFoods(response.data);
                const uniqueCategories = [...new Set(response.data.map(food => food.category))];
                setCategories(uniqueCategories);
            } catch (err) {
                console.error('Error fetching foods:', err);
            }
        };
        fetchFoods();
    }, []);

    const groupFoodsByCategory = () => {
        return foods.reduce((acc, food) => {
            (acc[food.category] = acc[food.category] || []).push(food);
            return acc;
        }, {});
    };

    const groupedFoods = groupFoodsByCategory();

    const openModal = (food) => {
        setSelectedFood(food);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedFood(null);
        setQuantity(1);
        setSelectedCrust('Original Crust');
        setSelectedSize('Small - 22cm');
    };

    const handleAddToCart = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId || !selectedFood) {
            console.log('User ID or food item is not defined');
            notify();
            return;
        }

        const cartItem = {
            userId,
            foodId: selectedFood._id,
            foodname: selectedFood.foodname,
            price: selectedFood.price,
            quantity,
            selectedCrust,
            selectedSize,
            image: selectedFood.image
        };

        try {
            await axios.post('http://localhost:5000/api/carts/add', cartItem);
            notifyAddtoCart(`Added to cart: ${selectedFood.foodname}`);
            closeModal(); // Close modal after adding to cart
        } catch (err) {
            console.error("Error adding to cart:", err.response ? err.response.data : err.message);
        }
    };

    return (
        <>
            <section className="food-product-section fix section-padding">
                <div className="container-fluid">
                    <div className="section-title text-center">
                        <span className="wow fadeInUp">Discover</span>
                        <h2 className="wow fadeInUp" data-wow-delay=".3s">Our Delicious Menu</h2>
                    </div>
                    <div className="food-product-wrapper style-two">
                        <ul className="nav" role="tablist">
                            {categories.map((category, index) => (
                                <li className="nav-item wow fadeInUp" data-wow-delay={`${(index + 5) * 0.2}s`} role="presentation" key={category}>
                                    <a
                                        href={`#${category}`}
                                        onClick={() => setActiveCategory(category)}
                                        className={`nav-link ${activeCategory === category ? 'active' : ''}`}
                                        aria-selected={activeCategory === category}
                                        role="tab"
                                    >
                                        {category}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="tab-content">
                            {categories.map((category) => (
                                <div
                                    id={category}
                                    className={`tab-pane fade ${activeCategory === category ? 'show active' : ''}`}
                                    role="tabpanel"
                                    key={category}
                                >
                                    <div className="row g-4">
                                        {groupedFoods[category]?.map((food) => (
                                            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".3s" key={food.id}>
                                                <div className="catagory-product-card-2 text-center">
                                                    <div className="catagory-product-image">
                                                        <img src={food.image} alt="product-img" height={200} width={200} />
                                                    </div>
                                                    <div className="catagory-product-content">
                                                        <div className="catagory-button">
                                                            <button onClick={() => openModal(food)} className="theme-btn-2">
                                                                <i className="far fa-shopping-basket"></i> Add To Cart
                                                            </button>
                                                        </div>
                                                        <div className="info-price d-flex align-items-center justify-content-center">
                                                            <p>-5%</p>
                                                            <h6>${food.price.toFixed(2)}</h6>
                                                            <span>${(food.price * 0.95).toFixed(2)}</span>
                                                        </div>
                                                        <h4>
                                                            <Link to={`/productsingle/${food._id}`}>{food.foodname}</Link>
                                                        </h4>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Customize Your Order</h3>
                        <p>{selectedFood.foodname}</p>
                        <p style={{color:'red',fontSize:'small'}}> <strong>Important Note : </strong> igonre this select options if you order something else except pizza</p>
                        <div className="form-group">
                            <label>Select Crust</label>
                            <br />
                            <select value={selectedCrust} onChange={(e) => setSelectedCrust(e.target.value)}>
                                <option value="Original Crust">Original Crust</option>
                                <option value="Thick Crust">Thick Crust</option>
                                <option value="Double Crust">Double Crust</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Select Size</label>
                            <br />
                            <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                                <option value="Small - 22cm">Small - 22cm</option>
                                <option value="Medium - 29cm">Medium - 29cm</option>
                                <option value="Large - 35cm">Large - 35cm</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Quantity</label>
                            <br />
                            <input
                                type="number"
                                className='text-black'
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, Math.min(10, e.target.value)))}
                                min="1"
                                max="10"
                            />
                        </div>
                        <div className="modal-buttons">
                            <button onClick={handleAddToCart} className="theme-btn">Confirm</button>
                            <button onClick={closeModal} className="theme-btn cancel-btn">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer/>
        </>
    );
};

export default MenuSection;
