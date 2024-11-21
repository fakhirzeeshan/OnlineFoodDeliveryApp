import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PizzaSection = () => {
  const [Foods, setFoods] = useState([]);
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
        const response = await axios.get('http://localhost:5000/api/foods');
        const allFoods = response.data;
        const pizzaFoods = allFoods.filter((food) => food.category.toLowerCase() === 'pizza');
        setFoods(pizzaFoods);
      } catch (err) {
        console.error('Error fetching foods:', err);
      }
    };
    fetchFoods();
  }, []);

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
      closeModal();
    } catch (err) {
      console.error("Error adding to cart:", err.response ? err.response.data : err.message);
    }
  };

  return (
    <>
      <section className="catagory-pizza-product-section fix section-padding">
        <div className="container">
          <div className="section-title text-center">
            <span className="wow fadeInUp">GOURMET PIZZA</span>
            <h2 className="wow fadeInUp" data-wow-delay=".3s">
              DISCOVER THE TASTE OF AUTHENTIC <br /> HANDCRAFTED PIZZAS
            </h2>
          </div>
          <div className="row">
            {Foods.slice(0, 4).map((food, index) => (
              <div key={index} className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={`${0.2 * (index + 1)}s`}>
                <div className="catagory-product-card-3">
                  <div className="catagory-image">
                    <img src={food.image} alt={food.foodname} />
                    <ul className="product-icon d-flex justify-content-center align-items-center">
                      <li>
                        <button onClick={() => openModal(food)}>
                          <i className="far fa-shopping-cart"></i>
                        </button>
                      </li>
                      <li>
                        <Link to={`/productsingle/${food._id}`}>
                          <i className="far fa-expand"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="catagory-content">
                    <h4><Link to={`/productsingle/${food._id}`}>{food.foodname}</Link></h4>
                    <div className="star">
                      <span className="fas fa-star"></span>
                      <span className="fas fa-star"></span>
                      <span className="fas fa-star"></span>
                      <span className="fas fa-star"></span>
                      <span className="fas fa-star"></span>
                    </div>
                    <div className="price">
                      <del>${food.price + 3}</del>
                      <span>${food.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Customize Your Order</h3>
            <p>{selectedFood.foodname}</p>
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

export default PizzaSection;
