import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../Components/Sidebar';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { Link } from 'react-router-dom';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [updatingOrderId, setUpdatingOrderId] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/orders');
                console.log(response.data);
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setError("Failed to fetch orders. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const handleStatusUpdate = async (orderId, newStatus) => {
        setUpdatingOrderId(orderId);
        try {
            await axios.patch(`http://localhost:5000/api/orders/${orderId}`, { status: newStatus });
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                )
            );
            setSuccessMessage(`Order ${orderId} updated to ${newStatus}`);
        } catch (error) {
            console.error("Error updating order status:", error);
            setError("Failed to update order status. Please try again.");
        } finally {
            setUpdatingOrderId(null);
        }
    };

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;




    return (
        <>
            <div className='app-wrapper'>
                {isSidebarOpen && <Sidebar />}
                <div className='app-content'>
                    <Header onToggleSidebar={toggleSidebar} />
                    <div className='p-6'>
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-slate-900 text-lg font-medium">Orders</h4>
                            <div className="md:flex hidden items-center gap-3 text-sm font-semibold">
                                <Link to="/admin" className="text-sm font-medium text-slate-700">FoodKing</Link>
                                <i className="bx bx-chevron-right text-lg flex-shrink-0 text-slate-400"></i>
                                <Link to="/adminorders" className="text-sm font-medium text-slate-700" aria-current="page">Orders</Link>
                            </div>
                        </div>
                        <div className="card bg-white overflow-hidden">
                            <div className="card-header">
                                <h4 className="card-title">Manage Orders</h4>
                                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                            </div>
                            <div>
                                <div className="overflow-x-auto">
                                    <div className="min-w-full inline-block align-middle">
                                        <div className="overflow-hidden">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead style={{ backgroundColor: 'black' }}>
                                                    <tr>

                                                        <th scope="col" className="px-6 py-3 text-start text-sm text-white">Name</th>
                                                        <th scope="col" className="px-6 py-3 text-start text-sm text-white">Food Items</th>
                                                        <th scope="col" className="px-6 py-3 text-start text-sm text-white">Price</th>
                                                        <th scope="col" className="px-6 py-3 text-start text-sm text-white">Status</th>
                                                        <th scope="col" className="px-6 py-3 text-end text-sm text-white">Action</th>
                                                        <th scope="col" className="px-6 py-3 text-end text-sm text-white"></th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    {orders.map(order => (
                                                        <tr key={order._id}>

                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{typeof order.userId === 'object' ? order.userId.Username : order.userId}</td>
                                                            <td> {order.foodItems.map(item => (
                                                                item.foodId ? (
                                                                    <li key={item.foodId._id}>
                                                                        {item.foodId.foodname} x {item.quantity}
                                                                    </li>
                                                                ) : null
                                                            ))}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{order.totalAmount}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{order.status}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                                <button
                                                                    className="text-red-600 hover:text-red-800"
                                                                    onClick={() => handleStatusUpdate(order._id, 'SHIPPED')}
                                                                    disabled={updatingOrderId === order._id}
                                                                >
                                                                    {updatingOrderId === order._id ? 'Updating...' : 'Mark as Shipped'}
                                                                </button>

                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                                <button
                                                                    className="text-blue-600 hover:text-blue-800 ml-4"
                                                                    onClick={() => handleStatusUpdate(order._id, 'DELIVERED')}
                                                                    disabled={updatingOrderId === order._id}
                                                                >
                                                                    {updatingOrderId === order._id ? 'Updating...' : 'Mark as Delivered'}
                                                                </button>
                                                            </td>

                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>










        </>
    );
};



export default AdminOrders;
