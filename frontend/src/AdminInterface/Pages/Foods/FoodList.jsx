import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import axios from 'axios';

const FoodList = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/foods'); // Adjust the endpoint as needed
                setFoods(response.data); // Assuming response.data is an array of food items
                
            } catch (error) {
                setError('Error fetching food items');
            } finally {
                setLoading(false);
            }
        };

        fetchFoods();
    }, []);

    const handleDelete = async (foodId) => {
        if (window.confirm('Are you sure you want to delete this food item?')) {
            try {
                await axios.delete(`http://localhost:5000/api/foods/${foodId}`); // Adjust the endpoint as needed
                setFoods(foods.filter(food => food._id !== foodId)); // Remove the deleted food from state
            } catch (error) {
                setError('Error deleting food item');
            }
        }
    };

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className='app-wrapper'>
            {isSidebarOpen && <Sidebar />}
            <div className='app-content'>
            <Header onToggleSidebar={toggleSidebar} />
                <div className='p-6'>
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="text-slate-900 text-lg font-medium">Food List</h4>
                        <div className="md:flex hidden items-center gap-3 text-sm font-semibold">
                            <Link to="/admin" className="text-sm font-medium text-slate-700">FoodKing</Link>
                            <i className="bx bx-chevron-right text-lg flex-shrink-0 text-slate-400"></i>
                            <Link to="/foodlist" className="text-sm font-medium text-slate-700" aria-current="page">Foods</Link>
                        </div>
                    </div>
                    <div className="card bg-white overflow-hidden">
                        <div className="card-header">
                            <h4 className="card-title">List</h4>
                        </div>
                        <div>
                            <div className="overflow-x-auto">
                                <div className="min-w-full inline-block align-middle">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead style={{ backgroundColor: 'black' }}>
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-start text-sm text-white">Name</th>
                                                    <th scope="col" className="px-6 py-3 text-start text-sm text-white">Category</th>
                                                    <th scope="col" className="px-6 py-3 text-start text-sm text-white">Price</th>
                                                    <th scope="col" className="px-6 py-3 text-start text-sm text-white">Image</th>
                                                    <th scope="col" className="px-6 py-3 text-end text-sm text-white">Action</th>
                                                    <th scope="col" className="px-6 py-3 text-end text-sm text-white"></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {loading ? (
                                                    <tr>
                                                        <td colSpan="5" className="text-center py-4">Loading...</td>
                                                    </tr>
                                                ) : error ? (
                                                    <tr>
                                                        <td colSpan="5" className="text-center py-4 text-red-500">{error}</td>
                                                    </tr>
                                                ) : (
                                                    foods.map(food => (
                                                        <tr key={food._id}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{food.foodname}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{food.category}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{food.price}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <img src={food.image} alt={food.foodname} className="w-16 h-16 object-cover" />
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                                <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(food._id)}>Delete</button>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                                <Link className="text-blue-600 hover:text-blue-800 ml-4" to={`/updatefood/${food._id}`}>Update</Link>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
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
    );
};

export default FoodList;
