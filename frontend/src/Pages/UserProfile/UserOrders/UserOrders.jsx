import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../../UserInterface/Components/Navbar';
import Footer from '../../../UserInterface/Components/Footer';
import UserCrouselBanner from '../../Components/User/UserCrouselBanner';
import './MyOrders.css'; // Optional: For custom styles

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const userId = localStorage.getItem('userId');
    
    useEffect(() => {
        const fetchOrders = async () => {
            if (!userId) {
                setError("User ID not found. Please log in.");
                setLoading(false);
                return;
            }
            
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` // Add the token to headers
                }
            };

            try {
                const response = await axios.get(`http://localhost:5000/api/orders/user/${userId}` , config );
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error.response || error);
                setError("Failed to fetch orders. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <Navbar />
            <UserCrouselBanner />
            <div className="container mt-4">
                <h2 className="text-center">My Orders</h2>
                {orders.length > 0 ? (
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Order ID</th>
                                    <th>Food Items</th>
                                    <th>Total Amount</th>
                                    <th>Status</th>
                                    <th>Order Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>
                                            <ul>
                                                {order.foodItems.map(item => (
                                                    item.foodId ? (
                                                        <li key={item.foodId._id}>
                                                            {item.foodId.foodname} x {item.quantity}
                                                        </li>
                                                    ) : null
                                                ))}
                                            </ul>
                                        </td>
                                        <td>${order.totalAmount.toFixed(2)}</td>
                                        <td>{order.status}</td>
                                        <td>{new Date(order.timestamp).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center">No orders found.</p>
                )}
            </div>
            <Footer />
        </>
    );
};

export default MyOrders;
